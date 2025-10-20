import React from "react";
import { useTheme } from "../context/ThemeContext";

const SortModal = ({
  sortModalOpen,
  handleSort,
}: {
  sortModalOpen: boolean;
  handleSort: (sort: string) => void;
}) => {
  const { isDark } = useTheme();
  const themeCondition = isDark
    ? "bg-slate-800 text-white"
    : "bg-white text-black";

  if (!sortModalOpen) {
    return null;
  }
  return (
    <div
      className={`text-[16px] flex flex-col absolute top-full right-0 z-10 gap-2 ${themeCondition} border border-[#E1DFE1] rounded-[8px] p-4 w-[223px] h-[184]`}
    >
      <div className="font-semibold text-[16px]">Sort by</div>
      <div className="flex flex-col gap-2 items-start">
        <button
          className="cursor-pointer text-[16px]"
          value="created_at"
          onClick={() => {
            handleSort("created_at");
          }}
        >
          New products first
        </button>
        <button
          className="cursor-pointer text-[16px]"
          value="price"
          onClick={() => {
            handleSort("price");
          }}
        >
          Price, low to high
        </button>
        <button
          className="cursor-pointer text-[16px]"
          value="-price"
          onClick={() => {
            handleSort("-price");
          }}
        >
          Price, high to low
        </button>
      </div>
    </div>
  );
};

export default SortModal;
