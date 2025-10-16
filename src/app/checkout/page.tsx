"use client";

import React, { useState, useEffect } from "react";
import { useCart } from "../../../components/context/CartContext";
import Link from "next/link";
import CartLogo from "../../../components/icons/CartLogo";

const Checkout = () => {
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [zip, setZip] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  const {
    cartItems,
    totalPrice,
    incrementQuantity,
    decrementQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  const deliveryPrice = 5;
  const total = deliveryPrice + totalPrice;

  // Fix hydration mismatch
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Show loading state until mounted
  if (!isMounted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 lg:px-12 xl:px-16 2xl:px-20 gap-10">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  // Show empty cart message if cart is empty
  if (!cartItems.length) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 lg:px-12 xl:px-16 2xl:px-20 gap-10">
        <CartLogo />
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="text-[24px] font-[600] text-[#10151F]">Ooops!</div>
          <div className="text-[14px] font-[400] text-[#10151F]">
            You&apos;ve got nothing in your cart just yet...
          </div>
        </div>
        <Link href="/products" className="w-1/3 sm:w-1/2 lg:w-2/5">
          <button className="w-full py-4 bg-[#FF4000] text-[#FFFFFF] text-base sm:text-lg lg:text-xl rounded-xl cursor-pointer hover:bg-[#E63900] transition-colors duration-200">
            Start Shopping
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen max-w-7xl xl:mx-auto flex flex-col px-6 lg:px-12 gap-10">
      <h1 className="xl:ml-2 mx-auto text-2xl mt-30">Checkout</h1>
      <div className="w-full md:mx-auto flex flex-col lg:flex-row items-start justify-between gap-10 xl:gap-6">
        {/* left side - order details */}
        <div className="flex flex-col gap-10 bg-[#F8F6F7] rounded-2xl w-full xl:w-1/2 px-10 py-20">
          <div className="text-xl">Order Details</div>
          <div className="flex flex-col gap-10">
            <div className="flex gap-6 w-full">
              <input
                placeholder="name"
                value={firstName}
                onChange={(e) => setFirstname(e.target.value)}
                className="bg-[#FFFFFF] placeholder-[#3E424A]  w-1/2 p-2 rounded-lg border-2 border-[#E1DFE1]"
              />
              <input
                placeholder="Surname"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="bg-[#FFFFFF] placeholder-[#3E424A] w-1/2 p-2 rounded-lg border-2 border-[#E1DFE1]"
              />
            </div>
            <input
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-[#FFFFFF] placeholder-[#3E424A] w-full p-2 rounded-lg border-2 border-[#E1DFE1]"
            />
            <div className="flex gap-6 w-full">
              <input
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="bg-[#FFFFFF] placeholder-[#3E424A]  w-1/2 p-2 rounded-lg border-2 border-[#E1DFE1]"
              />
              <input
                placeholder="Zip code"
                value={zip}
                onChange={(e) => setZip(e.target.value)}
                className="bg-[#FFFFFF] placeholder-[#3E424A] w-1/2 p-2 rounded-lg border-2 border-[#E1DFE1]"
              />
            </div>
          </div>
        </div>
        {/* Right side - cart info */}
        <div className="w-full xl:w-1/2 rounded-2xl mb-10 xl:px-10">
          <div className="flex flex-col justify-between px-6 gap-10">
            <div className="flex flex-col items-stretch gap-6">
              {cartItems.map((item) => (
                <div
                  className="flex flex-col justify-between items-strech"
                  key={item.id}
                >
                  <div className="flex items-stretch gap-4">
                    <img
                      src={item.cover_image}
                      alt=""
                      className="border border-[#E1DFE1] w-1/4 object-cover rounded-xl p-4"
                    />
                    <div className="flex-1 flex flex-col justify-between p-2">
                      <div className="text-md font-[500]">{item.name}</div>
                      <div className="text-sm font-[400]">{item.color}</div>
                      <div className="text-sm font-[400]">{item.size}</div>
                      <div className="flex gap-2 w-1/2 sm:w-1/3 md:w-1/2 lg:w-1/3 xl:w-1/2 2xl:w-1/3 py-1 px-4 border items-center justify-between border-[#E1DFE1] rounded-full">
                        <button
                          onClick={() => decrementQuantity(item.id)}
                          className={`cursor-pointer ${
                            item.selectedQuantity === 1 ? "text-gray-700" : ""
                          }`}
                          disabled={item.selectedQuantity === 1}
                        >
                          -
                        </button>
                        <div>{item.selectedQuantity}</div>
                        <button
                          onClick={() =>
                            incrementQuantity(item.id, item.maxStock)
                          }
                          disabled={item.selectedQuantity === item.maxStock}
                          className={`cursor-pointer ${
                            item.selectedQuantity === item.maxStock
                              ? "text-gray-700"
                              : ""
                          }`}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-col justify-between items-center w-1/6 p-2">
                      <div className="text-md font-[500]">$ {item.price}</div>
                      <button
                        className="text-xs font-[400] cursor-pointer"
                        onClick={() => removeFromCart(item)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {cartItems.length && (
              <div className="flex flex-col gap-10">
                <div className="flex flex-col gap-4 px-2">
                  <div className="flex items-center justify-between">
                    <div>Items subtotal</div>
                    <div>$ {totalPrice}</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>Delivery</div>
                    <div>$ {deliveryPrice}</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>Total</div>
                    <div>$ {total}</div>
                  </div>
                </div>
                <Link
                  href={"/confirmation"}
                  className="mx-auto w-full"
                  onClick={() => clearCart()}
                >
                  <button className="w-full py-4 bg-[#FF4000] text-[#FFFFFF] text-base sm:text-lg lg:text-xl rounded-xl cursor-pointer hover:bg-[#E63900] transition-colors duration-200">
                    Pay
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
