"use client";

import { baseUrl } from "@/constants/constants";
import api from "@/utils/axios";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import useSignUp from "../api/useSignUp";

const SignUpPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      role: "",
    },
  });

  const router = useRouter();

  const { mutateAsync: signup, isPending: loading } = useSignUp();

  const onSubmit = async (data) => {
    const res = await signup({ data });
    router.push("/login");
  };
  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">
            User Name
          </label>
          <input
            type="text"
            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="User Name"
            // value={formData.password}
            {...register("username", {
              required: true,
              minLength: { value: 4, message: "Password too short" },
              // onChange: handleChange,
            })}
          />

          {errors?.username && (
            <span className="text-red-500">
              {errors?.username?.message
                ? errors?.username?.message
                : "This field is required"}
            </span>
          )}
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input
            type="email"
            className="appearance-none  relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="email@example.com"
            {...register("email", {
              required: true,
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/,
                message: "This is not a valid email.",
              },
              // onChange: handleChange,
            })}
          />
          {errors?.email && (
            <span className="text-red-500">
              {errors?.email?.message
                ? errors?.email?.message
                : "This field is required"}
            </span>
          )}
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="••••••••"
            // value={formData.password}
            {...register("password", {
              required: true,
              minLength: { value: 4, message: "Password too short" },
              // onChange: handleChange,
            })}
          />

          {errors?.password && (
            <span className="text-red-500">
              {errors?.password?.message
                ? errors?.password?.message
                : "This field is required"}
            </span>
          )}
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">
            Role
          </label>
          <select
            {...register("role")}
            className="appearance-none  relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
          >
            <option
              value="admin"
              className="appearance-none  relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            >
              Admin
            </option>
            <option
              value="user"
              className="appearance-none  relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            >
              User
            </option>
          </select>

          {errors?.password && (
            <span className="text-red-500">
              {errors?.password?.message
                ? errors?.password?.message
                : "This field is required"}
            </span>
          )}
        </div>
      </div>

      <div>
        <button
          type="submit"
          disabled={loading}
          className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
            loading ? "bg-indigo-400" : "bg-indigo-600 hover:bg-indigo-700"
          } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors`}
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
      </div>
    </form>
  );
};

export default SignUpPage;
