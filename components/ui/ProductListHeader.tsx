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
  isDark: boolean;
};

const ProductListHeader = ({
  title,
  productCount,
  modalOpen,
  setModalOpen,
  sortModalOpen,
  setSortModalOpen,
  isDark,
}: ProductListHeaderProps) => {
  return (
    <div
      className={`sticky top-40 z-40 flex items-center justify-between mb-4 ${
        isDark ? "bg-slate-800 text-white" : "bg-white text-black"
      }`}
    >
      <div>
        <h1 className="font-semibold lg:text-2xl text-xl">{title}</h1>
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
          isDark={isDark}
        />
        <SortButton
          onClick={() => {
            setSortModalOpen(!sortModalOpen);
            if (modalOpen) setModalOpen(false);
          }}
          isDark={isDark}
        />
      </div>
    </div>
  );
};

export default ProductListHeader;
