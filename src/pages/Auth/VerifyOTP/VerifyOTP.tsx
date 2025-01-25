import { useLocation, useNavigate } from "react-router-dom";
import { REGEXP_ONLY_DIGITS, OTPInput, SlotProps } from "input-otp";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Swal from "sweetalert2";
import axiosInstance from "@/api/axiosInstance";
import { IoShieldCheckmark } from "react-icons/io5";
import { handleAxiosError } from "@/utils/handleAxiosError";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import "../../../styles/swal.css";

// Utility to merge classnames
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}

// Blinking caret animation
function FakeCaret() {
  return (
    <div className="absolute inset-0 flex items-center justify-center animate-caret-blink pointer-events-none">
      <div className="w-px h-8 bg-white" />
    </div>
  );
}

// Slot for the OTP input box
function Slot(props: SlotProps) {
  return (
    <div
      className={cn(
        "relative w-8 h-10 text-[1.5rem]",
        "flex items-center justify-center",
        "transition-all duration-300",
        "border border-border rounded-md",
        "outline outline-0",
        props.isActive && "outline-1"
      )}
    >
      {props.char !== null && <div>{props.char}</div>}
      {props.hasFakeCaret && <FakeCaret />}
    </div>
  );
}

const VerifyOTP = () => {
  const location = useLocation();
  const email = location.state?.email; // Get email from state
  const [otp, setOtp] = useState<string>(""); // Track the OTP value
  const [isResendDisabled, setIsResendDisabled] = useState(false);
  const [timer, setTimer] = useState<number>(120); // 2-minute countdown timer
  const navigate = useNavigate();
  // Handle OTP verification submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!otp || otp.length < 6) {
      Swal.fire("Error", "Please enter a complete 6-digit OTP.", "error");
      return;
    }

    try {
      await axiosInstance.post("/users/verify-otp", {
        email,
        verificationCode: otp,
      });
      Swal.fire({
        icon: "success",
        title: "Account Verified",
        text: "Your account has been verified!",
        customClass: {
          title: "custom-title",
          popup: "custom-popup",
          icon: "custom-icon",
          confirmButton: "custom-confirm-btn",
        },
      });
      // if
      navigate("/auth/login");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      handleAxiosError(error, "Verification Failed");
    }
  };

  // Handle resend OTP
  const handleResendOTP = async () => {
    try {
      setIsResendDisabled(true);
      setTimer(120); // Reset countdown timer
      await axiosInstance.post("/users/resend-otp", { email });
      Swal.fire({
        icon: "success",
        title: "OTP Sent Successfully",
        text: "A new OTP has been sent to your email!",
        customClass: {
          title: "custom-title",
          popup: "custom-popup",
          icon: "custom-icon",
          confirmButton: "custom-confirm-btn",
        },
      });
      // Start countdown timer for button re-enablement
      const interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setIsResendDisabled(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      handleAxiosError(error, "Failed to resend OTP");
      setIsResendDisabled(false); // Re-enable button if the API call fails
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-gray-800 via-gray-900 to-black">
      {email ? (
        <>
          <Helmet>
            <title>eJobsIT | OTP</title>
          </Helmet>
          <div className="w-full max-w-sm p-6 sm:p-8 bg-gray-800 shadow-lg rounded-lg border border-gray-700">
            <div className="flex flex-col items-center justify-center">
              <IoShieldCheckmark className="size-10 text-white bg-[#4071F4] p-2 rounded-full" />
              <h1 className="text-2xl font-bold text-center text-blue-400 font-montserrat leading-relaxed">
                Email Verification
              </h1>
            </div>
            <p className="text-sm text-center text-gray-400 font-montserrat leading-relaxed mt-2 mb-4 max-w-[200px] mx-auto">
              Please check your email for the verification code sent to {email}.
            </p>

            {/* OTP Input Form */}
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="p-1 flex flex-col items-center justify-center rounded-md text-white">
                <OTPInput
                  maxLength={6}
                  pattern={REGEXP_ONLY_DIGITS}
                  onChange={(value) => setOtp(value)}
                  render={({ slots }) => (
                    <div className="flex space-x-2">
                      {slots.map((slot, idx) => (
                        <Slot key={idx} {...slot} />
                      ))}
                    </div>
                  )}
                />
                <Button
                  type="submit"
                  className={`w-full py-2 mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md ${
                    otp.length < 6 ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={otp.length < 6}
                >
                  Verify Account
                </Button>
              </div>
            </form>

            {/* Resend OTP */}
            <div className="text-md text-center pt-4 sm:px-6">
              <p className="text-gray-400">Didn't get your OTP?</p>
              <Button
                onClick={handleResendOTP}
                disabled={isResendDisabled}
                className={`mt-2 text-blue-400 hover:text-blue-500 font-semibold ${
                  isResendDisabled ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isResendDisabled
                  ? `Resend OTP in ${Math.floor(timer / 60)}:${
                      timer % 60 < 10 ? "0" : ""
                    }${timer % 60}`
                  : "Resend OTP"}
              </Button>
            </div>
          </div>
        </>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default VerifyOTP;
