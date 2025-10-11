import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="mt-30 flex overscroll-none">
      <div className="hidden lg:block lg:w-1/2">
        <img src="/images/loginImage.jpeg" alt="" className="object-cover" />
      </div>
      <div className="w-full md:w-2/3 lg:w-1/2 m-auto flex flex-col px-20 py-30 gap-10">
        <h1 className="text-3xl">Log in</h1>
        <div className="flex flex-col gap-6">
          <div className="relative w-full border-2 border-[#E1DFE1] rounded-lg">
            <input
              placeholder="Email"
              type="email"
              className="p-2 rounded-lg placeholder-[#3E424A] w-full"
            />
            <span className="absolute left-15 top-1/2 -translate-y-1/2 text-[#FF4000] pointer-events-none">
              *
            </span>
          </div>
          <div className="relative rounded-lg">
            <input
              placeholder="Password"
              type="passowrd"
              className="w-full border-2 border-[#E1DFE1] p-2 rounded-lg placeholder-[#3E424A]"
            />
            <span className="text-[#FF4000] absolute left-24 top-1/2 -translate-y-1/2 pointer-events-none">
              *
            </span>
          </div>
        </div>
        <Link href={""} className="mx-auto w-full">
          <button className="w-full py-2 lg:py-3 bg-[#FF4000] text-[#FFFFFF] text-base sm:text-lg lg:text-xl rounded-xl cursor-pointer hover:bg-[#E63900] transition-colors duration-200">
            Log in
          </button>
        </Link>
        <div className="flex mx-auto gap-2">
          <div>Not a member? </div>
          <Link href={"/auth/register"}>
            <div className="text-[#FF4000]">Register</div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default page;
