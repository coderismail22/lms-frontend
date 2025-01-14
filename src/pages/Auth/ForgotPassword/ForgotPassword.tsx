import AppForm from "@/components/CustomForm/AppForm";
import AppInput from "@/components/CustomForm/AppInput";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/api/axiosInstance";
import Swal from "sweetalert2";
import "../../../styles/swal.css";
import { handleAxiosError } from "@/utils/handleAxiosError";
import { useNavigate } from "react-router-dom";
const ForgotPassword = () => {
  const navigate = useNavigate();
  const forgotPasswordMutation = useMutation({
    mutationFn: async (data: { email: string }) => {
      return axiosInstance.post("/auth/forgot-password", data);
    },
    onSuccess: () => {
      navigate("/");
      Swal.fire({
        icon: "success",
        title: "Check your email",
        text: "A password reset link has been sent to your email.",
        customClass: {
          title: "custom-title",
          popup: "custom-popup",
          icon: "custom-icon",
          confirmButton: "custom-confirm-btn",
        },
      });
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      handleAxiosError(error, "Password Reset Failed");
    },
  });

  const onSubmit = (data: { email: string }) => {
    forgotPasswordMutation.mutate(data);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-800">
      <div className="w-full max-w-sm p-6 bg-gray-700 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-blue-400">
          Forgot Password
        </h2>

        {/* Updated to the latest mutation pattern */}
        <AppForm
          onSubmit={onSubmit}
          buttonText={
            forgotPasswordMutation.isPending ? "Sending..." : "Send Reset Link"
          }
          submitButtonStyles="w-full bg-blue-600 text-white rounded-md p-2 hover:bg-blue-500"
          defaultValues={{ email: "" }}
        >
          <AppInput
            labelStyles="text-white"
            className="text-black bg-slate-50"
            name="email"
            label="Email"
            placeholder="Enter your registered email"
          />
        </AppForm>
      </div>
    </div>
  );
};

export default ForgotPassword;
