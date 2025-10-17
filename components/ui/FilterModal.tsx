import React, { useState, useRef } from "react";

const FilterModal = ({
  modalOpen,
  handleFilter,
}: {
  modalOpen: boolean;
  handleFilter: (filter: { price_from: number; price_to: number }) => void;
}) => {
  const [filter, setFilter] = useState({
    price_from: 0,
    price_to: 0,
  });
  if (!modalOpen) {
    return null;
  }

  const filterRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className="flex flex-col absolute top-full sm:right-4 md:right-8 lg:right-12 z-10 gap-4 w-[392px] h-[169px] bg-[#FFFFFF] border border-[#E1DFE1] rounded-[8px] p-4"
      ref={filterRef}
    >
      <p className="text-[16px] font-semibold text-[#10151F]">Select Price</p>
      <div className="flex items-center gap-2 w-full">
        <div className="flex items-center w-full gap-2 border border-[#E1DFE1] rounded-[8px] p-2 h-[42px]">
          <div className="text-[14px] font-medium text-[#3E424A]">From</div>
          <input
            className="w-full"
            value={filter.price_from}
            onChange={(e) =>
              setFilter({ ...filter, price_from: Number(e.target.value) })
            }
          />
        </div>
        <div className="flex items-center w-full gap-2 border border-[#E1DFE1] rounded-[8px] p-2 h-[42px]">
          <div className="text-[14px] font-medium text-[#3E424A]">To</div>
          <input
            className="w-full"
            value={filter.price_to}
            onChange={(e) =>
              setFilter({ ...filter, price_to: Number(e.target.value) })
            }
          />
        </div>
      </div>
      <div className="flex justify-end">
        <button
          className="py-2 px-4 bg-[#FF4000] w-[124px] h-[41px] rounded-[10px] text-[#FFFFFF] cursor-pointer"
          onClick={() => {
            handleFilter(filter);
            setFilter({ price_from: 0, price_to: 0 });
          }}
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default FilterModal;
