const ProductsListSkeleton = () => {
  return (
    <div className="bg-[#FFFFFF] min-h-screen w-full max-w-[1920px] mx-auto animate-pulse">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between mb-4">
        <div className="h-8 bg-gray-200 rounded w-32"></div>
        <div className="flex items-center gap-4">
          <div className="hidden md:block h-4 bg-gray-200 rounded w-40"></div>
          <div className="h-8 bg-gray-200 rounded w-16"></div>
          <div className="h-8 bg-gray-200 rounded w-20"></div>
        </div>
      </div>

      {/* Products Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12 mb-10 w-full">
        {Array.from({ length: 8 }, (_, i) => (
          <div key={i} className="w-full overflow-hidden border-gray-200">
            {/* Product Image Skeleton */}
            <div className="w-full h-64 bg-gray-200 rounded-lg mb-2"></div>

            {/* Product Info Skeleton */}
            <div className="mt-2 space-y-2">
              <div className="h-5 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Skeleton */}
      <div className="flex items-center justify-center mb-10 h-[32px] gap-2">
        <div className="w-8 h-8 bg-gray-200 rounded"></div>
        <div className="flex gap-2">
          {Array.from({ length: 5 }, (_, i) => (
            <div key={i} className="w-8 h-8 bg-gray-200 rounded"></div>
          ))}
        </div>
        <div className="w-8 h-8 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
};

export default ProductsListSkeleton;
