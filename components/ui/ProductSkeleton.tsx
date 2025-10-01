// components/ui/ProductSkeleton.tsx
const ProductSkeleton = () => {
  return (
    <div className="bg-[#FFFFFF] min-h-screen xl:mx-30 md:mx-20 mx-0 max-w-[1920px] animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-32 mb-10"></div>

      <div className="flex gap-4">
        {/* Image thumbnails skeleton */}
        <div className="flex flex-col gap-4 w-[10%]">
          {[1, 2, 3].map((i) => (
            <div key={i} className="w-full h-20 bg-gray-200 rounded"></div>
          ))}
        </div>

        {/* Main image skeleton */}
        <div className="w-1/2">
          <div className="w-full h-96 bg-gray-200 rounded"></div>
        </div>

        {/* Product info skeleton */}
        <div className="w-1/2 flex flex-col gap-10">
          <div className="h-8 bg-gray-200 rounded w-3/4"></div>
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>

          {/* Color swatches skeleton */}
          <div className="flex gap-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-10 h-10 bg-gray-200 rounded-full"></div>
            ))}
          </div>

          {/* Size buttons skeleton */}
          <div className="flex gap-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-16 h-10 bg-gray-200 rounded-full"></div>
            ))}
          </div>

          {/* Quantity skeleton */}
          <div className="w-20 h-10 bg-gray-200 rounded"></div>

          {/* Add to cart button skeleton */}
          <div className="w-full h-12 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default ProductSkeleton;
