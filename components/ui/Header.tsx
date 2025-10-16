"use client";

import React, { useState, useRef, useEffect } from "react";
import Logo from "../icons/Logo";
import CartBlack from "../icons/CartBlack";
import DownArrow from "../icons/DownArrow";
import ProfileAvatar from "../icons/ProfileAvatar";
import Cart from "./Cart";
import { useCart } from "../context/CartContext";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const { isCartOpen, totalItems, setIsCartOpen } = useCart();
  const [isMounted, setIsMounted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const router = useRouter();

  const {
    checkAuth,
    logout,
    isAuthenticated,
    isDropdownOpen,
    setIsDropdownOpen,
  } = useAuth();

  useEffect(() => {
    setIsMounted(true);
    checkAuth();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <header
      className="w-full max-w-6xl mx-auto fixed top-0 left-0 right-0 z-50  bg-white flex items-center justify-between py-4 px-6 lg:px-12 xl:px-16 2xl:px-20"
      ref={dropdownRef}
    >
      {/* Logo Section */}
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => router.push("/products")}
      >
        <Logo />
        <h1 className="font-[600] text-sm sm:text-base lg:text-lg text-[#10151F]">
          RedSeam Clothing
        </h1>
      </div>

      {/* Cart and User Profile Section */}
      <div className="flex items-center gap-5 relative">
        {isMounted && isAuthenticated && (
          <div className="relative">
            <CartBlack
              onClick={() => setIsCartOpen(!isCartOpen)}
              className="cursor-pointer hover:opacity-80 transition-opacity"
            />
            {isMounted && totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#FF4000] text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center shadow-md">
                {totalItems > 99 ? "99+" : totalItems}
              </span>
            )}
          </div>
        )}

        {/* Conditional rendering based on authentication */}
        {isMounted && isAuthenticated ? (
          <>
            {/* User Profile - Only show when authenticated */}
            <div className="flex items-center gap-2 w-10 h-10 cursor-pointer hover:opacity-80 transition-opacity">
              <img
                src="/images/avatars/head.webp"
                alt="alonso"
                className="w-10 h-full object-cover rounded-full"
                onClick={() => router.push("/products")}
              />
            </div>
            <DownArrow
              handleDropdown={setIsDropdownOpen}
              dropdownOpen={isDropdownOpen}
            />
          </>
        ) : (
          <div className="flex gap-4 items-center">
            <ProfileAvatar className="mx-auto" />
            <p
              className="cursor-pointer"
              onClick={() => router.push("/auth/login")}
            >
              Log in
            </p>
          </div>
        )}

        {isDropdownOpen && isAuthenticated && (
          <div className="absolute top-12 right-0 bg-white border border-[#E1DFE1] rounded-md shadow-lg min-w-[120px] z-10">
            <button
              className="w-full text-xs border border-[#E1DFE1] rounded-md p-2 text-center text-[#FFFFFF] bg-[#FF4000] hover:bg-[#E63900] transition-colors cursor-pointer"
              onClick={logout}
            >
              Sign Out
            </button>
          </div>
        )}
      </div>

      {/* Cart Sidebar - Rendered outside the header flow */}
      <Cart />
    </header>
  );
};

export default Header;
