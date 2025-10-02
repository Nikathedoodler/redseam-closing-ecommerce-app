import React from "react";
import Logo from "../icons/Logo";
import CartBlack from "../icons/CartBlack";
import DownArrow from "../icons/DownArrow";

const Header = () => {
  return (
    <header className="w-full flex items-center justify-between py-10 px-6 lg:px-12 xl:px-16 2xl:px-20">
      {/* Logo Section */}
      <div className="flex items-center gap-2 ">
        <Logo />
        <h1 className="font-[600] text-sm sm:text-base lg:text-lg text-[#10151F]">
          RedSeam Clothing
        </h1>
      </div>

      {/* Cart and User Profile Section */}
      <div className="flex items-center gap-5 cursor-pointer">
        <CartBlack />

        {/* User Profile */}
        <div className="flex items-center gap-2 w-16 h-10">
          <img
            src="/images/avatars/head.webp"
            alt="alonso"
            className="w-10 h-full object-cover rounded-full"
          />
          <DownArrow />
        </div>
      </div>
    </header>
  );
};

export default Header;
