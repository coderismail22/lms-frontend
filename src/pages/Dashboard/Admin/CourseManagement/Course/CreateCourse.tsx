import Select from "react-select";
import AppForm from "@/components/CustomForm/AppForm";
import AppInput from "@/components/CustomForm/AppInput";
import AppSelect from "@/components/CustomForm/AppSelect";
import { useState } from "react";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { FaPlus } from "react-icons/fa";
import { Button } from "@/components/ui/button";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  category: z.string().min(1, "Category is required"),
});

// Infer the type of the schema
type FormData = z.infer<typeof schema>;

const CreateCourse = () => {
  const [options, setOptions] = useState<{ value: string; label: string }[]>(
    []
  );
  const [inputValue, setInputValue] = useState("");
  const [selectedOpportunities, setSelectedOpportunities] = useState<string[]>(
    []
  );

  const handleAddOption = () => {
    if (inputValue.trim() !== "") {
      setOptions((prevOptions) => [
        ...prevOptions,
        { value: inputValue, label: inputValue },
      ]);
      setInputValue(""); // Clear input after adding
    }
  };

  const onSubmit = (data: FormData) => {
    console.log("Form Data:", data);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <AppForm
        schema={schema}
        onSubmit={onSubmit}
        submitButtonStyles="w-[150px]"
        buttonText="Create Course"
        alignButton="center"
        defaultValues={{
          name: "Video Editing",
          description: "By Ismail",
        }}
      >
        {/* Name */}
        <AppInput
          className="w-full md:w-[350px]"
          name="name"
          label="Course Name"
          placeholder="Enter course name"
        />
        {/* Description */}
        <AppInput
          className="w-full md:w-[350px]"
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
        {/* TODO:  */}
        {/* Start Date */}

        {/* Course Price */}
        <AppInput
          className="w-full md:w-[350px]"
          name="coursePrice"
          label="Price"
          placeholder="Enter a price"
        />
        {/* Course Time Length */}
        <AppInput
          className="w-full md:w-[350px]"
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
          name="category"
          label="Course Category"
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

        {/* Hey chatgpt make these dynamic selectable. I mean there will be delete and add option. You can use react-select for this. */}
        {/* Career Opportunity */}
        {/* Enter Curriculum */}
        {/* Enter job positions */}
        {/* Enter software list */}

        <div className="w-full  my-10">
          <label>Career Opportunities</label>
          <div className="flex gap-2 mb-2 ">
            <Input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Add new opportunity"
              className="border p-2 flex-1"
            />
            <Button
              onClick={handleAddOption}
              type="button"
              className="flex items-center justify-center gap-2 bg-white hover:bg-slate-200 p-2 border rounded-sm hover:spin-once"
            >
              <p className="text-black">New</p>
              <FaPlus className="text-green-700" />
            </Button>
          </div>
          <Select
            options={options}
            isMulti
            onChange={(selectedOptions) =>
              setSelectedOpportunities(
                selectedOptions.map((option) => option.value)
              )
            }
            placeholder="Select or add opportunities"
          />
        </div>
      </AppForm>
    </div>
  );
};

export default CreateCourse;
