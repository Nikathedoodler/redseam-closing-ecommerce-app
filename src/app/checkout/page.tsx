"use client";

import React, { useState } from "react";
import { useCart } from "../../../components/context/CartContext";

const page = () => {
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [zip, setZip] = useState("");

  const {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    totalItems,
    totalPrice,
    incrementQuantity,
    decrementQuantity,
    removeFromCart,
  } = useCart();
  return (
    <div className="h-screen flex flex-col px-6 lg:px-12 xl:px-16 2xl:px-20 gap-10">
      <h1>Checkout</h1>
      <div className="flex flex-col xl:flex-row items-center justify-between gap-10 xl:gap-20">
        {/* left side - order details */}
        <div className="flex flex-col gap-10 bg-[#F8F6F7] rounded-2xl w-full xl:w-2/3 px-10 py-20">
          <div className="text-xl">Order Details</div>
          <div className="flex gap-6 w-2/3">
            <input
              placeholder="name"
              value={firstName}
              onChange={() => {}}
              className="bg-[#FFFFFF] placeholder-[#3E424A]  w-1/2 p-2 rounded-lg border-2 border-[#E1DFE1]"
            />
            <input
              placeholder="Surname"
              value={lastName}
              onChange={() => {}}
              className="bg-[#FFFFFF] placeholder-[#3E424A] w-1/2 p-2 rounded-lg border-2 border-[#E1DFE1]"
            />
          </div>
          <input
            placeholder="Email"
            value={email}
            onChange={() => {}}
            className="bg-[#FFFFFF] placeholder-[#3E424A] w-2/3 p-2 rounded-lg border-2 border-[#E1DFE1]"
          />
          <div className="flex gap-6 w-2/3">
            <input
              placeholder="Address"
              value={address}
              onChange={() => {}}
              className="bg-[#FFFFFF] placeholder-[#3E424A]  w-1/2 p-2 rounded-lg border-2 border-[#E1DFE1]"
            />
            <input
              placeholder="Zip code"
              value={zip}
              onChange={() => {}}
              className="bg-[#FFFFFF] placeholder-[#3E424A] w-1/2 p-2 rounded-lg border-2 border-[#E1DFE1]"
            />
          </div>
        </div>
        {/* Right side - cart info */}
        <div className="w-full xl:w-1/3 border">sdfsdfasdfadsf</div>
      </div>
    </div>
  );
};

export default page;
