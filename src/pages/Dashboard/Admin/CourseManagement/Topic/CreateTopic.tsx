import AppForm from "@/components/CustomForm/AppForm";
import AppInput from "@/components/CustomForm/AppInput";
import { createTopicSchema } from "@/schemas/topic.schema";
import { TTopicForm } from "@/types/topic.type";

const CreateTopic = () => {
  const onSubmit = (data: TTopicForm) => {
    console.log(data);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <AppForm
        schema={createTopicSchema}
        onSubmit={onSubmit}
        submitButtonStyles=""
        buttonText="Create Topic"
        defaultValues={{
          name: "",
          description: "",
        }}
      >
        <AppInput
          className="w-full"
          name="name"
          label="Topic Name"
          placeholder="Enter topic name"
        />
        <AppInput
          className="w-full"
          name="description"
          label="Description"
          placeholder="Enter topic description"
        />
      </AppForm>
    </div>
  );
};

export default CreateTopic;
