"use client";

import { baseUrl } from "@/constants/api";
import axios from "axios";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const ResetPasswordPage = () => {
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

  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      // Add your login logic here (e.g., calling your NestJS API)
      // console.log("Logging in with:", data);

      const res = await axios.patch(`${baseUrl}/auth/change-password`, data);

      // console.log(res);
      // localStorage?.setItem("accessToken", res?.data?.access_token);
      // setCookie("refreshToken", res?.data?.refresh_token);

      toast?.success("Password Changed Successfully");

      router?.push("/login");
    } catch (error) {
      console.log(error);
      if (error?.response?.status === 400) {
        toast?.error(error?.response?.data?.message || "something went wrong");
      } else if (error?.response?.status === 401) {
        toast?.error(error?.response?.data?.message || "something went wrong");
      } else {
        toast?.error(error?.message || "something went wrong");
      }
    } finally {
      setTimeout(() => setLoading(false), 2000);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-4xl font-bold text-gray-900">
            Online Diary
          </h2>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Change Your Password
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                className="appearance-none  relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="email@example.com"
                // value={formData.email}
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
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                loading ? "bg-indigo-400" : "bg-indigo-600 hover:bg-indigo-700"
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors`}
            >
              {loading ? "Changing..." : "Change Password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
