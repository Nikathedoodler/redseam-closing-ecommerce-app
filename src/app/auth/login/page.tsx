"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { fetchLogin } from "../../../lib/api/login";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../../components/context/AuthContext";

type Inputs = {
  email: string;
  password: string;
};

type ApiError = {
  response: {
    status: number;
    data: Record<string, string>;
  };
};

const Login = () => {
  const [apiErrors, setApiErrors] = useState<Record<string, string>>({});

  const router = useRouter();

  const { login } = useAuth();

  const mutation = useMutation({
    mutationFn: fetchLogin,
    onSuccess: (data) => {
      login(data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      router.push("/products");
    },
    onError: (error: ApiError) => {
      if (error?.response?.status === 422) {
        const errors = error.response.data;
        setApiErrors(errors);
      } else if (error?.response?.status === 401) {
        const errors = error.response.data;
        setApiErrors(errors);
      } else {
        setApiErrors({ general: "Something went wrong. Please try again." });
      }
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const submit: SubmitHandler<Inputs> = (loginData) => {
    mutation.mutate(loginData);
  };

  return (
    <div className="flex h-screen">
      <div className="hidden lg:block lg:w-1/2 h-full overflow-hidden relative">
        <Image
          src="/images/loginImage.jpeg"
          alt="Login"
          fill
          className="object-[50%_-20%] object-cover"
        />
      </div>
      <div className="w-full max-w-2xl m-auto flex flex-col px-20 py-10 gap-10">
        <h1 className="text-3xl">Log in</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(submit)}>
          <div>
            <input
              placeholder="Email"
              type="email"
              className="p-2 rounded-lg mb-2 placeholder-[#3E424A] w-full relative border-2 border-[#E1DFE1]"
              {...register("email", {
                required: "This field is required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Invalid email format",
                },
              })}
            />
            {/* <span className="absolute left-15 top-1/2 -translate-y-1/2 text-[#FF4000] pointer-events-none">
              *
            </span> */}
            <p className="text-red-500 text-sm">{errors.email?.message}</p>
          </div>
          <div className="relative">
            <input
              placeholder="Password"
              type="password"
              className="w-full border-2 mb-2 border-[#E1DFE1] p-2 rounded-lg placeholder-[#3E424A]"
              {...register("password", { required: "This field is required" })}
            />
            {/* <span className="text-[#FF4000] absolute left-24 top-1/2 -translate-y-1/2 pointer-events-none">
              *
            </span> */}
            <p className="text-red-500 text-sm">{errors.password?.message}</p>
          </div>

          <button
            className="w-full py-2 lg:py-3 bg-[#FF4000] text-[#FFFFFF] text-base sm:text-lg lg:text-xl rounded-xl cursor-pointer hover:bg-[#E63900] transition-colors duration-200"
            type="submit"
          >
            Log in
          </button>
        </form>
        {apiErrors && (
          <p className="text-red-500 text-md font-semibold mx-auto">
            {apiErrors.message}
          </p>
        )}
        <div className="flex mx-auto gap-2 -mt-12">
          <div>Not a member? </div>
          <Link href={"/auth/register"}>
            <div className="text-[#FF4000]">Register</div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
