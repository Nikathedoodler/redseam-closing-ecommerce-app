import React from "react";

const FilterModal = ({
  modalOpen,
  setModalOpen,
}: {
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
}) => {
  if (!modalOpen) return null;
  return (
    <div className="flex flex-col absolute top-40 right-16 mt-2 z-10 gap-4 w-[392px] h-[169px] bg-[#FFFFFF] border border-[#E1DFE1] rounded-[8px] p-4">
      <p className="text-[16px] font-semibold text-[#10151F]">Select Price</p>
      <div className="flex items-center gap-2 w-full">
        <div className="flex items-center w-full gap-2 border border-[#E1DFE1] rounded-[8px] p-2 h-[42px]">
          <div className="text-[14px] font-medium text-[#3E424A]">From</div>
          <input className="w-full" />
        </div>
        <div className="flex items-center w-full gap-2 border border-[#E1DFE1] rounded-[8px] p-2 h-[42px]">
          <div className="text-[14px] font-medium text-[#3E424A]">To</div>
          <input className="w-full" />
        </div>
      </div>
      <div className="flex justify-end">
        <button className="py-2 px-4 bg-[#FF4000] w-[124px] h-[41px] rounded-[10px] text-[#FFFFFF]">
          Apply
        </button>
      </div>
    </div>
  );
};

export default FilterModal;
