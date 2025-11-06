import { BackButton } from "../icons/BackButton";
import { NextButton } from "../icons/NextButton";
import { createPaginationArray } from "../../src/lib/utils/pagination";

type PaginationProps = {
  page: number;
  totalPages?: number;
  onPageChange: (page: number) => void;
  isDark: boolean;
};

export const Pagination = ({
  page,
  totalPages,
  onPageChange,
  isDark,
}: PaginationProps) => {
  const paginationItems = createPaginationArray(page, totalPages || 0);

  return (
    <div className="flex items-center justify-center mb-10 h-[32px] gap-2">
      <BackButton
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
      />

      {paginationItems.map((item, index) =>
        item === "..." ? (
          <span
            key={`ellipsis-${index}`}
            className="w-[32px] h-[32px] rounded-[4px] flex items-center justify-center text-[#212B36]"
          >
            ...
          </span>
        ) : (
          <button
            key={item}
            aria-label="page button"
            onClick={() => onPageChange(item as number)}
            className={`w-[32px] h-[32px] rounded-[4px] border-1 border-[#F8F6F7] flex items-center justify-center cursor-pointer ${
              item === page
                ? "border-[#FF4000] text-[#FF4000]"
                : isDark
                ? "text-white"
                : "text-[#212B36]"
            }`}
          >
            {item}
          </button>
        )
      )}

      <NextButton
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
      />
    </div>
  );
};
