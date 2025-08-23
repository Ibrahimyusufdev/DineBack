import { loginFormSchema } from "../schema/loginFormSchema.js";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore.js";
import { useNavigate } from "react-router-dom";

export const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginFormSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const login = useAuthStore((state) => state.login);
  const loading = useAuthStore((state) => state.loading);
  const error = useAuthStore((state) => state.error);
  const navigate = useNavigate();

  const handleLogin = async (loginData) => {
    try {
      console.log(loginData);
      await login(loginData);
      if (useAuthStore.getState().token) {
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="mt-6 bg-silver px-2 py-2">
      <form className="container mx-auto max-w-lg rounded-2xl bg-white px-6 py-8 shadow-md">
        <h2 className="mb-6 text-center text-2xl font-semibold">Sign In</h2>

        {/* Email */}
        <div className="mb-4 flex flex-col">
          <label htmlFor="email" className="mb-1 text-base">
            Email Address
          </label>
          <input
            {...register("email")}
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            className="focus:ring-blue-500 rounded-lg border px-3 py-2 focus:outline-none focus:ring-2"
          />
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        </div>

        {/* Password */}
        <div className="mb-6 flex flex-col">
          <label htmlFor="password" className="mb-2 text-sm font-medium text-gray-700">
            Password
          </label>

          <div className="relative flex items-center">
            <input
              {...register("password")}
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              placeholder="Enter your password"
              className="focus:border-blue-500 focus:ring-blue-400 w-full rounded-xl border border-gray-300 px-3 py-2 pr-10 text-sm transition focus:outline-none focus:ring-2"
            />
            <button
              onClick={() => setShowPassword((prev) => !prev)}
              type="button"
              className="absolute right-3 flex items-center text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errors.password && <p className="text-red-500">{errors.password.message}</p>}
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn-primary hover:bg-black">
          {loading ? <LoadingSpin /> : "Sign In"}
        </button>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </section>
  );
};
