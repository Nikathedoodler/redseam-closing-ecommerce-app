"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { fetchRegister } from "../../../lib/api/Registration";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../../components/context/AuthContext";

type Inputs = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type ApiError = {
  response: {
    status: number;
    data: Record<string, string> | { message: string };
  };
};

const Register = () => {
  const [, setApiErrors] = useState<Record<string, string>>({});

  const router = useRouter();

  const { login } = useAuth();

  const mutation = useMutation({
    mutationFn: fetchRegister,
    onSuccess: (data) => {
      login(data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      router.push("./auth/login");
    },
    onError: (error: ApiError) => {
      if (error?.response?.status === 422) {
        const errors = error.response.data;
        setApiErrors(errors);
      } else if (error?.response?.status === 401) {
        const message = error.response.data.message || "Unauthorized access.";
        setApiErrors({ general: message });
      } else {
        setApiErrors({ general: "Something went wrong. Please try again." });
      }
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
      <div className="hidden lg:block lg:w-1/2 h-full overflow-hidden relative">
        <Image
          src="/images/loginImage.jpeg"
          alt="Register"
          fill
          className="object-cover object-[50%_-20%]"
        />
      </div>
      <div className="w-full max-w-2xl m-auto flex flex-col px-20 py-10 gap-10">
        <h1 className="text-3xl">Registration</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-2">
            <input
              placeholder="Username"
              type="text"
              className="w-full border-2 border-[#E1DFE1] p-2 rounded-lg"
              {...register("username", {
                required: "this field is required",
                minLength: {
                  value: 6,
                  message: "Username must be at least 6 character",
                },
              })}
            />
            <p className="text-red-500 text-sm">{errors.username?.message}</p>
          </div>

          <div className="flex flex-col gap-2">
            <input
              placeholder="Email"
              type="email"
              className="w-full border-2 border-[#E1DFE1] p-2 rounded-lg"
              {...register("email", {
                required: "This field is required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Invalid email format",
                },
              })}
            />
            <p className="text-red-500 text-sm">{errors.email?.message}</p>
          </div>

          <div className="flex flex-col gap-2">
            <input
              placeholder="Password"
              type="password"
              className="w-full border-2 border-[#E1DFE1] p-2 rounded-lg"
              {...register("password", {
                required: "This field is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 character",
                },
              })}
            />
            <p className="text-red-500 text-sm">{errors.password?.message}</p>
          </div>

          <div className="flex flex-col gap-2">
            <input
              placeholder="Confirm Password"
              type="password"
              className="w-full border-2 border-[#E1DFE1] p-2 rounded-lg"
              {...register("confirmPassword", {
                required: "This field is required",
                validate: (value) =>
                  value === watch("password") || "Passwords do not match",
              })}
            />
            <p className="text-red-500 text-sm">
              {errors.confirmPassword?.message}
            </p>
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
          <div
            className="text-[#FF4000] cursor-pointer"
            onClick={() => router.push("/auth/login")}
          >
            Login
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
