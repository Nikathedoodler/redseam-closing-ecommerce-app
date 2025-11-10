import React, { useState, useEffect } from "react";
import Image from "next/image";
import CartLogo from "../icons/CartLogo";
import CloseButton from "../icons/CloseButton";
import Link from "next/link";
import { useCart } from "../context/CartContext";
import { useTheme } from "../context/ThemeContext";

type CartProps = {
  className?: string;
};

const Cart = ({ className }: CartProps) => {
  const [isMounted, setIsMounted] = useState(false);

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

  const { isDark } = useTheme();

  const ThemeCondition = isDark
    ? "bg-slate-800 text-white"
    : "bg-[#FFFFFF] text-[#10151F]";

  const deliveryPrice = 5;
  const total = deliveryPrice + totalPrice;

  // Fix hydration mismatch by only rendering dynamic content after mount
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Prevent body scroll when cart is open
  useEffect(() => {
    if (isCartOpen) {
      // Prevent scrolling on the main page
      document.body.style.overflow = "hidden";
    } else {
      // Restore scrolling on the main page
      document.body.style.overflow = "unset";
    }

    // Cleanup function to restore scrolling when component unmounts
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isCartOpen]);

  return (
    <>
      {/* Backdrop Overlay */}
      <div
        className={`fixed inset-0 bg-black z-[60] transition-opacity duration-300 ${
          isCartOpen
            ? "bg-opacity-50 opacity-60"
            : "bg-opacity-0 opacity-0 pointer-events-none"
        }`}
        data-testid="backdrop"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Cart Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-full flex flex-col sm:w-[500px] xl:w-[600px] ${ThemeCondition} shadow-2xl z-[70] transform transition-transform duration-300 ease-in-out ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        } ${className}`}
        data-testid="cart"
      >
        {/* Fixed Header */}
        <div className="flex justify-between items-center p-4 mt-4 flex-shrink-0">
          <h1
            data-testid="header"
            className={`text-[20px] font-[500] ${ThemeCondition}`}
          >
            Shopping Cart {isMounted && `(${totalItems})`}
          </h1>
          <CloseButton onClick={() => setIsCartOpen(false)} />
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6">
          {/* renders when cart is empty */}
          {isMounted && !cartItems.length && (
            <div className="flex flex-col items-center justify-center gap-10 h-full">
              <CartLogo />
              <div className="flex flex-col items-center justify-center gap-2">
                <div className="text-[24px] font-[600]">Ooops!</div>
                <div className="text-[14px] font-[400]">
                  You've got nothing in your cart just yet...
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
          )}

          {/* renders when there are items in the cart */}
          {isMounted && cartItems.length > 0 && (
            <div className="flex flex-col gap-6 pb-6">
              {/* Cart Items */}
              <div className="flex flex-col items-stretch gap-6">
                {cartItems.map((item) => (
                  <div
                    className="flex flex-col justify-between items-strech"
                    key={item.id}
                  >
                    <div className="flex items-stretch gap-4">
                      <Image
                        src={item.cover_image}
                        alt={item.name}
                        width={100}
                        height={100}
                        className="border border-[#E1DFE1] w-1/4 object-cover rounded-xl"
                      />
                      <div className="flex-1 flex flex-col justify-between p-2">
                        <div className="text-md font-[500]">{item.name}</div>
                        <div className="text-sm font-[400]">{item.color}</div>
                        <div className="text-sm font-[400]">{item.size}</div>
                        <div className="flex gap-2 w-1/2 xl:w-1/3 py-1 px-4 border items-center justify-between border-[#E1DFE1] rounded-full">
                          <button
                            onClick={() => {
                              decrementQuantity(item.id);
                            }}
                            className={`cursor-pointer ${
                              item.selectedQuantity === 1 ? "text-gray-700" : ""
                            }`}
                            disabled={item.selectedQuantity === 1}
                            data-testid="decrement"
                          >
                            -
                          </button>
                          <div>{item.selectedQuantity}</div>
                          <button
                            onClick={() => {
                              incrementQuantity(item.id, item.maxStock);
                            }}
                            disabled={item.selectedQuantity === item.maxStock}
                            data-testid="increment"
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

              {/* Summary and Checkout - Fixed at bottom */}
              <div className="flex flex-col gap-10 mt-auto">
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
                <Link href={"/checkout"} onClick={() => setIsCartOpen(false)}>
                  <button className="w-full py-4 sm:py-5 lg:py-6 bg-[#FF4000] text-[#FFFFFF] text-base sm:text-lg lg:text-xl rounded-xl cursor-pointer hover:bg-[#E63900] transition-colors duration-200">
                    Go To Checkout
                  </button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
