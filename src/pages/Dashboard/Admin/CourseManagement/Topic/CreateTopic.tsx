import AppForm from "@/components/CustomForm/AppForm";
import AppInput from "@/components/CustomForm/AppInput";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/api/axiosInstance";
import Swal from "sweetalert2";
import AppSelect from "@/components/CustomForm/AppSelect";
import { useNavigate } from "react-router-dom";
import Loader from "@/components/Loader/Loader";

// Fetch lessons instead of topics
const fetchLessons = async () => {
  const response = await axiosInstance.get("/lessons");
  console.log("Lessons fetched:", response?.data?.data);
  return response?.data?.data;
};

// Create topic function
const createTopic = async (topicData: {
  name: string;
  description: string;
  lessons: string[];
}) => {
  const response = await axiosInstance.post("/topics/create-topic", topicData);
  return response.data;
};

const CreateTopic = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // Fetch lessons
  const {
    data: lessons,
    isLoading: isLoadingLessons,
    error: lessonsError,
  } = useQuery({
    queryKey: ["lessons"],
    queryFn: fetchLessons,
  });

  // Mutation for creating a topic
  const mutation = useMutation({
    mutationFn: createTopic,
    onSuccess: () => {
      Swal.fire("Success!", "Topic created successfully!", "success");
      queryClient.invalidateQueries({ queryKey: ["topics"] });
      navigate("/dashboard/admin/topic-management/all-topics");
    },
    onError: (err) => {
      console.error(err);
      Swal.fire("Error!", "Failed to create topic. Please try again.", "error");
    },
  });

  const onSubmit = (data: {
    name: string;
    description: string;
    lessons: string[];
  }) => {
    console.log("Creating topic with data:", data);
    mutation.mutate({ ...data });
  };

  if (isLoadingLessons) {
    <Loader />;
  }

  if (lessonsError) return <p>Something went wrong...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center underline underline-offset-8 text-blue-500">Create Topic</h1>
      <AppForm
        // schema={createTopicSchema}
        onSubmit={onSubmit}
        defaultValues={{ name: "", description: "", lessons: [] }}
        buttonText="Create Topic"
      >
        {/* Topic Name */}
        <AppInput
          name="name"
          label="Topic Name"
          placeholder="Enter topic name"
        />

        {/* Description */}
        <AppInput
          name="description"
          label="Description"
          placeholder="Enter description"
        />

        {/* Lessons */}
        <AppSelect
          name="lessons"
          label="Lessons"
          placeholder="Select lessons"
          isMulti={true}
          options={lessons?.map((lesson: { _id: string; name: string }) => ({
            value: lesson._id,
            label: lesson.name,
          }))}
        />
      </AppForm>
    </div>
  );
};

export default CreateTopic;
