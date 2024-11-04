/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import ImageUpload from "../ImageUpload/ImageUpload";
import Select from "react-select";

interface TechnologyOption {
  value: string;
  label: string;
}

interface TagOption {
  value: string;
  label: string;
}

interface ProjectFormData {
  title: string;
  coverImage: string;
  description: string;
  liveLink?: string;
  githubLink?: string;
  duration?: string;
  priorityMarkId?: string;
  technologies: TechnologyOption[];
  tags: TagOption[];
}

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

const ProjectEditModal = ({ isOpen, onClose, project, onUpdate }: any) => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ProjectFormData>();

  useEffect(() => {
    if (project) {
      reset({
        title: project.title || "",
        coverImage: project.coverImage || "",
        description: project.description || "",
        liveLink: project.liveLink || "",
        githubLink: project.githubLink || "",
        duration: project.duration || "",
        priorityMarkId: project.priorityMarkId || "",
        technologies:
          project.technologies?.map((tech: string) => ({
            value: tech,
            label: tech,
          })) || [],
        tags:
          project.tags?.map((tag: string) => ({ value: tag, label: tag })) ||
          [],
      });
    }
  }, [project, reset]);

  const handleUpdate = async (data: ProjectFormData) => {
    const updatedProjectData = {
      ...data,
      technologies: data.technologies.map((tech) => tech.value),
      tags: data.tags.map((tag) => tag.value),
    };

    try {
      await axios.patch(
        `https://ismail-codes-portfolio-backend-24.vercel.app/api/v1/project/${project._id}`,
        updatedProjectData
      );
      Swal.fire("Success!", "Project updated successfully.", "success");
      onUpdate(); // Notify parent of the update
      onClose(); // Close the modal
    } catch (error) {
      console.log(error);
      Swal.fire("Error!", "Failed to update project.", "error");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center overflow-auto">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg max-h-screen overflow-y-auto my-2">
        <h2 className="text-2xl font-semibold mb-4">Edit Project</h2>
        <form onSubmit={handleSubmit(handleUpdate)}>
          {/* Title Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Project Title
            </label>
            <input
              {...register("title", { required: "Title is required" })}
              type="text"
              className="w-full border border-gray-300 rounded p-2"
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </div>

          {/* Image Upload Section */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Upload Cover Image
            </label>
            <ImageUpload
              setUploadedImageUrl={(url: string) => setValue("coverImage", url)}
            />
            {errors.coverImage && (
              <p className="text-red-500 text-sm">Image is required</p>
            )}
          </div>

          {/* Description Textarea */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              {...register("description", {
                required: "Description is required",
              })}
              className="w-full border border-gray-300 rounded p-2"
            />
            {errors.description && (
              <p className="text-red-500 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Live Link Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Live Link</label>
            <input
              {...register("liveLink")}
              type="text"
              className="w-full border border-gray-300 rounded p-2"
            />
          </div>

          {/* GitHub Link Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              GitHub Link
            </label>
            <input
              {...register("githubLink")}
              type="text"
              className="w-full border border-gray-300 rounded p-2"
            />
          </div>

          {/* Duration Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Duration</label>
            <input
              {...register("duration")}
              type="text"
              className="w-full border border-gray-300 rounded p-2"
            />
          </div>

          {/* Priority Mark ID Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Priority Mark ID
            </label>
            <input
              {...register("priorityMarkId")}
              type="text"
              className="w-full border border-gray-300 rounded p-2"
            />
          </div>

          {/* Technologies Select */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Technologies
            </label>
            <Controller
              name="technologies"
              control={control}
              render={({ field }) => (
                <Select isMulti options={techOptions} {...field} />
              )}
            />
          </div>

          {/* Tags Select */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Tags</label>
            <Controller
              name="tags"
              control={control}
              render={({ field }) => (
                <Select isMulti options={tagOptions} {...field} />
              )}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Save Changes
            </button>
            <button
              type="button"
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectEditModal;
