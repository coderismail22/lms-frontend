import { useMutation } from "@tanstack/react-query";
import AppForm from "@/components/CustomForm/AppForm";
import AppInput from "@/components/CustomForm/AppInput";
import AppInputPassword from "@/components/CustomForm/AppInputPassword";
import { registerSchema } from "@/schemas/register.schema";
import { TRegisterForm } from "@/types/register.type";
import axiosInstance from "@/api/axiosInstance";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const Register = () => {
  const mutation = useMutation({
    mutationFn: async (formData: Partial<TRegisterForm>) => {
      const response = await axiosInstance.post(
        "/users/create-student",
        formData
      );
      return response.data;
    },
    onSuccess: (data) => {
      Swal.fire({
        icon: "success",
        title: "Registration Successful",
        text: "Your account has been created successfully!",
      });
      console.log("Registration successful:", data);
    },
    onError: (error) => {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: "Something went wrong. Please try again.",
      });
      console.error("Registration failed:", error);
    },
  });

  const onSubmit = (data: TRegisterForm) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, ...restFormData } = data;

    console.log(restFormData);
    mutation.mutate(restFormData);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-400">
      <div className="w-full max-w-md p-6 bg-blue-400 shadow-md rounded-lg">
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
