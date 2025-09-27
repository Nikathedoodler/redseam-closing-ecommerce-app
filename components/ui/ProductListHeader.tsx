import React from "react";
import { FilterButton } from "../icons/FilterButton";

type ProductCount = {
  from: number;
  to: number;
  total: number;
};

type ProductListHeaderProps = {
  title: string;
  productCount: ProductCount;
};

const ProductListHeader = ({ title, productCount }: ProductListHeaderProps) => {
  console.log(productCount, "productCound");
  return (
    <div className="flex items-center justify-between">
      <div className="mb-4">
        <h1 className="font-semibold text-[42px]">{title}</h1>
      </div>
      <div className="flex items-center gap-4">
        <div>
          Showing {productCount.from}-{productCount.to} of {productCount.total}{" "}
          results
        </div>
        <FilterButton />
      </div>
    </div>
  );
};

export default ProductListHeader;
