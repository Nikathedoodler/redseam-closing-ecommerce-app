"use client";

import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { fetchProduct } from "@/lib/api/products";
import { ProductResponse } from "../../types";
import ProductSkeleton from "../../../../components/ui/ProductSkeleton";
import Cart from "../../../../components/ui/Cart";
import { useCart, CartItem } from "../../../../components/context/CartContext";

const page = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null | undefined>(
    null
  );
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedQuantity, setSelectedQuantity] = useState<number>(1);
  // const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  const { isCartOpen, setIsCartOpen, addToCart } = useCart();

  const { id } = useParams();
  const { data, isLoading, isError, error } = useQuery<ProductResponse, Error>({
    queryKey: ["product", id],
    queryFn: () => fetchProduct(id as string),
  });

  useEffect(() => {
    setSelectedImage(data?.cover_image || null);
    setSelectedColor(data?.available_colors?.[0] || null);
    setSelectedSize(data?.size || null);
    setSelectedQuantity(data?.quantity === 0 ? 0 : 1);
  }, [data]);

  const handleSelectedImage = (img: string, index: number) => {
    setSelectedImage(img);
    setSelectedColor(data?.available_colors?.[index] || null);
  };

  const handleColorChange = (color: string, index: number) => {
    setSelectedColor(color);
    setSelectedImage(
      data?.images && data.images[index] ? data.images[index] : null
    );
  };

  const maxQuantity = data?.quantity || 1;
  const quantityOptions =
    maxQuantity > 0
      ? Array.from({ length: maxQuantity }, (_, i) => i + 1)
      : [1];

  const handleAddToCart = () => {
    if (!data) {
      console.error("No product data available");
      return;
    }

    const itemData: CartItem = {
      id: data?.id,
      cover_image: data?.cover_image,
      name: data?.name,
      price: data?.price,
      selectedQuantity,
      maxStock: data?.quantity,
      total_price: data?.total_price,
      size: data?.size ?? undefined,
      color: selectedColor ?? undefined,
    };

    addToCart(itemData);
  };

  if (isLoading) return <ProductSkeleton />; // Better UX
  if (isError) return <div>Error: {error?.message}</div>; // Better UX

  return (
    <div className="bg-[#FFFFFF] w-full max-w-6xl min-h-screen px-6 sm:px-12 lg:px-18 mx-auto mt-20">
      <div className="text-xs sm:text-sm font-light text-[#10151F] mb-6 sm:mb-8 lg:mb-10">
        Listing / Product
      </div>
      <div className="flex flex-col lg:flex-row gap-2 sm:gap-4 lg:gap-8">
        {/* Images Section */}
        <div className="w-full lg:w-3/4">
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
            {/* Thumbnails */}
            <div className="flex flex-row sm:flex-col gap-2 sm:gap-4 sm:w-20 lg:w-24">
              {data?.images.map((img: string, index: number) => (
                <img
                  key={img}
                  src={img}
                  alt={img}
                  className="w-16 h-16 sm:w-full sm:h-20 lg:h-24 object-cover rounded cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={() => handleSelectedImage(img, index)}
                />
              ))}
            </div>

            {/* Main Image */}
            <div className="flex-1">
              {selectedImage && (
                <img
                  src={selectedImage}
                  alt={data?.name}
                  className="w-full max-h-96 sm:max-h-[500px] lg:max-h-[600px] object-contain rounded-lg"
                />
              )}
            </div>
          </div>
        </div>

        {/* Product Info Section */}
        <div className="w-full lg:w-1/2 flex flex-col gap-4 sm:gap-6 lg:gap-10">
          <div className="flex flex-col gap-4">
            <h2 className="text-xl sm:text-xl md:text-2xl xl:text-2xl font-semibold text-[#10151F]">
              {data?.name}
            </h2>
            <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-semibold text-[#10151F]">
              $ {data?.price}
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <p className="text-[#10151F] text-sm sm:text-base lg:text-lg">
              Color: {selectedColor}
            </p>
            <div className="flex gap-2 flex-wrap">
              {data?.available_colors.map((color, index) => (
                <button
                  key={color}
                  onClick={() => handleColorChange(color, index)}
                  className={`w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full border-2 cursor-pointer transition-all duration-200 ${
                    selectedColor === color
                      ? "border-[#10151F] scale-110"
                      : "border-gray-300 hover:border-gray-500"
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <p className="text-[#10151F] text-sm sm:text-base lg:text-lg">
              Size: {selectedSize}
            </p>
            <div className="flex gap-2 flex-wrap">
              {data?.available_sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 sm:px-6 sm:py-3 rounded-full border cursor-pointer transition-all duration-200 text-sm sm:text-base ${
                    selectedSize === size
                      ? "border-[#10151F] bg-[#F8F6F7]"
                      : "border-gray-200 hover:border-gray-400"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <p className="text-[#10151F] text-sm sm:text-base lg:text-lg">
              Quantity
            </p>
            <div className="flex gap-2">
              <select
                name="quantity"
                id="quantity"
                className="w-20 sm:w-24 h-10 sm:h-12 border border-gray-200 rounded-xl cursor-pointer text-center text-sm sm:text-base"
                value={selectedQuantity || ""}
                onChange={(e) => setSelectedQuantity(Number(e.target.value))}
              >
                {quantityOptions.map((qty) => (
                  <option key={qty} value={qty}>
                    {qty}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <button
              className="w-full py-4 sm:py-5 lg:py-6 bg-[#FF4000] text-[#FFFFFF] text-base sm:text-lg lg:text-xl rounded-xl cursor-pointer hover:bg-[#E63900] transition-colors duration-200"
              onClick={() => {
                setIsCartOpen(true);
                handleAddToCart();
              }}
            >
              Add to Cart
            </button>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <p className="text-[#10151F] text-lg sm:text-xl lg:text-2xl font-medium">
                Details
              </p>
              <img
                src={data?.brand?.image}
                alt={data?.brand?.name}
                className="w-20 h-12 sm:w-24 sm:h-14 lg:w-28 lg:h-16 object-contain"
              />
            </div>
            <div className="flex flex-col gap-4 text-sm sm:text-base lg:text-lg">
              <div>Brand: {data?.brand?.name}</div>
              <div>{data?.description}</div>
            </div>
          </div>
        </div>
      </div>
      <Cart />
    </div>
  );
};

export default page;
