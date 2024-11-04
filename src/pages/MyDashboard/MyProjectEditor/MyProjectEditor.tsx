import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import Select, { MultiValue } from "react-select";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import ImageUpload from "../ImageUpload/ImageUpload";

type FormValues = {
  title: string;
  description: string;
  technologies: { value: string; label: string }[]; // React Select options
  duration: string;
  liveLink: string;
  githubLink: string;
  prioritymarkid: string;
  tags: { value: string; label: string }[]; // React Select options
};

const techOptions = [
  { value: "React", label: "React" },
  { value: "Node.js", label: "Node.js" },
  { value: "Express", label: "Express" },
  { value: "MongoDB", label: "MongoDB" },
  // Add more options as needed
];

const tagOptions = [
  { value: "Frontend", label: "Frontend" },
  { value: "Backend", label: "Backend" },
  { value: "Fullstack", label: "Fullstack" },
  { value: "API", label: "API" },
  // Add more options as needed
];

type TSelectOption = {
  value: string;
  label: string;
};

const MyProjectEditor = () => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const [selectedTechnologies, setSelectedTechnologies] = useState<
    TSelectOption[]
  >([]);
  const [selectedTags, setSelectedTags] = useState<TSelectOption[]>([]);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string>("");

  // Handle category change
  const handleTechnologiesChange = (
    selectedOptions: MultiValue<TSelectOption>
  ) => {
    setSelectedTechnologies(selectedOptions as TSelectOption[]);
  };

  // Handle tag change
  const handleTagsChange = (selectedOptions: MultiValue<TSelectOption>) => {
    setSelectedTags(selectedOptions as TSelectOption[]);
  };

  const onSubmit = async (data: FormValues) => {
    console.log(data);
    const projectData = {
      title: data?.title,
      coverImage: uploadedImageUrl,
      description: data?.description,
      technologies: selectedTechnologies.map((t) => t.value),
      liveLink: data?.liveLink,
      githubLink: data?.githubLink,
      duration: data?.duration,
      priorityMarkId: data?.prioritymarkid,
      tags: selectedTags.map((t) => t.value),
    };
    console.log("refined project data", projectData);
    try {
      await axios.post(
        "https://ismail-codes-portfolio-backend-24.vercel.app/api/v1/project",
        projectData
      );
      Swal.fire({
        icon: "success",
        title: "Project published!",
        text: "Your project has been successfully published.",
      });
      reset(); // Clear form after successful submit
    } catch (error) {
      console.log("error", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong! Please try again.",
      });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 bg-[#CBD5E1] p-8 rounded-lg shadow-md max-w-lg mx-auto"
      >
        {/* Title */}
        <div>
          <label htmlFor="title" className="block font-medium text-gray-700">
            Project Title
          </label>
          <input
            {...register("title", { required: "Title is required" })}
            type="text"
            id="title"
            className="w-full mt-1 border rounded-md p-2"
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}
        </div>
        {/* Image Upload Section */}
        <div className="mt-5 text-white">
          <label className="block font-medium ">Upload Cover Image</label>
          <ImageUpload setUploadedImageUrl={setUploadedImageUrl} />
          {uploadedImageUrl === "" && (
            <p className="text-red-500 text-sm">Image is required</p>
          )}
        </div>
        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="block font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            {...register("description", {
              required: "Description is required",
            })}
            id="description"
            className="w-full mt-1 border rounded-md p-2"
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}
        </div>
        {/* Technologies */}
        <div>
          <label className="block font-medium text-gray-700">
            Technologies
          </label>
          <Controller
            name="technologies"
            control={control}
            rules={{ required: "Please select at least one technology" }}
            render={({ field }) => (
              <Select
                {...field}
                isMulti
                options={techOptions}
                onChange={(selectedOptions) => {
                  handleTechnologiesChange(selectedOptions); // Update local state
                  field.onChange(selectedOptions); // Pass value to react-hook-form
                }}
                className="mt-1"
              />
            )}
          />
          {errors.technologies && (
            <p className="text-red-500 text-sm">
              {errors.technologies.message}
            </p>
          )}
        </div>
        {/* Duration */}
        <div>
          <label htmlFor="duration" className="block font-medium text-gray-700">
            Duration
          </label>
          <input
            {...register("duration", { required: "Duration is required" })}
            type="text"
            id="duration"
            className="w-full mt-1 border rounded-md p-2"
          />
          {errors.duration && (
            <p className="text-red-500 text-sm">{errors.duration.message}</p>
          )}
        </div>
        {/* Live Link */}
        <div>
          <label htmlFor="liveLink" className="block font-medium text-gray-700">
            Live Link
          </label>
          <input
            {...register("liveLink")}
            type="url"
            id="liveLink"
            className="w-full mt-1 border rounded-md p-2"
          />
        </div>
        {/* Github Link */}
        <div>
          <label
            htmlFor="githubLink"
            className="block font-medium text-gray-700"
          >
            GitHub Link
          </label>
          <input
            {...register("githubLink")}
            type="url"
            id="githubLink"
            className="w-full mt-1 border rounded-md p-2"
          />
        </div>
        {/* Priority ID */}
        <div>
          <label
            htmlFor="prioritymarkid"
            className="block font-medium text-gray-700"
          >
            Priority Mark ID
          </label>
          <input
            {...register("prioritymarkid")}
            type="text"
            id="prioritymarkid"
            className="w-full mt-1 border rounded-md p-2"
          />
        </div>
        {/* Tags */}
        <div>
          <label className="block font-medium text-gray-700">Tags</label>
          <Controller
            name="tags"
            control={control}
            rules={{ required: "Please select at least one tag" }}
            render={({ field }) => (
              <Select
                {...field}
                isMulti
                options={tagOptions}
                onChange={(selectedOptions) => {
                  handleTagsChange(selectedOptions); // Update local state
                  field.onChange(selectedOptions); // Pass value to react-hook-form
                }}
                className="mt-1"
              />
            )}
          />
          {errors.tags && (
            <p className="text-red-500 text-sm">{errors.tags.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md w-full hover:bg-blue-600 transition-colors"
        >
          Publish
        </button>
      </form>
    </div>
  );
};

export default MyProjectEditor;
