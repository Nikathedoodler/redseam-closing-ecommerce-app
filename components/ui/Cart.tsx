import React from "react";
import CartLogo from "../icons/CartLogo";

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
        className={`fixed top-0 right-0 h-full w-full sm:w-96 lg:w-[500px] xl:w-[600px] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        } ${className}`}
      >
        <CartLogo />
      </div>
    </>
  );
};

export default Cart;
