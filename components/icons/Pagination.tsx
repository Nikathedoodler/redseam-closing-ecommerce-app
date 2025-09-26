import { BackButton } from "./BackButton";
import { NextButton } from "./NextButton";

type PaginationProps = {
  page: number;
  totalPages?: number;
  onPageChange: (page: number) => void;
};

export const Pagination = ({
  page,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const pageNumbers = Array.from({ length: totalPages || 0 }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center mb-10 h-[32px] gap-2">
      <BackButton
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
      />
      {pageNumbers.map((pageNum) => (
        <button
          key={pageNum}
          onClick={() => typeof pageNum === "number" && onPageChange(pageNum)}
          className="w-[32px] h-[32px] rounded-[4px] border border-[#F8F6F7] flex items-center justify-center cursor-pointer"
        >
          {pageNum}
        </button>
      ))}
      <NextButton
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
      />
    </div>
  );
};
