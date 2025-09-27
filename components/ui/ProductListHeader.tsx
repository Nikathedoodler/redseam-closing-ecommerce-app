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
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
};

const ProductListHeader = ({
  title,
  productCount,
  modalOpen,
  setModalOpen,
}: ProductListHeaderProps) => {
  console.log(productCount, "productCount");
  return (
    <div className="flex items-center justify-between">
      <div className="mb-4">
        <h1 className="font-semibold text-[42px]">{title}</h1>
      </div>
      <div className="flex items-center gap-4 ">
        <div className="hidden md:block">
          Showing {productCount.from}-{productCount.to} of {productCount.total}{" "}
          results
        </div>
        <FilterButton onClick={() => setModalOpen(!modalOpen)} />
      </div>
    </div>
  );
};

export default ProductListHeader;
