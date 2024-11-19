import { createBatchSchema } from "@/schemas/batch.schema";
import { TBatchForm } from "@/types/batch.type";
import AppForm from "../CustomForm/AppForm";
import AppInput from "../CustomForm/AppInput";
import AppSelect from "../CustomForm/AppSelect";
import "react-datepicker/dist/react-datepicker.css";
import AppDatePicker from "../CustomForm/AppDatePicker";
import { useState } from "react";
import ImageUpload from "../ImageUpload/ImageUpload";
import axiosInstance from "@/api/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";

// Define the response structure for creating a batch
interface CreateBatchResponse {
  success: boolean;
  message: string;
  data: {
    batchName: string;
    courseName: string;
    couponCode: string | null;
    discountPrice: number;
    maxStudentNumber: number;
    batchImg: string;
    trainers: string[];
    startDate: string;
    endDate: string;
    _id: string;
    __v: number;
  };
}

// Mutation function to create a batch
const createBatch = async (batch: TBatchForm): Promise<CreateBatchResponse> => {
  const response = await axiosInstance.post("/batches/create-batch", batch);
  return response.data;
};

const AddBatch = () => {
  const [batchImg, setBatchImg] = useState<string>(""); // Handle batch image
  const queryClient = useQueryClient(); // React Query's query client for invalidation

  // Mutation hook to create a batch
  const mutation = useMutation({
    mutationFn: createBatch, // Specify the mutation function
    onSuccess: (data) => {
      // Show success message
      Swal.fire("Created!", data.message, "success");
      // Refetch the batch list after successful creation
      queryClient.invalidateQueries({ queryKey: ["batches"] });
    },
    onError: (error: any) => {
      // Handle errors gracefully
      console.error("Error creating batch:", error);
      Swal.fire(
        "Error!",
        error.response?.data?.message || "Failed to create batch.",
        "error"
      );
    },
  });

  // Form submission handler
  const onSubmit = (data: TBatchForm) => {
    const finalData = {
      ...data,
      batchImg,
    };

    // Ensure batch image is uploaded
    if (!batchImg) {
      Swal.fire("Error!", "Please upload a batch cover image.", "error");
      return;
    }

    // Trigger mutation to create a batch
    mutation.mutate(finalData);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <AppForm
        schema={createBatchSchema}
        onSubmit={onSubmit}
        submitButtonStyles="w-[150px]"
        buttonText={mutation.isLoading ? "Adding..." : "Add Batch"}
        alignButton="center"
        defaultValues={{
          batchName: "",
          courseName: "",
          couponCode: "NA",
          discountPrice: 0,
          maxStudentNumber: 0,
          trainers: [],
          startDate: "",
          endDate: "",
        }}
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Batch Name */}
          <AppInput
            className="w-full"
            name="batchName"
            label="Batch Name"
            placeholder="Enter batch name"
          />
          {/* Image Upload Section */}
          <div className="text-sm truncate">
            <label className="block font-medium text-white">
              Upload Cover Image
            </label>
            <ImageUpload setUploadedImageUrl={setBatchImg} />
            {batchImg === "" && (
              <p className="text-red-500 text-sm">Image is required</p>
            )}
          </div>

          {/* Course Name */}
          <AppSelect
            name="courseName"
            label="Course Name"
            placeholder="Select a course"
            options={[
              { value: "Web Development", label: "Web Development" },
              { value: "Graphic Design", label: "Graphic Design" },
              { value: "Video Editing", label: "Video Editing" },
            ]}
          />

          {/* Coupon Code */}
          <AppInput
            className="w-full"
            name="couponCode"
            label="Coupon Code"
            placeholder="Enter coupon code (optional)"
          />

          {/* Discount Price */}
          <AppInput
            className="w-full"
            name="discountPrice"
            label="Discount Price"
            placeholder="Enter discount price"
          />

          {/* Max Student Number */}
          <AppInput
            className="w-full"
            name="maxStudentNumber"
            label="Max Students"
            placeholder="Enter max student number"
          />

          {/* Start Date */}
          <AppDatePicker
            name="startDate"
            label="Start Date"
            placeholder="Select start date"
          />

          {/* End Date */}
          <AppDatePicker
            name="endDate"
            label="End Date"
            placeholder="Select end date"
          />

          {/* Trainers */}
          <AppSelect
            name="trainers"
            label="Trainers"
            placeholder="Select trainers"
            isMulti={true}
            options={[
              { value: "John Doe", label: "John Doe" },
              { value: "Jane Smith", label: "Jane Smith" },
              { value: "Alice Johnson", label: "Alice Johnson" },
            ]}
          />
        </div>
      </AppForm>
    </div>
  );
};

export default AddBatch;
