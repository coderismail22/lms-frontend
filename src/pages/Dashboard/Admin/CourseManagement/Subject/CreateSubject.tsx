import AppForm from "@/components/CustomForm/AppForm";
import AppInput from "@/components/CustomForm/AppInput";
import { createSubjectSchema } from "@/schemas/subject.schema";
import { TSubjectForm } from "@/types/subject.type";

const CreateSubject = () => {
  const onSubmit = (data: TSubjectForm) => {
    console.log(data);
  };
  return (
    <div className="max-w-4xl mx-auto p-6">
      <AppForm
        schema={createSubjectSchema}
        onSubmit={onSubmit}
        submitButtonStyles=""
        buttonText="Create Subject"
        defaultValues={{
          name: "",
          description: "",
        }}
      >
        <AppInput
          className="w-full"
          name="name"
          label="Subject Name"
          placeholder="Enter subject name"
        />
        <AppInput
          className="w-full"
          name="description"
          label="Description"
          placeholder="Enter subject description"
        />
      </AppForm>
    </div>
  );
};

export default CreateSubject;
