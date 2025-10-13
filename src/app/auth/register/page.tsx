"use client";

import Link from "next/link";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { fetchRegister } from "../../../lib/api/registration";

type Inputs = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const register = () => {
  const mutation = useMutation({
    mutationFn: fetchRegister,
    onSuccess: (data) => {
      console.log(data, "onSuccess data");
    },
    onError: (error) => {
      console.error(error, "OnError error");
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit: SubmitHandler<Inputs> = (formData) => {
    const apiData = {
      email: formData.email,
      username: formData.username,
      password: formData.password,
      password_confirmation: formData.confirmPassword,
      avatar: "",
    };

    mutation.mutate(apiData);
  };

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
        <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="border-2 border-[#E1DFE1] p-2 rounded-lg placeholder-[#3E424A]">
            <input
              placeholder="Username"
              type="text"
              className="w-full mb-2"
              {...register("username", {
                required: "this field is required",
                minLength: {
                  value: 6,
                  message: "Username must be at least 6 character",
                },
              })}
            />
            <p>{errors.username?.message}</p>
          </div>

          <div className="border-2 border-[#E1DFE1] p-2 rounded-lg placeholder-[#3E424A]">
            <input
              placeholder="Email"
              type="email"
              className="w-full mb-2"
              {...register("email", {
                required: "This field is required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Invalid email format",
                },
              })}
            />
            <p>{errors.email?.message}</p>
          </div>

          <div className="border-2 border-[#E1DFE1] p-2 rounded-lg placeholder-[#3E424A]">
            <input
              placeholder="Password"
              type="password"
              className="w-full mb-2"
              {...register("password", {
                required: "This field is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 character",
                },
              })}
            />
            <p>{errors.password?.message}</p>
          </div>

          <div className="border-2 border-[#E1DFE1] p-2 rounded-lg placeholder-[#3E424A]">
            <input
              placeholder="Confirm Password"
              type="password"
              className="w-full mb-2"
              {...register("confirmPassword", {
                required: "This field is required",
                validate: (value) =>
                  value === watch("password") || "Passwords do not match",
              })}
            />
            <p>{errors.confirmPassword?.message}</p>
          </div>
          <button
            className="w-full py-2 lg:py-3 bg-[#FF4000] text-[#FFFFFF] text-base sm:text-lg lg:text-xl rounded-xl cursor-pointer hover:bg-[#E63900] transition-colors duration-200"
            type="submit"
          >
            Register
          </button>
        </form>
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
