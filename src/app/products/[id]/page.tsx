"use client";

import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { fetchProduct } from "@/lib/api/products";
import { ProductResponse } from "../../types";

const page = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedQuantity, setSelectedQuantity] = useState<number | null>(1);

  const { id } = useParams();
  const { data, isLoading, isError, error } = useQuery<ProductResponse, Error>({
    queryKey: ["product", id],
    queryFn: () => fetchProduct(id as string),
  });

  useEffect(() => {
    setSelectedImage(data?.cover_image || null);
    setSelectedColor(data?.available_colors[0] || null);
    setSelectedSize(data?.size || null);
    setSelectedQuantity(data?.quantity === 0 ? 0 : 1);
  }, [data]);

  const HandleSelectedImage = (img: string, index: number) => {
    setSelectedImage(img);
    setSelectedColor(
      data?.available_colors[index] ? data.available_colors[index] : null
    );
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

  console.log(data, "data in product page");

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error?.message}</div>;

  return (
    <div className="bg-[#FFFFFF] min-h-screen xl:mx-30 md:mx-20 mx-0 max-w-[1920px]">
      <div className="text-[14px] font-light text-[#10151F] mb-10">
        Listing / Product
      </div>
      <div className="flex gap-4">
        <div className="flex flex-col gap-4 cursor-pointer w-[10%]">
          {data?.images.map((img: string, index: number) => (
            <img
              key={img}
              src={img}
              alt={img}
              onClick={() => HandleSelectedImage(img, index)}
            />
          ))}
        </div>
        <div className="w-1/2 object-cover lg:mr-50 mr-10">
          {selectedImage && (
            <img src={selectedImage} alt={data?.name} className="w-full" />
          )}
        </div>
        <div className="w-1/2 flex flex-col gap-10">
          <div className="flex flex-col gap-4">
            <h2 className="xl:text-[24px] lg:text-[12px] text-[8px] font-semibold text-[#10151F]">
              {data?.name}
            </h2>
            <p className="xl:text-[24px] lg:text-[12px] text-[8px] font-semibold text-[#10151F]">
              $ {data?.price}
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <p className="text-[#10151F] text-[16px]">Color: {selectedColor}</p>
            <div className="flex gap-2">
              {data?.available_colors.map((color, index) => (
                <button
                  key={color}
                  onClick={() => handleColorChange(color, index)}
                  className="w-[38px] h-[38px] rounded-full border-2 border-[#10151F] cursor-pointer"
                  style={{
                    backgroundColor: color,
                    padding: selectedColor === color ? "10" : "0px",
                    width: selectedColor === color ? "48px" : "38px",
                    height: selectedColor === color ? "48px" : "38px",
                  }}
                ></button>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <p className="text-[#10151F] text-[16px]">Size: {selectedSize}</p>
            <div className="flex gap-2">
              {data?.available_sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-[70px] h-[42px] rounded-full border-1 cursor-pointer  ${
                    selectedSize === size
                      ? "border-[#10151F] bg-[#F8F6F7]"
                      : "border-gray-200"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <p className="text-[#10151F] text-[16px]">Quantity</p>
            <div className="flex gap-2">
              <select
                name="quantity"
                id="quantity"
                className="w-[70px] h-[42px] border-1 border-gray-200 rounded-xl cursor-pointer text-center"
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
            <button className="w-full py-[16px] bg-[#FF4000] text-[#FFFFFF] text-[18px] rounded-xl cursor-pointer">
              Add to Cart
            </button>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <p className="text-[#10151F] text-[20px] font-[500]">Details</p>
              <img
                src={data?.brand?.image}
                alt={data?.brand?.name}
                className="w-[109px] h-[61px]"
              />
            </div>
            <div className="flex flex-col gap-4 font-[400]">
              <div>Brand: {data?.brand?.name}</div>
              <div>{data?.description}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
