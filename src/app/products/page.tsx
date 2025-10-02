"use client";

import { fetchProducts } from "@/lib/api/products";
import {
  keepPreviousData,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import Link from "next/link";
import { Product } from "../types";
import { ProductsResponse } from "../types";
import { useEffect, useState } from "react";
import { Pagination } from "../../../components/ui/Pagination";
import ProductListHeader from "../../../components/ui/ProductListHeader";
import FilterModal from "../../../components/ui/FilterModal";
import SortModal from "../../../components/ui/SortModal";
import ProductsListSkeleton from "../../../components/ui/ProductsListSkeleton";

const Products = () => {
  const [page, setPage] = useState(1);
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [sortModalOpen, setSortModalOpen] = useState(false);
  const [filteredPrice, setFilteredPrice] = useState({});
  const [sort, setSort] = useState("");

  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useQuery<ProductsResponse, Error>(
    {
      queryKey: ["products", page, filteredPrice, sort],
      queryFn: () => fetchProducts({ page, filter: filteredPrice, sort }),
      placeholderData: keepPreviousData,
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 5,
    }
  );

  console.log(data, "data");

  // Prefetch next page when user is on current page
  useEffect(() => {
    if (page < (data?.meta.last_page || 0)) {
      const nextPage = page + 1;
      queryClient.prefetchQuery({
        queryKey: ["products", nextPage, filteredPrice, sort],
        queryFn: () =>
          fetchProducts({ page: nextPage, filter: filteredPrice, sort }),
      });
    }
  }, [page, filteredPrice, sort, data?.meta.last_page]);

  const handleFilter = (filter: { price_from: number; price_to: number }) => {
    setFilterModalOpen(false);
    setFilteredPrice(filter);
    setPage(1);
  };

  const handleSort = (sort: string) => {
    // Clear cache when filters change significantly
    queryClient.invalidateQueries({ queryKey: ["products"] });
    setSortModalOpen(false);
    setSort(sort);
    setPage(1);
  };

  const totalPages =
    data?.meta &&
    typeof data.meta.total === "number" &&
    typeof data.meta.per_page === "number"
      ? Math.ceil(data.meta.total / data.meta.per_page)
      : 0;

  if (isLoading) return <ProductsListSkeleton />;
  if (isError) return <div>Error: {error?.message}</div>;

  return (
    <div className="bg-[#FFFFFF] min-h-screen w-full px-6 lg:px-12 xl:px-16 2xl:px-20 mx-auto">
      <div className="relative">
        <ProductListHeader
          title="Products"
          productCount={data?.meta || { from: 0, to: 0 }}
          modalOpen={filterModalOpen}
          setModalOpen={setFilterModalOpen}
          sortModalOpen={sortModalOpen}
          setSortModalOpen={setSortModalOpen}
        />
        <FilterModal modalOpen={filterModalOpen} handleFilter={handleFilter} />
        <SortModal sortModalOpen={sortModalOpen} handleSort={handleSort} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12 mb-10 w-full">
        {data?.data.map((product: Product) => (
          <Link href={`/products/${product.id}`} key={product.id}>
            <div className="w-full overflow-hidden  border-gray-200">
              <img
                src={product.cover_image}
                alt={product.name}
                height={549}
                className="w-full object-cover rounded-lg"
              />
              <div className="mt-2 text-[#10151F] text-[18px]">
                <div className="text-[18px] font-medium">{product.name}</div>
                <div className="text-[16px] font-medium">$ {product.price}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <Pagination page={page} onPageChange={setPage} totalPages={totalPages} />
    </div>
  );
};

export default Products;
