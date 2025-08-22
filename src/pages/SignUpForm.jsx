import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpFormShema } from "../schema/SignUpFormSchema";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { LoadingSpin } from "../components/LoadingSpin.jsx";

export const SignUpForm = () => {
  // state for toggling password open & close
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(signUpFormShema),
  });

  const onSubmit = (formData) => {
    console.log(formData);
    reset();
  }

  return (
    <section className="mt-6 bg-silver px-2 py-2">
      <form className="container mx-auto max-w-lg rounded-2xl bg-white px-6 py-8 shadow-md">
        <h2 className="mb-6 text-center text-2xl font-semibold">Sign Up</h2>

        {/* First Name */}
        <div className="mb-4 flex flex-col">
          <label htmlFor="firstName" className="text-darker mb-1 text-base">
            First Name
          </label>
          <input
            {...register("firstname")}
            type="text"
            id="firstName"
            name="firstName"
            placeholder="Enter your first name"
            className="focus:ring-blue-500 rounded-lg border px-3 py-2 focus:outline-none focus:ring-2"
          />
          {errors.firstName && <p className="text-red-500">Error: {errors.firstName.message}</p>}
        </div>

        {/* Last Name */}
        <div className="mb-4 flex flex-col">
          <label htmlFor="lastName" className="mb-1 text-base">
            Last Name
          </label>
          <input
            {...register("lastname")}
            type="text"
            id="lastName"
            name="lastName"
            placeholder="Enter your last name"
            className="focus:ring-blue-500 rounded-lg border px-3 py-2 focus:outline-none focus:ring-2"
          />
          {errors.lastName && <p className="text-red-500">Error: {errors.lastName.message}</p>}
        </div>

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
          {errors.email && <p className="text-red-500">Error: {errors.email.message}</p>}
        </div>

        {/* Phone Number */}
        <div className="mb-4 flex flex-col">
          <label htmlFor="phoneNumber" className="mb-1 text-base">
            Phone Number
          </label>
          <input
            {...register("phoneNumber")}
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            placeholder="Enter your phone number"
            className="focus:ring-blue-500 rounded-lg border px-3 py-2 focus:outline-none focus:ring-2"
          />
          {errors.phoneNumber && <p className="text-red-500">Error: {errors.phoneNumber.message}</p>}
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
            {errors.password && <p className="text-red-500">Error: {errors.password.message}</p>}

            <button
              onClick={() => setShowPassword((prev) => !prev)}
              type="button"
              className="absolute right-3 flex items-center text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        {/* Confirm Password */}
        <div className="mb-6 flex flex-col">
          <label htmlFor="confirmPassword" className="mb-2 text-sm font-medium text-gray-700">
            Confirm Password
          </label>

          <div className="relative flex items-center">
            <input
              {...register("confirmPassword")}
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Re-enter your password"
              className="focus:border-blue-500 focus:ring-blue-400 w-full rounded-xl border border-gray-300 px-3 py-2 pr-10 text-sm transition focus:outline-none focus:ring-2"
            />
            {errors.confirmPassword && <p className="text-red-500">Error: {errors.confirmPassword.message}</p>}

            <button
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              type="button"
              className="absolute right-3 flex items-center text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        {/* Profile Picture */}
        <div className="mb-6 flex flex-col">
          <label htmlFor="profile" className="mb-1 text-base">
            Upload Profile Picture
          </label>
          <input
            type="file"
            id="profile"
            name="profile"
            accept="image/*"
            className="focus:ring-blue-500 rounded-lg border px-3 py-2 focus:outline-none focus:ring-2"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="btn-primary hover:bg-black"
        >
          {isSubmitting ? <LoadingSpin /> : "Sign Up"}
        </button>
      </form>
    </section>
  );
};
