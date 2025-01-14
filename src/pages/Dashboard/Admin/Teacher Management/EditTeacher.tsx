import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import AppForm from "@/components/CustomForm/AppForm";
import AppInput from "@/components/CustomForm/AppInput";
import Swal from "sweetalert2";
import axiosInstance from "@/api/axiosInstance";
import ImageUpload from "@/components/ImageUpload/ImageUpload";
import { useState } from "react";
import Loader from "@/components/Loader/Loader";

// Fetch teacher by ID
const fetchTeacherById = async (teacherId: string) => {
  const response = await axiosInstance.get(`/teachers/${teacherId}`);
  return response?.data;
};

// Update teacher function
const updateTeacher = async (
  teacherId: string,
  data: { name: string; salary: number }
) => {
  const response = await axiosInstance.patch(
    `/teachers/update-teacher/${teacherId}`,
    data
  );
  return response?.data;
};

const EditTeacher = () => {
  const [profileImg, setProfileImg] = useState<string>("");

  const { teacherId } = useParams<{ teacherId: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Fetch teacher details
  const {
    data: teacher,
    isLoading: isLoadingTeacher,
    error: teacherError,
  } = useQuery({
    queryKey: ["teacher", teacherId],
    queryFn: () => fetchTeacherById(teacherId!),
    enabled: !!teacherId,
  });

  const mutation = useMutation({
    mutationFn: (data: { name: string; salary: number }) =>
      updateTeacher(teacherId!, data),
    onSuccess: () => {
      Swal.fire("Updated!", "Teacher updated successfully!", "success");
      queryClient.invalidateQueries({ queryKey: ["teachers"] });
      navigate("/dashboard/admin/teacher-management/all-teachers");
    },
    onError: (error) => {
      console.log(error);
      Swal.fire("Error!", "Failed to update teacher.", "error");
    },
  });

  const onSubmit = (data: { name: string; salary: number }) => {
    const finalData = {
      ...data,
      profileImg: profileImg || teacher?.data?.profileImg,
    };
    console.log(finalData);
    mutation.mutate(finalData);
  };

  if (isLoadingTeacher) {
    <Loader />;
  }
  if (teacherError) return <p>Something went wrong...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center underline underline-offset-8 text-blue-500">
        Edit Teacher
      </h1>
      {teacher && (
        <AppForm
          onSubmit={onSubmit}
          defaultValues={{
            ...teacher?.data,
          }}
          buttonText="Update Teacher"
        >
          {/* Name */}
          <AppInput
            name="teacherName"
            label="Teacher Name"
            placeholder="Enter teacher name"
          />
          {/* ProfileImg */}
          {/* Upload Cover Image */}
          <div>
            <label className="block font-medium text-gray-700">
              Upload Cover Image
            </label>
            <ImageUpload setUploadedImageUrl={setProfileImg} />
          </div>

          {/* Email */}
          <AppInput name="email" label="Email" placeholder="Enter email" />
          {/* Phone */}
          <AppInput
            name="phone"
            label="Phone"
            placeholder="Enter phone number"
          />

          {/* Salary */}
          <AppInput name="salary" label="Salary" placeholder="Enter salary" />
        </AppForm>
      )}
    </div>
  );
};

export default EditTeacher;
