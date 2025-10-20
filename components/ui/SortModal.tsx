import React, { useRef, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";

const SortModal = ({
  sortModalOpen,
  handleSort,
  setSortModalOpen,
}: {
  sortModalOpen: boolean;
  handleSort: (sort: string) => void;
  setSortModalOpen: (open: boolean) => void;
}) => {
  const sortModalRef = useRef<HTMLDivElement>(null);

  const { isDark } = useTheme();
  const themeCondition = isDark
    ? "bg-slate-800 text-white"
    : "bg-white text-black";

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        sortModalRef.current &&
        !sortModalRef.current.contains(event.target as Node)
      ) {
        setSortModalOpen(false);
      }
    };

    if (sortModalOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [sortModalOpen, setSortModalOpen]);

  if (!sortModalOpen) {
    return null;
  }
  return (
    <div
      className={`text-[16px] flex flex-col absolute top-full right-0 z-10 gap-2 ${themeCondition} border border-[#E1DFE1] rounded-[8px] p-4 w-[223px] h-[184]`}
      ref={sortModalRef}
    >
      <div className="font-semibold text-[16px]">Sort by</div>
      <div className="flex flex-col gap-2 items-start">
        <button
          className="cursor-pointer text-[16px]"
          value="created_at"
          onClick={() => {
            handleSort("created_at");
            setSortModalOpen(false);
          }}
        >
          New products first
        </button>
        <button
          className="cursor-pointer text-[16px]"
          value="price"
          onClick={() => {
            handleSort("price");
            setSortModalOpen(false);
          }}
        >
          Price, low to high
        </button>
        <button
          className="cursor-pointer text-[16px]"
          value="-price"
          onClick={() => {
            handleSort("-price");
            setSortModalOpen(false);
          }}
        >
          Price, high to low
        </button>
      </div>
    </div>
  );
};

export default SortModal;
