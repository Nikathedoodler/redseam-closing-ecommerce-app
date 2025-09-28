"use client";

import { fetchProducts } from "@/lib/api/products";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Product } from "../types";
import { ProductsResponse } from "../types";
import { useState } from "react";
import { Pagination } from "../../../components/icons/Pagination";
import ProductListHeader from "../../../components/ui/ProductListHeader";
import FilterModal from "../../../components/ui/FilterModal";
import SortModal from "../../../components/ui/SortModal";

const Products = () => {
  const [page, setPage] = useState(1);
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [sortModalOpen, setSortModalOpen] = useState(false);
  const [filteredPrice, setFilteredPrice] = useState({});

  const {
    data,
    isLoading,
    isError,
    error,
    isFetching,
    isPlaceholderData,
    isPending,
  } = useQuery<ProductsResponse, Error>({
    queryKey: ["products", { page, filter: filteredPrice }],
    queryFn: () => fetchProducts({ page, filter: filteredPrice }),
    placeholderData: keepPreviousData,
  });

  console.log(data, "data");

  const handleFilter = (filter: { price_from: number; price_to: number }) => {
    console.log(filter, "filter");
    setFilterModalOpen(false);
    setFilteredPrice(filter);
  };

  const totalPages =
    data?.meta &&
    typeof data.meta.total === "number" &&
    typeof data.meta.per_page === "number"
      ? Math.ceil(data.meta.total / data.meta.per_page)
      : 0;

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error?.message}</div>;

  return (
    <div className="bg-[#FFFFFF] min-h-screen w-full max-w-[1920px] mx-auto`">
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
        <SortModal sortModalOpen={sortModalOpen} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12 w-full">
        {data?.data.map((product: Product) => (
          <div
            key={product.id}
            className="w-full overflow-hidden  border-gray-200"
          >
            <img
              src={product.cover_image}
              alt={product.name}
              height={549}
              className="w-full object-cover border rounded-lg"
            />
            <div className="mt-2 text-[#10151F] text-[18px]">
              <div>{product.name}</div>
              <div>$ {product.price}</div>
            </div>
          </div>
        ))}
      </div>
      <Pagination page={page} onPageChange={setPage} totalPages={totalPages} />
    </div>
  );
};

export default Products;
