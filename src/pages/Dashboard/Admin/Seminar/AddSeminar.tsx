/* eslint-disable @typescript-eslint/no-explicit-any */
// AddSeminar.tsx

import AppForm from "@/components/CustomForm/AppForm";
import AppInput from "@/components/CustomForm/AppInput";
import AppTextAreaInput from "@/components/CustomForm/AppTextAreaInput";
import AppDatePicker from "@/components/CustomForm/AppDatePicker";
import AppSelect from "@/components/CustomForm/AppSelect";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/api/axiosInstance";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import ImageUpload from "@/components/ImageUpload/ImageUpload";
import { useState } from "react";
import * as Switch from "@radix-ui/react-switch";
import Loader from "@/components/Loader/Loader";
import { handleAxiosError } from "@/utils/handleAxiosError";

// Fetch teachers for the Trainers dropdown
const fetchTeachers = async () => {
  const response = await axiosInstance.get("/teachers/");
  return response?.data?.data;
};

// Create seminar function
const createSeminar = async (seminarData: any) => {
  const response = await axiosInstance.post(
    "/seminar/create-seminar",
    seminarData
  );
  return response.data;
};

const AddSeminar = () => {
  const [coverImage, setCoverImage] = useState<string>("");
  const [isUpcoming, setIsUpcoming] = useState<boolean>(true);

  // Fetch Teachers
  const {
    data: teachers,
    isLoading: isLoadingTeachers,
    error: teachersError,
  } = useQuery({
    queryKey: ["teachers"],
    queryFn: fetchTeachers,
  });

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // Mutation for creating a seminar
  const mutation = useMutation({
    mutationFn: createSeminar,
    onSuccess: () => {
      Swal.fire("Success!", "Seminar added successfully!", "success");
      queryClient.invalidateQueries({ queryKey: ["seminars"] });
      navigate("/dashboard/admin/seminar/all-seminars");
    },
    onError: (err: any) => {
      console.log(err);
      handleAxiosError(err, "Failed to create seminar!");
    },
  });

  const onSubmit = (data: any) => {
    const finalData = {
      ...data,
      coverImage,
      isUpcoming,
    };
    mutation.mutate(finalData);
  };

  if (isLoadingTeachers) {
    <Loader />;
  }
  if (teachersError) {
    <p>Error loading data. Please try again.</p>;
  }
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center underline underline-offset-8 text-blue-500">
        Add Seminar
      </h1>
      <AppForm
        onSubmit={onSubmit}
        defaultValues={{
          name: "",
          description: "",
          startDate: "",
          category: "",
          location: "",
          googleFormUrl: "",
          trainers: [],
        }}
        buttonText="Add Seminar"
      >
        {/* Seminar Name */}
        <AppInput
          name="name"
          label="Seminar Name"
          placeholder="Enter seminar name"
        />

        {/* Description (TextArea) */}
        <AppTextAreaInput
          name="description"
          label="Description"
          placeholder="Enter seminar description"
        />

        {/* Cover Image (Upload) */}
        <div className="text-sm">
          <label className="block font-medium text-white">
            Upload Cover Image
          </label>
          <ImageUpload setUploadedImageUrl={setCoverImage} />
          {coverImage === "" && (
            <p className="text-red-500 text-sm">Cover image is required</p>
          )}
        </div>

        {/* Start Date (Use custom DatePicker) */}
        <AppDatePicker
          name="startDate"
          label="Start Date"
          placeholder="Select a date"
        />

        {/* Category */}
        <AppInput
          name="category"
          label="Category"
          placeholder="e.g. Web Development"
        />

        {/* Location (optional) */}
        <AppInput
          name="location"
          label="Location"
          placeholder="Online or a venue"
        />

        {/* Trainers (Multi-Select) */}
        <AppSelect
          name="trainers"
          label="Trainers"
          placeholder="Select trainers"
          isMulti={true}
          options={teachers?.map(
            (teacher: { _id: string; teacherName: string }) => ({
              value: teacher?._id,
              label: teacher?.teacherName,
            })
          )}
        />

        {/* Google Form URL */}
        <AppInput
          name="googleFormUrl"
          label="Google Form URL"
          placeholder="https://docs.google.com/forms/..."
        />

        {/* Google Form Embed 'src' */}
        <AppInput
          name="googleFormUrl"
          label="Google Form Embed (src URL)"
          placeholder="https://docs.google.com/forms/..embedded=true"
        />

        {/* Upcoming or Ended Switch */}
        <div className="mt-4">
          <label className="mb-2 block font-medium text-white">
            Seminar Status
          </label>
          <div className="flex items-center gap-3">
            <Switch.Root
              checked={isUpcoming}
              onCheckedChange={setIsUpcoming}
              className={`w-12 h-6 rounded-full relative flex items-center ${
                isUpcoming ? "bg-green-500" : "bg-red-500"
              } transition-all duration-300`}
            >
              <Switch.Thumb
                className={`w-4 h-4 bg-white rounded-full shadow-md transition-transform duration-300 transform ${
                  isUpcoming ? "translate-x-[1.5rem]" : "translate-x-0"
                }`}
              />
            </Switch.Root>
            <span
              className={`font-medium ${
                isUpcoming ? "text-green-700" : "text-red-700"
              }`}
            >
              {isUpcoming ? "Upcoming" : "Ended"}
            </span>
          </div>
        </div>
      </AppForm>
    </div>
  );
};

export default AddSeminar;
