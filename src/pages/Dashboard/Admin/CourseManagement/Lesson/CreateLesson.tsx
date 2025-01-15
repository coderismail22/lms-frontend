import AppForm from "@/components/CustomForm/AppForm";
import AppInput from "@/components/CustomForm/AppInput";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/api/axiosInstance";
import Swal from "sweetalert2";
import AppSelect from "@/components/CustomForm/AppSelect";
import { useNavigate } from "react-router-dom";
import { contentTypes } from "./lesson.constant";
import { createLessonSchema } from "@/schemas/lesson.schema";
import DynamicMaterialsField from "@/components/CustomForm/DynamicMaterialFields";
import "../../../../../styles/swal.css"

// Create lesson function
const createLesson = async (lessonData: {
  name: string;
  description: string;
  type: string;
  content: string;
  materials?: { name: string; link: string }[];
}) => {
  const response = await axiosInstance.post(
    "/lessons/create-lesson",
    lessonData
  );
  return response.data;
};

const CreateLesson = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // Mutation for creating a lesson
  const mutation = useMutation({
    mutationFn: createLesson,
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Lesson Created",
        text: "Lesson created successfully!!",
        customClass: {
          title: "custom-title",
          popup: "custom-popup",
          icon: "custom-icon",
          confirmButton: "custom-confirm-btn",
        },
      });
      queryClient.invalidateQueries({ queryKey: ["lessons"] });
      navigate("/dashboard/admin/lesson-management/all-lessons");
    },
    onError: (err) => {
      console.error(err);
      Swal.fire(
        "Error!",
        "Failed to create lesson. Please try again.",
        "error"
      );
    },
  });

  const onSubmit = (data: {
    name: string;
    description: string;
    type: string;
    content: string;
    materials: { name: string; link: string }[];
  }) => {
    mutation.mutate(data);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center underline underline-offset-8 text-blue-500">
        Create Lesson
      </h1>
      <AppForm
        schema={createLessonSchema}
        onSubmit={onSubmit}
        defaultValues={{
          name: "",
          description: "",
          type: "",
          content: "",
          materials: [],
        }}
        buttonText="Create Lesson"
      >
        {/* Lesson Name */}
        <AppInput
          name="name"
          label="Lesson Name"
          placeholder="Enter lesson name"
        />

        {/* Description */}
        <AppInput
          name="description"
          label="Description"
          placeholder="Enter description"
        />

        {/* Type */}
        <AppSelect
          name="type"
          label="Type"
          placeholder="Select the type of your lesson"
          options={contentTypes?.map((value) => ({
            value: value.value,
            label: value.label,
          }))}
        />

        {/* Content URL */}
        <AppInput
          name="content"
          label="Content URL"
          placeholder="Enter content URL"
        />

        {/* Materials */}
        <DynamicMaterialsField label="Materials" name="materials" />
      </AppForm>
    </div>
  );
};

export default CreateLesson;
