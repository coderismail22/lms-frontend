import { useMutation } from "@tanstack/react-query";
import AppForm from "@/components/CustomForm/AppForm";
import AppInput from "@/components/CustomForm/AppInput";
import AppInputPassword from "@/components/CustomForm/AppInputPassword";
import { registerSchema } from "@/schemas/register.schema";
import { TRegisterForm } from "@/types/register.type";
import axiosInstance from "@/api/axiosInstance";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { useLogin } from "@/hooks/useLogin";

const Register = () => {
  const loginMutation = useLogin();

  const registerMutation = useMutation({
    mutationFn: async (formData: Partial<TRegisterForm>) => {
      const response = await axiosInstance.post(
        "/users/create-student",
        formData
      );
      return response.data;
    },
    onSuccess: (data, variables) => {
      // Automatically log in after registration
      loginMutation.mutate(
        {
          email: variables.email as string,
          password: variables.password as string,
        },
        {
          onSuccess: () => {
            Swal.fire({
              icon: "success",
              title: "Registration Successful",
              text: "Welcome!",
            });
          },
          onError: () => {
            Swal.fire({
              icon: "error",
              title: "Auto Login Failed",
              text: "Please log in manually.",
            });
          },
        }
      );
    },
    onError: (error) => {
      console.error("Registration failed:", error);
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: "Something went wrong. Please try again.",
      });
    },
  });

  const onSubmit = (data: TRegisterForm) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, ...restFormData } = data;
    registerMutation.mutate(restFormData);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-400">
      <div className="w-full max-w-md p-6 bg-blue-400 shadow-md rounded-lg">
        <div className="flex flex-col items-center justify-center">
          <Link to="/">
            <img className="w-[100px] " src="/ejobsit-logo.svg" />
          </Link>
        </div>
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          Create Your Account
        </h2>
        <AppForm
          schema={registerSchema}
          onSubmit={onSubmit}
          buttonText="Register"
          defaultValues={{
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
        >
          {/* Name */}
          <AppInput
            className="w-full"
            name="name"
            label="Full Name"
            placeholder="Enter your full name"
          />
          <div className="mt-4">
            {/* Email */}
            <AppInput
              className="w-full mb-4"
              name="email"
              label="Email"
              placeholder="Enter your email"
            />
          </div>
          <div className="mt-4">
            {/* Password */}
            <AppInputPassword
              className="w-full mb-4"
              name="password"
              label="Password"
              placeholder="Enter your password"
            />
          </div>

          {/* Confirm Password */}
          <AppInputPassword
            className="w-full mb-4"
            name="confirmPassword"
            label="Confirm Password"
            placeholder="Confirm your password"
          />
        </AppForm>
        <div className="text-[11px] flex gap-1 mt-2 items-center justify-center">
          <h1>Already have an account?</h1>
          <Link to="/auth/login">
            <span className="underline">Sign in</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
