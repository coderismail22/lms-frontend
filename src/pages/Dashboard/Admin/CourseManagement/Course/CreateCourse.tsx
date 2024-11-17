import AppForm from "@/components/CustomForm/AppForm";
import AppInput from "@/components/CustomForm/AppInput";
import AppSelect from "@/components/CustomForm/AppSelect";
import { useState } from "react";
import DynamicSelectField from "@/components/CustomForm/DynamicSelect";
import { TCourseForm } from "@/types/course.type";
import { createCourseSchema } from "@/schemas/course.schema";

const CreateCourse = () => {
  const [careerOpportunities, setCareerOpportunities] = useState<string[]>([]);
  const [curriculum, setCurriculum] = useState<string[]>([]);
  const [jobPositions, setJobPositions] = useState<string[]>([]);
  const [softwareList, setSoftwareList] = useState<string[]>([]);

  const onSubmit = (data: TCourseForm) => {
    const finalData = {
      ...data,
      careerOpportunities,
      curriculum,
      jobPositions,
      softwareList,
    };

    console.log("Form Data:", finalData);
  };

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
          batch: "",
          courseType: "",
          coursePrice: 0, // Set a default value to ensure it's controlled from the start
          courseLength: "",
          skillLevel: "",
          careerOpportunities: [], // Default as empty arrays for dynamic select fields
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
              {
                value: "Bangla",
                label: "Bangla",
              },
              {
                value: "English",
                label: "English",
              },
              {
                value: "Hindi",
                label: "Hindi",
              },
              {
                value: "Arabic",
                label: "Arabic",
              },
            ]}
          />

          {/* Batch No */}
          <AppSelect
            name="batch"
            label="Batch"
            placeholder="Select a batch"
            options={[
              {
                value: "01",
                label: "01",
              },
              {
                value: "02",
                label: "02",
              },
            ]}
          />

          {/* Category */}
          <AppSelect
            name="category"
            label="Category"
            placeholder="Select a course category"
            options={[
              {
                value: "Video Editing",
                label: "Video Editing",
              },
              {
                value: "Web Design",
                label: "Web Design",
              },
              {
                value: "Web Development",
                label: "Web Development",
              },
            ]}
          />
          {/* TODO (In Batch Not While Creating a New Course):  */}
          {/* Start Date Picker */}
          {/* Start Date Picker */}

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
              {
                value: "Beginner to Advanced",
                label: "Beginner to Advanced",
              },
            ]}
          />

          {/* Course Type */}
          <AppSelect
            name="courseType"
            label="Course Type"
            placeholder="Select a course category"
            options={[
              {
                value: "Online",
                label: "Online",
              },
              {
                value: "Offline",
                label: "Offline",
              },
              {
                value: "Hybrid",
                label: "Hybrid",
              },
            ]}
          />
        </div>
        <div className="grid grid-cols-1  mt-5 md:grid-cols-2 md:gap-6 lg:grid-cols-2">
          {/* Career Opportunities*/}
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

export default CreateCourse;
