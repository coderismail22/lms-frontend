// ExampleForm.tsx
import AppForm from "@/components/CustomForm/AppForm";
import AppInput from "@/components/CustomForm/AppInput";
import AppSelect from "@/components/CustomForm/AppSelect";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  code: z.string().min(1, "Code is required"),
  level: z.string().min(1, "Level is required"),
});

const CreateCourse = () => {
  const onSubmit = (data: any) => {
    console.log("Form Data:", data);
  };

  return (
    <AppForm
      schema={schema}
      onSubmit={onSubmit}
      defaultValues={{
        name: "", // Initialize all fields with default values
        description: "",
        instructor: "",
      }}
    >
      <AppInput
        name="name"
        label="Subject Name"
        placeholder="Enter subject name"
      />
      <AppInput
        name="code"
        label="Subject Code"
        placeholder="Enter subject code"
      />
      <AppSelect
        name="level"
        label="Level"
        options={[
          { value: "beginner", label: "Beginner" },
          { value: "intermediate", label: "Intermediate" },
          { value: "advanced", label: "Advanced" },
        ]}
      />
    </AppForm>
  );
};

export default CreateCourse;
