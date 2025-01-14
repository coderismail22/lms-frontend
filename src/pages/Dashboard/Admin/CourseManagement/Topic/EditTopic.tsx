import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import AppForm from "@/components/CustomForm/AppForm";
import AppInput from "@/components/CustomForm/AppInput";
import Swal from "sweetalert2";
import axiosInstance from "@/api/axiosInstance";
import AppSelect from "@/components/CustomForm/AppSelect";
import Loader from "@/components/Loader/Loader";

// Fetch topic by ID
const fetchTopicById = async (topicId: string) => {
  const response = await axiosInstance.get(`/topics/${topicId}`);
  return response?.data;
};

// Fetch lessons
const fetchLessons = async () => {
  const response = await axiosInstance.get("/lessons");
  return response?.data?.data;
};

// Update topic function
const updateTopic = async (
  topicId: string,
  data: { name: string; description: string; lessons: string[] }
) => {
  const response = await axiosInstance.patch(
    `/topics/update-topic/${topicId}`,
    data
  );
  return response?.data;
};

const EditTopic = () => {
  const { topicId } = useParams<{ topicId: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Fetch lessons
  const {
    data: lessons,
    isLoading: isLoadingLessons,
    error: lessonsError,
  } = useQuery({
    queryKey: ["lessons"],
    queryFn: fetchLessons,
  });

  // Fetch topic details
  const {
    data: topic,
    isLoading: isLoadingTopic,
    error: topicError,
  } = useQuery({
    queryKey: ["topic", topicId],
    queryFn: () => fetchTopicById(topicId!),
    enabled: !!topicId,
  });

  const mutation = useMutation({
    mutationFn: (data: {
      name: string;
      description: string;
      lessons: string[];
    }) => updateTopic(topicId!, data),
    onSuccess: () => {
      Swal.fire("Updated!", "Topic updated successfully!", "success");
      queryClient.invalidateQueries({ queryKey: ["topics"] });
      navigate("/dashboard/admin/topic-management/all-topics");
    },
    onError: () => {
      Swal.fire("Error!", "Failed to update topic.", "error");
    },
  });

  const onSubmit = (data: {
    name: string;
    description: string;
    lessons: string[];
  }) => {
    mutation.mutate(data);
  };

  if (isLoadingTopic || isLoadingLessons) {
    <Loader />;
  }
  if (topicError || lessonsError) return <p>Something went wrong...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center underline underline-offset-8 text-blue-500">
        Edit Topic
      </h1>
      {topic && (
        <AppForm
          // Add schema validation for updating topics
          onSubmit={onSubmit}
          defaultValues={{
            ...topic?.data,
            lessons: topic?.data?.lessons.map(
              (lesson: string | { _id: string }) =>
                typeof lesson === "string" ? lesson : lesson._id
            ),
          }}
          buttonText="Update Topic"
        >
          {/* Name */}
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
      )}
    </div>
  );
};

export default EditTopic;
