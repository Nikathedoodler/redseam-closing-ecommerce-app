"use client";

import React from "react";
import Link from "next/link";

const ConfirmationPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 lg:px-12 xl:px-16 2xl:px-20">
      <div className="flex flex-col items-center gap-8 max-w-md text-center">
        <div className="text-6xl">🎉</div>
        <h1 className="text-3xl sm:text-4xl font-semibold text-[#10151F]">
          Order Confirmed!
        </h1>
        <p className="text-lg text-gray-600">
          Thank you for your purchase! Your order has been confirmed and will be
          shipped soon.
        </p>
        <Link href="/products" className="w-full">
          <button className="w-full py-4 bg-[#FF4000] text-white text-lg rounded-xl hover:bg-[#E63900] transition-colors duration-200 cursor-pointer">
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ConfirmationPage;
