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

// Fetch course details by ID
const fetchCourseById = async (courseId: string): Promise<TCourseForm> => {
  const response = await axiosInstance.get(
    `/courses/get-single-course/${courseId}`
  );
  return response.data.data;
};

// Fetch subjects from the subjects collection
const fetchSubjects = async (): Promise<{ value: string; label: string }[]> => {
  const response = await axiosInstance.get("/subjects/get-all-subjects");
  return response.data.data.map((subject: { _id: string; name: string }) => ({
    value: subject._id,
    label: subject.name,
  }));
};

// Update course
const updateCourse = async (
  courseId: string,
  data: TCourseForm
): Promise<void> => {
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

  // Fetch course details
  const {
    data: course,
    isLoading: isLoadingCourse,
    error: courseError,
  } = useQuery({
    queryKey: ["course", courseId],
    queryFn: () => fetchCourseById(courseId!),
    enabled: !!courseId, // Only fetch if courseId exists
  });

  // Fetch subjects
  const {
    data: subjects,
    isLoading: isLoadingSubjects,
    error: subjectsError,
  } = useQuery({
    queryKey: ["subjects"],
    queryFn: fetchSubjects,
  });

  // Update dynamic fields when data is available
  useEffect(() => {
    if (course) {
      setCareerOpportunities(course?.careerOpportunities || []);
      setCurriculum(course?.curriculum || []);
      setJobPositions(course?.jobPositions || []);
      setSoftwareList(course?.softwareList || []);
    }
  }, [course]);

  // Mutation for updating the course
  const mutation = useMutation({
    mutationFn: (data: TCourseForm) => updateCourse(courseId!, data),
    onSuccess: () => {
      Swal.fire("Updated!", "Course has been updated successfully.", "success");
      queryClient.invalidateQueries({ queryKey: ["courses"] }); // Invalidate the courses list
      navigate("/dashboard/admin/course-management/all-courses"); // Redirect to course list
    },
    onError: (error: any) => {
      console.error("Error updating course:", error?.response?.data);
      Swal.fire("Error!", "Failed to update course.", "error");
    },
  });

  // Handle form submission
  const onSubmit = (data: TCourseForm) => {
    const finalData = {
      ...data,
      careerOpportunities,
      curriculum,
      jobPositions,
      softwareList,
    };
    mutation.mutate(finalData);
  };

  if (isLoadingCourse || isLoadingSubjects) return <p>Loading...</p>;
  if (courseError || subjectsError)
    return <p>Error loading data. Please try again later.</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Edit Course</h1>
      <AppForm
        schema={updateCourseSchema}
        onSubmit={onSubmit}
        defaultValues={course} // Pre-fill form with fetched data
        submitButtonStyles="w-[150px]"
        buttonText="Save Changes"
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
            options={subjects || []} // Populate with fetched subjects
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
