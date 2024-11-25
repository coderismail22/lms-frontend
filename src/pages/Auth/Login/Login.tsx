// import { useMutation } from "@tanstack/react-query";
// import Swal from "sweetalert2";
import AppForm from "@/components/CustomForm/AppForm";
import AppInput from "@/components/CustomForm/AppInput";
import AppInputPassword from "@/components/CustomForm/AppInputPassword";
import { loginSchema } from "@/schemas/login.schema";
// import axiosInstance from "@/api/axiosInstance";
import { TLoginForm } from "@/types/login.type";
import { useLogin } from "@/hooks/useLogin";
import { Link } from "react-router-dom";

const Login = () => {
  // Define the mutation using TanStack Query
  // const mutation = useMutation({
  //   mutationFn: async (formData: TLoginForm) => {
  //     // Replace `/login` with your actual endpoint
  //     const response = await axiosInstance.post("/auth/login", formData);
  //     return response.data;
  //   },
  //   onSuccess: (data) => {
  //     // Handle successful login with SweetAlert2
  //     Swal.fire({
  //       icon: "success",
  //       title: "Login Successful",
  //       text: "You have logged in successfully!",
  //     });
  //     console.log("Login successful:", data);
  //   },
  //   onError: (error) => {
  //     // Handle login errors with SweetAlert2
  //     Swal.fire({
  //       icon: "error",
  //       title: "Login Failed",
  //       text: "Invalid credentials. Please try again.",
  //     });
  //     console.error("Login failed:", error);
  //   },
  // });

  const loginMutation = useLogin();

  const onSubmit = (data: TLoginForm) => {
    console.log(data);
    loginMutation.mutate(data); // Trigger the mutation
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-400">
      <div className="w-full max-w-md p-6 bg-blue-400 shadow-md rounded-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          Login to Your Account
        </h2>
        <AppForm
          schema={loginSchema}
          onSubmit={onSubmit}
          buttonText={"Login"}
          // buttonText={`${mutation.isPending ? "Logging in..." : "Login"}`}
          defaultValues={{
            email: "",
            password: "",
          }}
        >
          {/* Email */}
          <AppInput
            className="w-full mb-4"
            name="email"
            label="Email"
            placeholder="Enter your email"
          />

          {/* Password */}
          <AppInputPassword
            className="w-full mb-4"
            name="password"
            label="Password"
            placeholder="Enter your password"
          />
        </AppForm>
        <div className="text-[11px] flex gap-1 mt-2 items-center justify-center">
          <h1>Don't have an account?</h1>
          <Link to="/auth/signup">
            <span className="underline">Sign up</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
