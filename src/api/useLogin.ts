import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/api/axiosInstance";
import Swal from "sweetalert2";
import { authKey } from "./authKey";
import { TLoginForm } from "@/types/login.type";
import { AxiosError } from "axios";

export type TLoginResponse = {
  accessToken: string;
  refreshToken?: string; // Include refreshToken if it's part of the response
};

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation<TLoginResponse, AxiosError, TLoginForm>({
    // Explicitly define mutation function with mutationFn
    mutationFn: async (formData: TLoginForm): Promise<TLoginResponse> => {
      const { data } = await axiosInstance.post<TLoginResponse>(
        "/auth/login",
        formData
      );
      return data;
    },
    // Options
    onSuccess: (data) => {
      // Save accessToken in TanStack Query state
      queryClient.setQueryData(authKey, { accessToken: data.accessToken });

      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: "You are now logged in!",
      }).then(() => {
        window.location.href = "/dashboard"; // Redirect after login
      });
    },
    onError: (error: AxiosError) => {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text:
          error.message || // Handle general JavaScript errors
          "An unexpected error occurred. Please try again later.",
      });
    },
  });
};
