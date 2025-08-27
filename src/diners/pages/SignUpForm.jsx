import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpFormSchema } from "../schema/signUpFormSchema.js";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { LoadingSpin } from "../../common/LoadingSpin.jsx";
import { Link } from "react-router-dom";
import { formatInternationalPhone } from "../../helpers/phoneSchema.js";
import { useDinersAuthStore } from "../store/useDinersAuthStore.js";
import { useNavigate } from "react-router-dom";

export const SignUpForm = () => {
  // state for toggling password open & close
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const signUp = useDinersAuthStore((state) => state.signUp);
  const error = useDinersAuthStore((state) => state.error);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    resolver: zodResolver(signUpFormSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    shouldFocusError: true,
  });

  // Function to handle signing up and calling signUp function from my store
  const handleSignUp = async (formData) => {
    try {
      await signUp(formData);
      reset();
      navigate("/login");
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  return (
    <section className="mt-6 bg-silver px-2 py-2">
      <form
        onSubmit={handleSubmit(handleSignUp)}
        className="container mx-auto max-w-lg rounded-2xl bg-white px-6 py-8 shadow-md"
      >
        <h2 className="mb-6 text-center text-2xl font-semibold text-red-500">
          Get Paid to Dine at the Finest Restaurants!
        </h2>
        <p className="mb-6 text-center italic">
          Your time is precious. Turn every date into a rewarding experience with cash back on your
          dining.
        </p>
        <h2 className="mb-6 text-center text-2xl font-semibold">Sign Up</h2>

        {/* First Name */}
        <div className="mb-4 flex flex-col">
          <label htmlFor="firstName" className="text-darker mb-1 text-base">
            First Name
          </label>
          <input
            {...register("firstName")}
            type="text"
            id="firstName"
            name="firstName"
            placeholder="Enter your first name"
            className={`rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 ${
              errors.firstName
                ? "border-red-500 focus:ring-red-400"
                : "border-gray-300 focus:border-blue-500 focus:ring-blue-400"
            }`}
          />
          {errors.firstName && <p className="text-red-500">{errors.firstName.message}</p>}
        </div>

        {/* Last Name */}
        <div className="mb-4 flex flex-col">
          <label htmlFor="lastName" className="mb-1 text-base">
            Last Name
          </label>
          <input
            {...register("lastName")}
            type="text"
            id="lastName"
            name="lastName"
            placeholder="Enter your last name"
            className={`rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 ${
              errors.lastName
                ? "border-red-500 focus:ring-red-400"
                : "border-gray-300 focus:border-blue-500 focus:ring-blue-400"
            }`}
          />
          {errors.lastName && <p className="text-red-500">{errors.lastName.message}</p>}
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
            className={`rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 ${
              errors.email
                ? "border-red-500 focus:ring-red-400"
                : "border-gray-300 focus:border-blue-500 focus:ring-blue-400"
            }`}
          />
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        </div>

        {/* Phone Number */}
        <Controller
          name="phoneNumber"
          control={control}
          render={({ field }) => (
            <div className="mb-4 flex flex-col">
              <label htmlFor="phoneNumber" className="mb-1 text-base">
                Phone Number
              </label>
              <input
                id="phoneNumber"
                type="tel"
                placeholder="+234 801 234 5678"
                value={field.value ? formatInternationalPhone(field.value) : ""}
                onChange={
                  (e) => field.onChange(e.target.value.replace(/[^\d+]/g, "")) // keep only digits/+ in state
                }
                className={`rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 ${
                  errors.phoneNumber
                    ? "border-red-500 focus:ring-red-400"
                    : "border-gray-300 focus:border-blue-500 focus:ring-blue-400"
                }`}
              />
              {errors.phoneNumber && (
                <p className="mt-1 text-sm text-red-500">{errors.phoneNumber.message}</p>
              )}
            </div>
          )}
        />

        {/* Password */}
        <div className="mb-6 flex flex-col">
          <label htmlFor="password" className="mb-2 text-base">
            Password
          </label>

          <div className="relative flex items-center">
            <input
              {...register("password")}
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              placeholder="Enter your password"
              className={`w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 ${
                errors.password
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 focus:border-blue-500 focus:ring-blue-400"
              }`}
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

        {/* Confirm Password */}
        <div className="mb-6 flex flex-col">
          <label htmlFor="confirmPassword" className="mb-2 text-base">
            Confirm Password
          </label>

          <div className="relative flex items-center">
            <input
              {...register("confirmPassword")}
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Re-enter your password"
              className={`w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 ${
                errors.confirmPassword
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 focus:border-blue-500 focus:ring-blue-400"
              }`}
            />

            <button
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              type="button"
              className="absolute right-3 flex items-center text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-red-500">{errors.confirmPassword.message}</p>
          )}
        </div>

        {/* Agreement checkbox */}
        <div className="mb-6 flex flex-col">
          <div className="flex items-start space-x-3">
            <input
              {...register("agreeToTerms")}
              type="checkbox"
              id="agreeToTerms"
              name="agreeToTerms"
              className={`mt-1 h-4 w-4 rounded border-2 text-red-500 focus:ring-2 focus:ring-red-400 ${
                errors.agreeToTerms ? "border-red-500" : "border-gray-300"
              }`}
            />
            <label htmlFor="agreeToTerms" className="text-sm leading-5 text-gray-700">
              I agree to the{" "}
              <Link
                to="/terms-of-service"
                className="text-red-500 underline hover:text-red-600"
                target="_blank"
                rel="noopener noreferrer"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                to="/privacy-policy"
                className="text-red-500 underline hover:text-red-600"
                target="_blank"
                rel="noopener noreferrer"
              >
                Privacy Policy
              </Link>
            </label>
          </div>
          {errors.agreeToTerms && (
            <p className="mt-1 text-sm text-red-500">{errors.agreeToTerms.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!isValid}
          className="btn-primary hover:bg-black disabled:opacity-50"
        >
          {isSubmitting ? <LoadingSpin /> : "Join DineBack Now"}
        </button>

        {/* Display error message on failed sign up from firestore */}
        {error && <p className="text-red-500">{error}</p>}

        <p className="mt-2 text-center">
          <span>Already a user?</span>{" "}
          <Link className="text-blue-500 underline" to={"login"}>
            Sign in
          </Link>
        </p>
      </form>
    </section>
  );
};
