import Link from "next/link";
import React from "react";

const register = () => {
  return (
    <div className="flex h-screen">
      <div className="hidden lg:block lg:w-1/2 h-full overflow-hidden">
        <img
          src="/images/loginImage.jpeg"
          alt=""
          className="w-full h-full object-cover object-[50%_-20%]"
        />
      </div>
      <div className="w-full md:w-2/3 lg:w-1/2 m-auto flex flex-col px-20 py-10 gap-10">
        <h1 className="text-3xl">Registration</h1>
        <div className="flex flex-col gap-6">
          <input
            placeholder="Username"
            type="text"
            className="border-2 border-[#E1DFE1] p-2 rounded-lg placeholder-[#3E424A]"
          />
          <input
            placeholder="Email"
            type="email"
            className="border-2 border-[#E1DFE1] p-2 rounded-lg placeholder-[#3E424A]"
          />
          <input
            placeholder="Password"
            type="password"
            className="border-2 border-[#E1DFE1] p-2 rounded-lg placeholder-[#3E424A]"
          />
          <input
            placeholder="Confirm Password"
            type="password"
            className="border-2 border-[#E1DFE1] p-2 rounded-lg placeholder-[#3E424A]"
          />
        </div>
        <Link href={""} className="mx-auto w-full">
          <button className="w-full py-2 lg:py-3 bg-[#FF4000] text-[#FFFFFF] text-base sm:text-lg lg:text-xl rounded-xl cursor-pointer hover:bg-[#E63900] transition-colors duration-200">
            Register
          </button>
        </Link>
        <div className="flex mx-auto gap-2">
          <div>Already a member? </div>
          <Link href={"/auth/login"}>
            <div className="text-[#FF4000]">Login</div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default register;
