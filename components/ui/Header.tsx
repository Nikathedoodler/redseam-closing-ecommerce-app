"use client";

import React, { useState } from "react";
import Logo from "../icons/Logo";
import CartBlack from "../icons/CartBlack";
import DownArrow from "../icons/DownArrow";
import Cart from "./Cart";
import { useCart } from "../context/CartContext";

const Header = () => {
  // const [isCartOpen, setIsCartOpen] = useState(false);
  const { isCartOpen, totalItems, setIsCartOpen } = useCart();
  return (
    <header className="w-full fixed top-0 left-0 right-0 z-50 border-b border-gray-200 bg-white flex items-center justify-between py-10 px-6 lg:px-12 xl:px-16 2xl:px-20">
      {/* Logo Section */}
      <div className="flex items-center gap-2 ">
        <Logo />
        <h1 className="font-[600] text-sm sm:text-base lg:text-lg text-[#10151F]">
          RedSeam Clothing
        </h1>
      </div>

      {/* Cart and User Profile Section */}
      <div className="flex items-center gap-5">
        <CartBlack
          onClick={() => setIsCartOpen(!isCartOpen)}
          className="cursor-pointer hover:opacity-80 transition-opacity"
        />

        {/* User Profile */}
        <div className="flex items-center gap-2 w-16 h-10 cursor-pointer hover:opacity-80 transition-opacity">
          <img
            src="/images/avatars/head.webp"
            alt="alonso"
            className="w-10 h-full object-cover rounded-full"
          />
          <DownArrow />
        </div>
      </div>

      {/* Cart Sidebar - Rendered outside the header flow */}
      <Cart />
    </header>
  );
};

export default Header;
