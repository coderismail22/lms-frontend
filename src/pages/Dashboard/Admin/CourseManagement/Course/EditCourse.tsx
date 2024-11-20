import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import AppForm from "@/components/CustomForm/AppForm";
import AppInput from "@/components/CustomForm/AppInput";
import AppSelect from "@/components/CustomForm/AppSelect";
import DynamicSelectField from "@/components/CustomForm/DynamicSelect";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { TCourseForm } from "@/types/course.type";
import {
  createCourseSchema,
  updateCourseSchema,
} from "@/schemas/course.schema";
import axiosInstance from "@/api/axiosInstance";
import { ZodType } from "zod";

// Fetch course details by ID
const fetchCourseById = async (courseId: string): Promise<TCourseForm> => {
  const response = await axiosInstance.get(
    `/courses/get-single-course/${courseId}`
  );
  return response.data.data;
};

// Update course
const updateCourse = async ({
  courseId,
  data,
}: {
  courseId: string;
  data: TCourseForm;
}): Promise<void> => {
  await axiosInstance.patch(`/courses/update-course/${courseId}`, data);
};

const EditCourse = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [careerOpportunities, setCareerOpportunities] = useState<string[]>([]);
  const [curriculum, setCurriculum] = useState<string[]>([]);
  const [jobPositions, setJobPositions] = useState<string[]>([]);
  const [softwareList, setSoftwareList] = useState<string[]>([]);
  const [subjects, setSubjects] = useState<{ value: string; label: string }[]>(
    []
  );

  // Fetch course details
  const {
    data: course,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["course", courseId],
    queryFn: () => fetchCourseById(courseId!),
    enabled: !!courseId, // Only fetch if courseId exists
  });

  // Update dynamic fields when data is available
  useEffect(() => {
    if (course) {
      setCareerOpportunities(course?.careerOpportunities || []);
      setCurriculum(course?.curriculum || []);
      setJobPositions(course?.jobPositions || []);
      setSoftwareList(course?.softwareList || []);

      // Transform subjects for AppSelect
      setSubjects(
        course?.subjects.map((subject) => ({
          value: subject._id,
          label: subject.name,
        })) || []
      );
    }
  }, [course]);

  // Mutation for updating the course
  const mutation = useMutation({
    mutationFn: ({ courseId, data }: { courseId: string; data: TCourseForm }) =>
      updateCourse({ courseId, data }),
    onSuccess: () => {
      Swal.fire("Updated!", "Course has been updated successfully.", "success");
      queryClient.invalidateQueries({ queryKey: ["courses"] }); // Invalidate the courses list
      navigate("/dashboard/admin/course-management/all-courses"); // Redirect to course list
    },
    // TODO: Define error type
    onError: (error: any) => {
      console.error("Error updating course:", error?.response?.data);
      Swal.fire("Error!", "Failed to update course.", "error");
    },
  });

  // Handle form submission
  const onSubmit = (data: TCourseForm) => {
    console.log("data", data);
    const finalData = {
      ...data,
      careerOpportunities,
      curriculum,
      jobPositions,
      softwareList,
      subjects: subjects.map((subject) => subject.value),
    };
    console.log("fdata", finalData);
    mutation.mutate({ courseId: courseId!, data: finalData });
  };

  if (isLoading) return <p>Loading course details...</p>;
  if (error) return <p>Error loading course details. Please try again.</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Edit Course</h1>
      <AppForm
        schema={updateCourseSchema}
        // schema={updateCourseSchema as ZodType<TCourseForm>}
        onSubmit={onSubmit}
        defaultValues={course} // Pre-fill form with fetched data
        submitButtonStyles="w-[150px]"
        buttonText={isLoading ? "Saving..." : "Save Changes"}
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Name */}
          <AppInput
            name="name"
            label="Course Name"
            placeholder="Enter course name"
          />
          {/* Description */}
          <AppInput
            name="description"
            label="Description"
            placeholder="Enter description"
          />
          {/* Language */}
          <AppSelect
            name="language"
            label="Language"
            options={[
              { value: "Bangla", label: "Bangla" },
              { value: "English", label: "English" },
              { value: "Hindi", label: "Hindi" },
              { value: "Arabic", label: "Arabic" },
            ]}
          />
          {/* Category */}
          <AppSelect
            name="category"
            label="Category"
            options={[{ value: "Web Development", label: "Web Development" }]} // Update as needed
          />
          {/* Price */}
          <AppInput
            name="coursePrice"
            label="Price"
            placeholder="Enter price"
          />
          {/* Duration */}
          <AppInput
            name="courseLength"
            label="Course Duration"
            placeholder="Enter duration"
          />
          {/* Skill Level */}
          <AppSelect
            name="skillLevel"
            label="Skill Level"
            options={[
              {
                value: "Beginner to Intermediate",
                label: "Beginner to Intermediate",
              },
              {
                value: "Intermediate to Advanced",
                label: "Intermediate to Advanced",
              },
              { value: "Beginner to Advanced", label: "Beginner to Advanced" },
            ]}
          />
          {/* Course Type */}
          <AppSelect
            name="courseType"
            label="Course Type"
            options={[
              { value: "Online", label: "Online" },
              { value: "Offline", label: "Offline" },
              { value: "Hybrid", label: "Hybrid" },
            ]}
          />
          {/* Subjects */}
          <AppSelect
            name="subjects"
            label="Subjects"
            placeholder="Select subjects"
            isMulti={true}
            options={subjects}
          />
        </div>

        <div className="grid grid-cols-1 mt-5 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {/* Career Opportunities */}
          <DynamicSelectField
            label="Career Opportunities"
            placeholder="Select career opportunities"
            options={careerOpportunities.map((item) => ({
              value: item,
              label: item,
            }))}
            onChange={setCareerOpportunities}
          />
          {/* Curriculum */}
          <DynamicSelectField
            label="Curriculum"
            placeholder="Select curriculum"
            options={curriculum.map((item) => ({ value: item, label: item }))}
            onChange={setCurriculum}
          />
          {/* Job Positions */}
          <DynamicSelectField
            label="Job Positions"
            placeholder="Select job positions"
            options={jobPositions.map((item) => ({ value: item, label: item }))}
            onChange={setJobPositions}
          />
          {/* Software List */}
          <DynamicSelectField
            label="Software List"
            placeholder="Select software list"
            options={softwareList.map((item) => ({ value: item, label: item }))}
            onChange={setSoftwareList}
          />
        </div>
      </AppForm>
    </div>
  );
};

export default EditCourse;
