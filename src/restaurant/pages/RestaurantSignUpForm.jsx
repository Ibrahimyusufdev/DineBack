import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpFormSchema } from "../schema/signUpFormSchema.js";
import { useState } from "react";
import { LoadingSpin } from "../../common/LoadingSpin.jsx";
import { Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
import { formatInternationalPhone } from "../../helpers/phoneSchema.js";
import { useRestaurantAuthStore } from "../store/useRestaurantAuthStore.js";
import { useNavigate } from "react-router-dom";

export const RestaurantSignUpForm = () => {
  // state for toggling password open & close
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const signUp = useRestaurantAuthStore((state) => state.signUp);
  const error = useRestaurantAuthStore((state) => state.error);
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
      navigate("/restaurant/login");
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
          Expand Your Reach to Valued Patrons
        </h2>
        <p className="mb-6 text-center italic">
          Partner with DineBack to welcome guests who appreciate fine dining and  ensure your tables are always filled.
        </p>
        <h2 className="mb-6 text-center text-2xl font-semibold">Sign Up</h2>

        {/* Restaurant Name */}
        <div className="mb-4 flex flex-col">
          <label htmlFor="restaurantName" className="text-darker mb-1 text-base">
            Restaurant Name
          </label>
          <input
            {...register("restaurantName")}
            type="text"
            id="restaurantName"
            name="restaurantName"
            placeholder="Enter your Restaurant name"
            className={`rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 ${
              errors.restaurantName
                ? "border-red-500 focus:ring-red-400"
                : "border-gray-300 focus:border-blue-500 focus:ring-blue-400"
            }`}
          />
          {errors.restaurantName && <p className="text-red-500">{errors.restaurantName.message}</p>}
        </div>

        {/* Business Email */}
        <div className="mb-4 flex flex-col">
          <label htmlFor="businessEmail" className="mb-1 text-base">
            Business Email Address
          </label>
          <input
            {...register("businessEmail")}
            type="email"
            id="email"
            name="email"
            placeholder="Enter your business email"
            className={`rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 ${
              errors.businessEmail
                ? "border-red-500 focus:ring-red-400"
                : "border-gray-300 focus:border-blue-500 focus:ring-blue-400"
            }`}
          />
          {errors.businessEmail && <p className="text-red-500">{errors.businessEmail.message}</p>}
        </div>

        {/* Contact Person Phone Number */}
        <Controller
          name="contactPersonNumber"
          control={control}
          render={({ field }) => (
            <div className="mb-4 flex flex-col">
              <label htmlFor="contactPersonNumber" className="mb-1 text-base">
                Contact Person Number
              </label>
              <input
                id="contactPersonNumber"
                type="tel"
                placeholder="+234 801 234 5678"
                value={field.value ? formatInternationalPhone(field.value) : ""}
                onChange={
                  (e) => field.onChange(e.target.value.replace(/[^\d+]/g, "")) // keep only digits/+ in state
                }
                className={`rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 ${
                  errors.contactPersonNumber
                    ? "border-red-500 focus:ring-red-400"
                    : "border-gray-300 focus:border-blue-500 focus:ring-blue-400"
                }`}
              />
              {errors.contactPersonNumber && (
                <p className="mt-1 text-sm text-red-500">{errors.contactPersonNumber.message}</p>
              )}
            </div>
          )}
        />

        {/* Contact Phone Number */}
        <Controller
          name="contactPhoneNumber"
          control={control}
          render={({ field }) => (
            <div className="mb-4 flex flex-col">
              <label htmlFor="contactPhoneNumber" className="mb-1 text-base">
                Contact Phone Number
              </label>
              <input
                id="contactPhoneNumber"
                type="tel"
                placeholder="+234 801 234 5678"
                value={field.value ? formatInternationalPhone(field.value) : ""}
                onChange={
                  (e) => field.onChange(e.target.value.replace(/[^\d+]/g, "")) // keep only digits/+ in state
                }
                className={`rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 ${
                  errors.contactPhoneNumber
                    ? "border-red-500 focus:ring-red-400"
                    : "border-gray-300 focus:border-blue-500 focus:ring-blue-400"
                }`}
              />
              {errors.contactPhoneNumber && (
                <p className="mt-1 text-sm text-red-500">{errors.contactPhoneNumber.message}</p>
              )}
            </div>
          )}
        />

        {/* Restaurant Address */}
        <div className="mb-4 flex flex-col">
          <label htmlFor="restaurantAddress" className="text-darker mb-1 text-base">
            Restaurant Address
          </label>
          <input
            {...register("restaurantAddress")}
            type="text"
            id="restaurantAddress"
            name="restaurantAddress"
            placeholder="Enter your Restaurant Address"
            className={`rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 ${
              errors.restaurantAddress
                ? "border-red-500 focus:ring-red-400"
                : "border-gray-300 focus:border-blue-500 focus:ring-blue-400"
            }`}
          />
          {errors.restaurantAddress && <p className="text-red-500">{errors.restaurantAddress.message}</p>}
        </div>

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
                to="/revenue-sharing-terms"
                className="text-red-500 underline hover:text-red-600"
                target="_blank"
                rel="noopener noreferrer"
              >
                Revenue-Sharing Terms
              </Link>{" "}
              and{" "}
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
          {isSubmitting ? <LoadingSpin /> : "Become a Partner"}
        </button>

        {/* Display error message on failed sign up from firestore */}
        {error && <p className="text-red-500">{error}</p>}

        <p className="mt-2 text-center">
          <span>Already partner with us?</span>{" "}
          <Link className="text-blue-500 underline" to={"/restaurant/login"}>
            Login Here
          </Link>
        </p>
      </form>
    </section>
  );
};
