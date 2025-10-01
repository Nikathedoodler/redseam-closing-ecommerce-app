// components/ui/ProductSkeleton.tsx
const ProductSkeleton = () => {
  return (
    <div className="bg-[#FFFFFF] min-h-screen px-6 sm:px-6 lg:px-12 xl:px-16 2xl:px-20 max-w-[1920px] mx-auto animate-pulse">
      <div className="h-3 sm:h-4 bg-gray-200 rounded w-32 mb-6 sm:mb-8 lg:mb-10"></div>

      <div className="flex flex-col lg:flex-row gap-2 sm:gap-4 lg:gap-8">
        {/* Images Section Skeleton */}
        <div className="w-full lg:w-1/2">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Thumbnails skeleton */}
            <div className="flex flex-row sm:flex-col gap-2 sm:gap-4 sm:w-20 lg:w-24">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-16 h-16 sm:w-full sm:h-20 lg:h-24 bg-gray-200 rounded"
                ></div>
              ))}
            </div>

            {/* Main image skeleton */}
            <div className="flex-1">
              <div className="w-full max-h-96 sm:max-h-[500px] lg:max-h-[600px] h-64 sm:h-80 lg:h-96 bg-gray-200 rounded-lg"></div>
            </div>
          </div>
        </div>

        {/* Product info skeleton */}
        <div className="w-full lg:w-1/2 flex flex-col gap-6 lg:gap-10">
          <div className="h-6 sm:h-8 lg:h-10 bg-gray-200 rounded w-3/4"></div>
          <div className="h-5 sm:h-6 lg:h-8 bg-gray-200 rounded w-1/4"></div>

          {/* Color swatches skeleton */}
          <div className="flex gap-2 flex-wrap">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gray-200 rounded-full"
              ></div>
            ))}
          </div>

          {/* Size buttons skeleton */}
          <div className="flex gap-2 flex-wrap">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="w-16 h-8 sm:w-20 sm:h-10 bg-gray-200 rounded-full"
              ></div>
            ))}
          </div>

          {/* Quantity skeleton */}
          <div className="w-20 sm:w-24 h-10 sm:h-12 bg-gray-200 rounded-xl"></div>

          {/* Add to cart button skeleton */}
          <div className="w-full h-12 sm:h-14 lg:h-16 bg-gray-200 rounded-xl"></div>

          {/* Details skeleton */}
          <div className="h-6 sm:h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="h-4 sm:h-5 bg-gray-200 rounded w-1/2"></div>
          <div className="h-4 sm:h-5 bg-gray-200 rounded w-full"></div>
        </div>
      </div>
    </div>
  );
};

export default ProductSkeleton;
