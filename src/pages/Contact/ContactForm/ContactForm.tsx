/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";
import Swal from "sweetalert2";
import Select from "react-select";
import countryList from "react-select-country-list";
import Flag from "react-world-flags";
interface FormValues {
  name: string;
  country: { label: string; value: string };
  email: string;
  message: string;
}

// Custom styles for react-select dropdown to match the dark theme
const customStyles = {
  control: (provided: any) => ({
    ...provided,
    backgroundColor: "#374151", // Tailwind's gray-700
    color: "white",
    borderColor: "#6B7280", // Tailwind's gray-500
    padding: "4px 8px",
  }),
  input: (provided: any) => ({
    ...provided,
    color: "white", // make the typed text white
  }),
  singleValue: (provided: any) => ({
    ...provided,
    color: "white",
  }),
  menu: (provided: any) => ({
    ...provided,
    backgroundColor: "#374151", // Tailwind's gray-700
    color: "white",
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isFocused ? "#1E293B" : "#374151", // Focus: gray-800, default: gray-700
    color: state.isFocused ? "#FFFFFF" : "#FFFFFF",
  }),
  placeholder: (provided: any) => ({
    ...provided,
    color: "#9CA3AF", // Tailwind's gray-400 for placeholder
  }),
};

const ContactForm = () => {
  // Initialize useForm hook
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<FormValues>();

  // State for reCAPTCHA
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [loading, setLoading] = useState(false); // State for loading spinner

  // Handle CAPTCHA verification
  const onCaptchaChange = (value: string | null) => {
    setCaptchaVerified(!!value); // Enable/disable submit based on CAPTCHA verification
  };

  const onSubmit = async (data: {
    name: string;
    country: { label: string; value: string };
    email: string;
    message: string;
  }) => {
    const { name, country, email, message } = data;
    console.log("country", country);
    const countryName = country?.label;
    const fullFormData = {
      name,
      country: countryName,
      email,
      message,
    };
    console.log("fullFormData", fullFormData);
    if (captchaVerified) {
      setLoading(true); // Start loading
      try {
        // TODO: Add Server Url
        await axios.post(
          "https://ismail-codes-portfolio-backend-24.vercel.app/api/v1/email/send-contact-email-to-ismail",
          fullFormData,
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        Swal.fire("Success!", "Message sent successfully.", "success");
        reset();
      } catch (err) {
        Swal.fire("Error!", "Could not send the message.", "error");
        console.error("Error sending the message:", err);
      } finally {
        setLoading(false); // Stop loading
      }
    } else {
      Swal.fire("Error!", "Please complete the CAPTCHA verification.", "error");
    }
  };

  // Country list options
  const countries = countryList().getData();
  type OptionType = { label: string; data?: { label: string } };
  const filterOption = (option: OptionType, inputValue: string) => {
    // option.data.label if the option is passed with a `data` wrapper, otherwise use `label`
    const label = (option.data && option.data.label) || option.label;
    const input = inputValue.toLowerCase();

    // Ensure that label exists and matches part of the input
    return label ? label.toLowerCase().includes(input) : false;
  };

  return (
    <div className="max-w-2xl h-full flex flex-col items-center justify-center mx-auto mb-20  px-6">
      <h1 className="font-yeseva font-bold text-[28px] text-center uppercase mt-8 text-white">
        Want to have a meeting
      </h1>
      <h1 className="font-yeseva font-bold text-[25px] md:text-[35px] mb-10 text-center uppercase text-blue-500">
        Send a message
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="font-lato text-sm w-full  bg-gray-800 p-3 md:p-5 rounded-lg shadow-lg"
      >
        {/* Full Name */}
        <div className="mb-6 w-full">
          <label className="text-white mb-1 block" htmlFor="name">
            Name
          </label>
          <input
            placeholder="Enter your name."
            type="text"
            id="name"
            {...register("name", { required: "Full Name is required" })}
            className="w-full block border border-slate-500 py-2 px-4 text-sm bg-gray-700 text-white focus:border-blue-400 focus:ring-1 focus:ring-blue-400 focus:outline-none"
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>

        {/* Country Dropdown */}
        <div className="mb-6 w-full">
          <label className="text-white mb-1 block" htmlFor="country">
            Country
          </label>
          <Controller
            name="country"
            control={control}
            rules={{ required: "Country is required" }}
            render={({ field }) => (
              <Select
                {...field}
                options={countries}
                styles={customStyles} // Apply custom styles
                placeholder="Select your country"
                filterOption={filterOption}
                formatOptionLabel={(option) => (
                  <div className="flex items-center">
                    <Flag
                      code={option.value}
                      className="mr-2"
                      style={{ width: "20px", height: "15px" }}
                    />
                    {option.label}
                  </div>
                )}
              />
            )}
          />
          {errors.country && (
            <p className="text-red-500">{errors.country.message}</p>
          )}
        </div>

        {/* Email */}
        <div className="mb-6 w-full">
          <label className="text-white mb-1 block" htmlFor="email">
            Email Address
          </label>
          <input
            placeholder="Enter your email address."
            type="email"
            id="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address",
              },
            })}
            className="w-full block border border-slate-500 py-2 px-4 text-sm bg-gray-700 text-white focus:border-blue-400 focus:ring-1 focus:ring-blue-400 focus:outline-none"
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
        </div>

        {/* Message */}
        <div className="mb-6 w-full">
          <label className="text-white mb-1 block" htmlFor="message">
            Message
          </label>
          <textarea
            placeholder="Your message here."
            id="message"
            rows={6}
            {...register("message", {
              required: "Message is required",
            })}
            className="w-full block border border-slate-500 py-2 px-4 text-sm bg-gray-700 text-white focus:border-blue-400 focus:ring-1 focus:ring-blue-400 focus:outline-none"
          />
          {errors.message && (
            <p className="text-red-500">{errors.message.message}</p>
          )}
        </div>

        {/* reCAPTCHA */}
        <div className="mb-6 w-full flex justify-center">
          <ReCAPTCHA
            sitekey="6LfmdFIqAAAAANBVvLSt6TxI8FD4Dm3_o48zsHnB" // Replace with your actual site key
            onChange={onCaptchaChange}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`font-montserrat flex gap-2 items-center justify-center text-xl w-full h-[50px] p-2 mt-5
                    ${
                      captchaVerified
                        ? "bg-[#FFCD05]"
                        : "bg-gray-400 cursor-not-allowed"
                    }
                `}
          disabled={!captchaVerified || loading}
        >
          {loading ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
