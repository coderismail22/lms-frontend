import AppForm from "@/components/CustomForm/AppForm";
import AppInput from "@/components/CustomForm/AppInput";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/api/axiosInstance";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import ImageUpload from "@/components/ImageUpload/ImageUpload";
import { useState } from "react";

// Create teacher function
const createTeacher = async (teacherData: {
  teacherName: string;
  profileImg: string;
  email: string;
  phone: string;
  salary: number;
}) => {
  const response = await axiosInstance.post(
    "/teachers/create-teacher",
    teacherData
  );
  return response.data;
};

const AddTeacher = () => {
  const [profileImg, setProfileImg] = useState<string>(""); // Handle batch image

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // Mutation for creating a teacher
  const mutation = useMutation({
    mutationFn: createTeacher,
    onSuccess: () => {
      Swal.fire("Success!", "Teacher added successfully!", "success");
      queryClient.invalidateQueries({ queryKey: ["teachers"] });
      navigate("/dashboard/admin/teacher-management/all-teachers");
    },
    onError: (err) => {
      console.error(err);
      Swal.fire("Error!", "Failed to add teacher. Please try again.", "error");
    },
  });

  const onSubmit = (data: {
    teacherName: string;
    profileImg: string;
    email: string;
    phone: string;
    salary: number;
  }) => {
    const finalData = {
      ...data,
      profileImg,
    };

    mutation.mutate(finalData);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center underline underline-offset-8 text-blue-500">
        Add Teacher
      </h1>
      <AppForm
        onSubmit={onSubmit}
        defaultValues={{ teacherName: "", salary: 0 }}
        buttonText="Add Teacher"
      >
        {/* Teacher Name */}
        <AppInput
          name="teacherName"
          label="Teacher Name"
          placeholder="Enter teacher name"
        />

        {/* Image Upload Section */}
        <div className="text-sm truncate">
          <label className="block font-medium text-white">
            Upload Cover Image
          </label>
          <ImageUpload setUploadedImageUrl={setProfileImg} />
          {profileImg === "" && (
            <p className="text-red-500 text-sm">Image is required</p>
          )}
        </div>

        {/* Email */}
        <AppInput name="email" label="Email" placeholder="Enter email" />
        {/* Phone */}
        <AppInput name="phone" label="Phone" placeholder="Enter phone number" />
        {/* Salary */}
        <AppInput name="salary" label="Salary" placeholder="Enter salary" />
      </AppForm>
    </div>
  );
};

export default AddTeacher;
