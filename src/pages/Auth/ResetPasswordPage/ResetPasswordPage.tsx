import AppForm from "@/components/CustomForm/AppForm";
import AppInputPassword from "@/components/CustomForm/AppInputPassword";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/api/axiosInstance";
import Swal from "sweetalert2";
import { useNavigate, useLocation } from "react-router-dom";
import "../../../styles/swal.css";
import { handleAxiosError } from "@/utils/handleAxiosError";

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userId = new URLSearchParams(location.search).get("id"); // Get token from URL query params
  const token = new URLSearchParams(location.search).get("token"); // Get token from URL query params

  const resetPasswordMutation = useMutation({
    mutationFn: async (data: { newPassword: string }) => {
      return axiosInstance.post(
        `/auth/reset-password?id=${userId}&token=${token}`,
        {
          ...data,
        }
      );
    },
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Password Reset Successful",
        text: "You can now log in with your new password.",
        customClass: {
          title: "custom-title",
          popup: "custom-popup",
          icon: "custom-icon",
          confirmButton: "custom-confirm-btn",
        },
      });
      navigate("/auth/login");
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      handleAxiosError(error, "Password Reset Failed");
    },
  });

  const onSubmit = (data: { newPassword: string }) => {
    resetPasswordMutation.mutate(data);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-800">
      <div className="w-full max-w-sm p-6 bg-gray-700 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-blue-400">
          Reset Your Password
        </h2>

        {/* Form Section */}
        <AppForm
          onSubmit={onSubmit}
          buttonText={
            resetPasswordMutation.isPending ? "Resetting..." : "Reset Password"
          }
          submitButtonStyles="w-full bg-blue-600 text-white rounded-md p-2 hover:bg-blue-500"
          defaultValues={{ newPassword: "" }}
        >
          {/* New Password Input */}
          <div className="my-2">
            <AppInputPassword
              labelStyles="text-white"
              className="text-black"
              name="newPassword"
              label="New Password"
              placeholder="Enter your new password"
            />
          </div>
        </AppForm>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
