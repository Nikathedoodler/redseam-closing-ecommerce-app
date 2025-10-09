import React from "react";
import CartLogo from "../icons/CartLogo";
import CloseButton from "../icons/CloseButton";
import Link from "next/link";
import { useCart } from "../context/CartContext";

type CartProps = {
  className?: string;
};

const Cart = ({ className }: CartProps) => {
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

  console.log(cartItems, "cartItems");
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
        className={`fixed top-0 right-0 h-full w-full flex flex-col ${
          !cartItems.length ? "gap-30" : "gap-10"
        } sm:w-[500px] xl:w-[600px] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        } ${className}`}
      >
        <div className="flex justify-between items-center p-4 mt-4">
          <h1 className="text-[20px] font-[500] text-[#10151F]">
            Sopping Cart ({totalItems})
          </h1>
          <CloseButton onClick={() => setIsCartOpen(false)} />
        </div>

        {/* renders when cart is empty */}
        {!cartItems.length && (
          <div className="flex flex-col items-center justify-center gap-10">
            <CartLogo />
            <div className="flex flex-col items-center justify-center gap-2">
              <div className="text-[24px] font-[600] text-[#10151F]">
                Ooops!
              </div>
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
        )}
        <div className="flex flex-col items-stretch gap-6 px-6">
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-stretch gap-4">
              <img
                src={item.cover_image}
                alt=""
                className="border border-[#E1DFE1] w-1/4 object-cover rounded-xl p-4"
              />
              <div className="flex-1 flex flex-col justify-between p-2">
                <div className="text-md font-[500]">{item.name}</div>
                <div className="text-sm font-[400]">{item.color}</div>
                <div className="text-sm font-[400]">{item.size}</div>
                <div className="flex gap-2 w-1/2 xl:w-1/3 py-1 px-4 border items-center justify-between border-[#E1DFE1] rounded-full">
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
                    onClick={() => incrementQuantity(item.id, item.maxStock)}
                    disabled={item.selectedQuantity === item.maxStock}
                    className={`cursor-pointer ${
                      item.selectedQuantity === item.maxStock
                        ? "text-graay-700"
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
          ))}
        </div>
      </div>
    </>
  );
};

export default Cart;
