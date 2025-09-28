import React from "react";
import { FilterButton } from "../icons/FilterButton";
import { SortButton } from "../icons/SortButton";

type ProductCount = {
  from: number;
  to: number;
  total?: number;
};

type ProductListHeaderProps = {
  title: string;
  productCount: ProductCount;
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
  sortModalOpen: boolean;
  setSortModalOpen: (open: boolean) => void;
};

const ProductListHeader = ({
  title,
  productCount,
  modalOpen,
  setModalOpen,
  sortModalOpen,
  setSortModalOpen,
}: ProductListHeaderProps) => {
  console.log(productCount, "productCount");
  return (
    <div className="flex items-center justify-between">
      <div className="mb-4">
        <h1 className="font-semibold text-[42px]">{title}</h1>
      </div>
      <div className="flex items-center gap-4 ">
        <div className="hidden md:block">
          Showing {productCount.from}-{productCount.to} of{" "}
          {productCount.total || 0} results
        </div>
        <FilterButton
          onClick={() => {
            setModalOpen(!modalOpen);
            if (sortModalOpen) setSortModalOpen(false);
          }}
        />
        <SortButton
          onClick={() => {
            setSortModalOpen(!sortModalOpen);
            if (modalOpen) setModalOpen(false);
          }}
        />
      </div>
    </div>
  );
};

export default ProductListHeader;
