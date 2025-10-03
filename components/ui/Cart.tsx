import React from "react";
import CartLogo from "../icons/CartLogo";
import CloseButton from "../icons/CloseButton";
import Link from "next/link";

type CartProps = {
  isCartOpen: boolean;
  setIsCartOpen: (isCartOpen: boolean) => void;
  className?: string;
};

const Cart = ({ isCartOpen, setIsCartOpen, className }: CartProps) => {
  return (
    <>
      {/* Backdrop Overlay */}
      <div
        className={`fixed inset-0 bg-black z-40 transition-opacity duration-300 ${
          isCartOpen
            ? "bg-opacity-50 opacity-70"
            : "bg-opacity-0 opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsCartOpen(false)}
      />

      {/* Cart Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-96 flex flex-col gap-30 lg:w-[500px] xl:w-[600px] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        } ${className}`}
      >
        <div className="flex justify-between items-center p-4 mt-4">
          <h1 className="text-[20px] font-[500] text-[#10151F]">
            Sopping Cart ( {} )
          </h1>
          <CloseButton onClick={() => setIsCartOpen(false)} />
        </div>
        <div className="flex flex-col items-center justify-center gap-10">
          <CartLogo />
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="text-[24px] font-[600] text-[#10151F]">Ooops!</div>
            <div className="text-[14px] font-[400] text-[#10151F]">
              You’ve got nothing in your cart just yet...
            </div>
          </div>
          <Link
            href="/products"
            className="w-1/3 sm:w-1/2 lg:w-2/5"
            onClick={() => setIsCartOpen(false)}
          >
            <button className="w-full py-4 bg-[#FF4000] text-[#FFFFFF] text-base sm:text-lg lg:text-xl rounded-xl cursor-pointer hover:bg-[#E63900] transition-colors duration-200">
              Start Shopping
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Cart;
