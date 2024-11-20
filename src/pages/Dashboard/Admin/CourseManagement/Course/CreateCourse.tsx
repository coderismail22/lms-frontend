import AppForm from "@/components/CustomForm/AppForm";
import AppInput from "@/components/CustomForm/AppInput";
import AppSelect from "@/components/CustomForm/AppSelect";
import { useState } from "react";
import DynamicSelectField from "@/components/CustomForm/DynamicSelect";
import { TCourseForm } from "@/types/course.type";
import { createCourseSchema } from "@/schemas/course.schema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/api/axiosInstance";
import Swal from "sweetalert2";

// const fetchBatches = async () => {
//   const response = await axiosInstance.get("/batches");
//   return response?.data?.data; // Assuming response contains an array of batches
// };

const fetchCategories = async () => {
  const response = await axiosInstance.get("/categories");
  return response?.data?.data; // Assuming response contains an array of batches
};

// Create course function
const createCourse = async (courseData: TCourseForm) => {
  const response = await axiosInstance.post(
    "/courses/create-course",
    courseData
  );
  return response.data;
};

const CreateCourse = () => {
  const queryClient = useQueryClient();
  const [careerOpportunities, setCareerOpportunities] = useState<string[]>([]);
  const [curriculum, setCurriculum] = useState<string[]>([]);
  const [jobPositions, setJobPositions] = useState<string[]>([]);
  const [softwareList, setSoftwareList] = useState<string[]>([]);

  // Fetch batches and categories
  // const {
  //   data: batches,
  //   isLoading: isLoadingBatches,
  //   error: batchError,
  // } = useQuery({ queryKey: ["batches"], queryFn: fetchBatches });
  const {
    data: categories,
    isLoading: isLoadingCategories,
    error: categoryError,
  } = useQuery({ queryKey: ["categories"], queryFn: fetchCategories });

  // Mutation for creating a course
  const mutation = useMutation({
    mutationFn: createCourse,
    onSuccess: () => {
      Swal.fire("Success!", "Course created successfully!", "success");
      queryClient.invalidateQueries({ queryKey: ["courses"] }); // Invalidate courses list
    },
    onError: (error: any) => {
      console.error("Error creating course:", error);
      Swal.fire(
        "Error!",
        "Failed to create the course. Please try again.",
        "error"
      );
    },
  });

  const onSubmit = (data: TCourseForm) => {
    const finalData = {
      ...data,
      careerOpportunities,
      curriculum,
      jobPositions,
      softwareList,
    };

    console.log("Form Data:", finalData);
    mutation.mutate(finalData); // Trigger the mutation
  };

  if (isLoadingCategories) return <p>Loading data...</p>;
  if (categoryError) return <p>Error loading data. Please try again.</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <AppForm
        schema={createCourseSchema}
        onSubmit={onSubmit}
        submitButtonStyles="w-[150px]"
        buttonText="Create Course"
        alignButton="center"
        defaultValues={{
          name: "",
          description: "",
          category: "",
          language: "",
          courseType: "",
          coursePrice: 0,
          courseLength: "",
          skillLevel: "",
          subjects: [],
          careerOpportunities: [],
          curriculum: [],
          jobPositions: [],
          softwareList: [],
        }}
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Name */}
          <AppInput
            className="w-full"
            name="name"
            label="Course Name"
            placeholder="Enter course name"
          />
          {/* Description */}
          <AppInput
            className="w-full "
            name="description"
            label="Description"
            placeholder="Enter description"
          />
          {/* Language */}
          <AppSelect
            name="language"
            label="Language"
            placeholder="Select a language"
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
            placeholder="Select a category"
            options={categories.map(
              (category: { _id: string; name: string }) => ({
                value: category._id,
                label: category.name,
              })
            )}
          />

          {/* Course Price */}
          <AppInput
            className="w-full "
            name="coursePrice"
            label="Price"
            placeholder="Enter a price"
          />
          {/* Course Time Length */}
          <AppInput
            className="w-full "
            name="courseLength"
            label="Course Duration"
            placeholder="Enter course duration"
          />
          {/* Skill Level */}
          <AppSelect
            name="skillLevel"
            label="Skill Level"
            placeholder="Select a skill level"
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
            placeholder="Select course type"
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
            options={[{ value: "67272e215a79bcfccd9bc9ef", label: "React" }]}
          />
        </div>
        <div className="grid grid-cols-1  mt-5 md:grid-cols-2 md:gap-6 lg:grid-cols-2">
          {/* Career Opportunities */}
          <DynamicSelectField
            label="Career Opportunities"
            placeholder="Select or add opportunities"
            options={careerOpportunities.map((opportunity) => ({
              value: opportunity,
              label: opportunity,
            }))}
            onChange={setCareerOpportunities}
          />
          {/* Curriculum */}
          <DynamicSelectField
            label="Curriculum"
            placeholder="Select or add curriculum"
            options={curriculum.map((item) => ({ value: item, label: item }))}
            onChange={setCurriculum}
          />
          {/* Job Positions */}
          <DynamicSelectField
            label="Job Positions"
            placeholder="Select or add job positions"
            options={jobPositions.map((position) => ({
              value: position,
              label: position,
            }))}
            onChange={setJobPositions}
          />
          {/* Software List */}
          <DynamicSelectField
            label="Software List"
            placeholder="Select or add software"
            options={softwareList.map((software) => ({
              value: software,
              label: software,
            }))}
            onChange={setSoftwareList}
          />
        </div>
      </AppForm>
    </div>
  );
};
/******  4edec1c4-86fd-4011-aaba-599699c92bb5  *******/

export default CreateCourse;
