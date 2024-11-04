import { useState } from "react";
import { useForm } from "react-hook-form";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import Swal from "sweetalert2";
import { RotatingLines } from "react-loader-spinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { email: "test@best.com", password: "123456" },
  });

  const loginHandler = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://ismail-codes-portfolio-backend-24.vercel.app/api/v1/admin/login",
        data,
        { withCredentials: true }
      );

      Swal.fire({
        icon: "success",
        title: "Login successful",
        text: "Redirecting to dashboard...",
        timer: 1500,
        timerProgressBar: true,
        willClose: () => {
          navigate("/mysecretdashboard/my-profile");
        },
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Login failed",
        text:
          error.response?.data?.message ||
          "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data) => {
    await loginHandler(data);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#121928]">
      <div className="flex flex-col items-center justify-center bg-[#CBD5E1] rounded-lg w-full md:w-[40%] p-6">
        <div className="w-full">
          <h1 className="text-3xl md:text-4xl font-medium text-blue-600 text-center mb-4">
            Login
          </h1>

          {loading && (
            <div className="flex justify-center mb-3">
              <RotatingLines width="30" />
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-1 text-sm">
              <label className="block text-rose-700">Email</label>
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                    message: "Email is not valid",
                  },
                })}
                placeholder="Email"
                className="w-full px-4 py-3 rounded-md bg-rose-50 border border-gray-300"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-1 text-sm">
              <label className="block text-rose-700">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters long",
                    },
                  })}
                  placeholder="Password"
                  className="w-full px-4 py-3 rounded-md bg-rose-50 border border-gray-300"
                />
                <span
                  className="absolute right-3 top-3 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <AiFillEyeInvisible className="text-rose-700" />
                  ) : (
                    <AiFillEye className="text-rose-700" />
                  )}
                </span>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button className="block w-full p-2 text-center rounded bg-blue-500 text-white hover:bg-blue-600 transition-all duration-500">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
