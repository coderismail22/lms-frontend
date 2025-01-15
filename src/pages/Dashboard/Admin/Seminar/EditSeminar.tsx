/* eslint-disable @typescript-eslint/no-explicit-any */
// EditSeminar.tsx

import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import AppForm from "@/components/CustomForm/AppForm";
import AppInput from "@/components/CustomForm/AppInput";
import AppTextAreaInput from "@/components/CustomForm/AppTextAreaInput";
import AppDatePicker from "@/components/CustomForm/AppDatePicker";
import AppSelect from "@/components/CustomForm/AppSelect";
import Swal from "sweetalert2";
import axiosInstance from "@/api/axiosInstance";
import ImageUpload from "@/components/ImageUpload/ImageUpload";
import { useState } from "react";
import Loader from "@/components/Loader/Loader";
import * as Switch from "@radix-ui/react-switch";
import { handleAxiosError } from "@/utils/handleAxiosError";

// Fetch a single seminar by ID
const fetchSeminarById = async (seminarId: string) => {
  const response = await axiosInstance.get(`/seminar/${seminarId}`);
  console.log(response);
  return response?.data;
};

// Update seminar function
const updateSeminar = async (seminarId: string, data: any) => {
  const response = await axiosInstance.patch(
    `/seminar/update-seminar/${seminarId}`,
    data
  );
  return response?.data;
};

// Fetch teachers for the Trainers dropdown
const fetchTeachers = async () => {
  const response = await axiosInstance.get("/teachers/");
  return response?.data?.data;
};

const EditSeminar = () => {
  const [coverImage, setCoverImage] = useState<string>("");
  const [isUpcoming, setIsUpcoming] = useState<boolean>(true);
  const { seminarId } = useParams<{ seminarId: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Fetch Teachers
  const {
    data: teachers,
    isLoading: isLoadingTeachers,
    error: teachersError,
  } = useQuery({
    queryKey: ["teachers"],
    queryFn: fetchTeachers,
  });

  // Fetch seminar details
  const {
    data: seminar,
    isLoading: isLoadingSeminar,
    error: seminarError,
  } = useQuery({
    queryKey: ["seminar", seminarId],
    queryFn: () => fetchSeminarById(seminarId!),
    enabled: !!seminarId,
  });

  // Update seminar mutation
  const mutation = useMutation({
    mutationFn: (data: any) => updateSeminar(seminarId!, data),
    onSuccess: () => {
      Swal.fire("Updated!", "Seminar updated successfully!", "success");
      queryClient.invalidateQueries({ queryKey: ["seminars"] });
      navigate("/dashboard/admin/seminar/all-seminars");
    },
    onError: (error: any) => {
      console.log(error);
      handleAxiosError(error, "Failed to update seminar");
    },
  });


  const onSubmit = (formData: any) => {
    // Convert the switch value => isUpcoming
    const finalData = {
      ...formData,
      coverImage: coverImage || seminar?.data?.coverImage,
      isUpcoming
    };
    mutation.mutate(finalData);
  };

  if (isLoadingTeachers || isLoadingSeminar) {
    <Loader />;
  }
  if (teachersError || seminarError) {
    <p>Error loading data. Please try again.</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center underline underline-offset-8 text-blue-500">
        Edit Seminar
      </h1>
      {seminar && (
        <AppForm
          onSubmit={onSubmit}
          defaultValues={{
            ...seminar.data,
            // If "startDate" is stored as e.g. "2025-01-20T00:00:00.000Z",
            // you can slice to "yyyy-MM-dd" to match AppDatePicker
            startDate: seminar.data.startDate
              ? seminar.data.startDate.split("T")[0]
              : "",
          }}
          buttonText="Update Seminar"
        >
          {/* Name */}
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

          {/* Cover Image */}
          <div>
            <label className="block font-medium text-gray-700">
              Upload Cover Image
            </label>
            <ImageUpload setUploadedImageUrl={setCoverImage} />
          </div>

          {/* Start Date (Custom DatePicker) */}
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

          {/* Location */}
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
            options={teachers.map(
              (teacher: { _id: string; teacherName: string }) => ({
                value: teacher._id,
                label: teacher.teacherName,
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
            name="googleFormEmbedUrl"
            label="Google Form Embed (src URL)"
            placeholder="https://docs.google.com/forms/..embedded=true"
          />

          {/* isUpcoming Switch */}
          <div className="mt-4">
            <label className="mb-2 block font-medium text-gray-700">
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
      )}
    </div>
  );
};

export default EditSeminar;
