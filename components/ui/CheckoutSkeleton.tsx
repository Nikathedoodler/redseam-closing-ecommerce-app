const CheckoutSkeleton = () => {
  return (
    <div className="min-h-screen flex flex-col px-6 lg:px-12 xl:px-16 2xl:px-20 gap-10 animate-pulse">
      {/* Title Skeleton */}
      <div className="xl:ml-2 mx-auto mt-30">
        <div className="h-8 bg-gray-200 rounded w-32"></div>
      </div>

      <div className="w-full md:w-3/5 md:mx-auto xl:w-full flex flex-col xl:flex-row items-start justify-between gap-10 xl:gap-6 2xl:gap-10">
        {/* Left Side - Order Details Form Skeleton */}
        <div className="flex flex-col gap-10 bg-gray-100 rounded-2xl w-full xl:w-1/2 px-10 py-20">
          {/* Form Title */}
          <div className="h-6 bg-gray-200 rounded w-40"></div>

          {/* Name and Surname Inputs */}
          <div className="flex gap-6 w-full xl:w-4/5">
            <div className="w-1/2 h-10 bg-gray-200 rounded-lg"></div>
            <div className="w-1/2 h-10 bg-gray-200 rounded-lg"></div>
          </div>

          {/* Email Input */}
          <div className="w-full xl:w-4/5 h-10 bg-gray-200 rounded-lg"></div>

          {/* Address and Zip Inputs */}
          <div className="flex gap-6 w-full xl:w-4/5">
            <div className="w-1/2 h-10 bg-gray-200 rounded-lg"></div>
            <div className="w-1/2 h-10 bg-gray-200 rounded-lg"></div>
          </div>
        </div>

        {/* Right Side - Cart Summary Skeleton */}
        <div className="w-full xl:w-1/2 rounded-2xl mb-10 xl:px-10">
          <div className="flex flex-col px-6 gap-10">
            {/* Cart Items Skeleton */}
            <div className="flex flex-col gap-6">
              {Array.from({ length: 2 }, (_, i) => (
                <div key={i} className="flex items-stretch gap-4">
                  {/* Product Image */}
                  <div className="w-1/4 h-24 bg-gray-200 rounded-xl"></div>

                  {/* Product Details */}
                  <div className="flex-1 flex flex-col justify-between p-2 gap-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                    <div className="h-8 bg-gray-200 rounded-full w-1/3"></div>
                  </div>

                  {/* Price and Remove */}
                  <div className="flex flex-col justify-between items-center w-1/6 p-2">
                    <div className="h-4 bg-gray-200 rounded w-12"></div>
                    <div className="h-3 bg-gray-200 rounded w-16"></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Price Summary Skeleton */}
            <div className="flex flex-col gap-4 px-2">
              <div className="flex items-center justify-between">
                <div className="h-4 bg-gray-200 rounded w-24"></div>
                <div className="h-4 bg-gray-200 rounded w-16"></div>
              </div>
              <div className="flex items-center justify-between">
                <div className="h-4 bg-gray-200 rounded w-20"></div>
                <div className="h-4 bg-gray-200 rounded w-12"></div>
              </div>
              <div className="flex items-center justify-between">
                <div className="h-4 bg-gray-200 rounded w-16"></div>
                <div className="h-4 bg-gray-200 rounded w-20"></div>
              </div>
            </div>

            {/* Pay Button Skeleton */}
            <div className="w-full h-14 bg-gray-200 rounded-xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSkeleton;
