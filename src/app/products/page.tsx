"use client";

import { fetchProducts } from "@/lib/api/products";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Product } from "../types";
import { ProductsResponse } from "../types";
import { useState } from "react";
import { Pagination } from "../../../components/icons/Pagination";
import ProductListHeader from "../../../components/ui/ProductListHeader";
import FilterModal from "../../../components/ui/FilterModal";

const Products = () => {
  const [page, setPage] = useState(1);
  const {
    data,
    isLoading,
    isError,
    error,
    isFetching,
    isPlaceholderData,
    isPending,
  } = useQuery<ProductsResponse, Error>({
    queryKey: ["products", page],
    queryFn: () => fetchProducts({ page }),
    placeholderData: keepPreviousData,
  });

  console.log(data, "data");

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
      <ProductListHeader title="Products" productCount={data?.meta} />
      <FilterModal />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 w-full">
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
