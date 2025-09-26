"use client";

import { fetchProducts } from "@/lib/api/products";
import { useQuery } from "@tanstack/react-query";
import { Product } from "../types";
import { ProductsResponse } from "../types";

const Products = () => {
  const { data, isLoading, isError, error } = useQuery<ProductsResponse, Error>(
    {
      queryKey: ["products"],
      queryFn: () => fetchProducts({ page: 1 }),
    }
  );

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className="bg-[#FFFFFF] min-h-screen w-full max-w-[1920px] mx-auto">
      <div className="mb-4 mx-auto">
        <h1>Products</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 w-full">
        {data?.data.map(
          (product: Product) => (
            console.log(product),
            (
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
            )
          )
        )}
      </div>
    </div>
  );
};

export default Products;
