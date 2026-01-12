"use client";

import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import useResetPassword from "../api/useResetPassword";
import { useState } from "react";
import { EyeOff, Eye } from "lucide-react";

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

  const { mutateAsync: resetPassword, isPending: loading } = useResetPassword();

  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const onSubmit = async (data) => {
    const res = await resetPassword({ data });
    router?.push("/login");
  };
  return (
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
          <div className="relative">
            <input
              type={isVisible ? "text" : "password"}
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500  sm:text-sm"
              placeholder="••••••••"
              {...register("password", {
                required: true,
                minLength: { value: 4, message: "Password too short" },
              })}
            />

            {/* Toggle Button */}
            <button
              type="button"
              onClick={toggleVisibility}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
              // tabIndex={-1} // Prevents tabbing to the icon for better keyboard flow
              aria-label={isVisible ? "Hide password" : "Show password"}
            >
              {isVisible ? (
                <EyeOff size={20} strokeWidth={2} />
              ) : (
                <Eye size={20} strokeWidth={2} />
              )}
            </button>
          </div>

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
  );
};

export default ResetPasswordPage;
