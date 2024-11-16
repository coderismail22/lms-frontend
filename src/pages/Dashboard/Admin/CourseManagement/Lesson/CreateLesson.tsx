import AppForm from "@/components/CustomForm/AppForm";
import AppInput from "@/components/CustomForm/AppInput";
import AppSelect from "@/components/CustomForm/AppSelect";
import { createLessonSchema } from "@/schemas/lesson.schema";
import { TLessonForm } from "@/types/lesson.type";

const CreateLesson = () => {
  const onSubmit = (data: TLessonForm) => {
    console.log(data);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <AppForm
        schema={createLessonSchema}
        onSubmit={onSubmit}
        submitButtonStyles=""
        buttonText="Create Lesson"
        defaultValues={{
          name: "",
          description: "",
          type: "",
          content: "",
        }}
      >
        {/* Name */}
        <AppInput
          className="w-full"
          name="name"
          label="Lesson Name"
          placeholder="Enter lesson name"
        />
        {/* Description */}
        <AppInput
          className="w-full"
          name="description"
          label="Description"
          placeholder="Enter lesson description"
        />
        {/* Type */}
        <AppSelect
          name="type"
          label="Content Type"
          placeholder="Select a content type"
          options={[{ label: "Video", value: "video" }]}
        />
        {/* Content */}
        {/* TODO: Video, Assignment, Quiz, Post */}
        <AppInput
          className="w-full"
          name="content"
          label="Content"
          placeholder="Enter content link"
        />
      </AppForm>
    </div>
  );
};

export default CreateLesson;
