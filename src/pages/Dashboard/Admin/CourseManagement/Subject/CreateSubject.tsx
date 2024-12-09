import AppForm from "@/components/CustomForm/AppForm";
import AppInput from "@/components/CustomForm/AppInput";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/api/axiosInstance";
import Swal from "sweetalert2";
import AppSelect from "@/components/CustomForm/AppSelect";
import { createSubjectSchema } from "@/schemas/subject.schema";
import { useNavigate } from "react-router-dom";
import Loader from "@/components/Loader/Loader";

const fetchTopics = async () => {
  const response = await axiosInstance.get("/topics");
  console.log("look subjects here", response?.data?.data);
  return response?.data?.data;
};
const createSubject = async (subjectData: {
  name: string;
  description: string;
  topics: string[];
}) => {
  const response = await axiosInstance.post(
    "/subjects/create-subject",
    subjectData
  );
  return response.data;
};

const CreateSubject = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  // Fetch topics
  const {
    data: topics,
    isLoading: isLoadingTopics,
    error: topicsError,
  } = useQuery({
    queryKey: ["topics"],
    queryFn: fetchTopics,
  });

  const mutation = useMutation({
    mutationFn: createSubject,
    onSuccess: () => {
      Swal.fire("Success!", "Subject created successfully!", "success");
      queryClient.invalidateQueries({ queryKey: ["subjects"] });
    },
    onError: (err) => {
      console.log(err);
      Swal.fire(
        "Error!",
        "Failed to create subject. Please try again.",
        "error"
      );
    },
  });

  const onSubmit = (data: {
    name: string;
    description: string;
    topics: string[];
  }) => {
    mutation.mutate({ ...data });
    navigate("/dashboard/admin/subject-management/all-subjects");
  };

  if (isLoadingTopics) {
    <Loader />;
  }

  if (topicsError) return <p>Something went wrong...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center underline underline-offset-8 text-blue-500">Create Subject</h1>
      <AppForm
        schema={createSubjectSchema}
        onSubmit={onSubmit}
        defaultValues={{ name: "", description: "" }}
        buttonText="Create Subject"
      >
        <AppInput
          name="name"
          label="Subject Name"
          placeholder="Enter subject name"
        />
        <AppInput
          name="description"
          label="Description"
          placeholder="Enter description"
        />

        {/* Topics */}
        <AppSelect
          name="topics"
          label="Topics"
          placeholder="Select topics"
          isMulti={true}
          options={topics?.map((topic: { _id: string; name: string }) => ({
            value: topic._id,
            label: topic.name,
          }))}
        />
      </AppForm>
    </div>
  );
};

export default CreateSubject;
