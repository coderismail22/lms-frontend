import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import AppForm from "@/components/CustomForm/AppForm";
import AppInput from "@/components/CustomForm/AppInput";
import Swal from "sweetalert2";
import axiosInstance from "@/api/axiosInstance";
import AppSelect from "@/components/CustomForm/AppSelect";
import { updateSubjectSchema } from "@/schemas/subject.schema";
import Loader from "@/components/Loader/Loader";

const fetchSubjectById = async (subjectId: string) => {
  const response = await axiosInstance.get(`subjects/get-subject/${subjectId}`);
  return response?.data;
};

const fetchTopics = async () => {
  const response = await axiosInstance.get("/topics");
  console.log("look subjects here", response?.data?.data);
  return response?.data?.data;
};

const updateSubject = async (
  subjectId: string,
  data: { name: string; description: string; topics: string[] }
) => {
  const response = await axiosInstance.patch(
    `subjects/update-subject/${subjectId}`,
    data
  );
  return response?.data;
};

const EditSubject = () => {
  const { subjectId } = useParams<{ subjectId: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Fetch topics
  const {
    data: topics,
    isLoading: isLoadingTopics,
    error: topicsError,
  } = useQuery({
    queryKey: ["topics"],
    queryFn: fetchTopics,
  });

  // Fetch subjects details
  const {
    data: subject,
    isLoading: isLoadingSubject,
    error: subjectError,
  } = useQuery({
    queryKey: ["subject", subjectId],
    queryFn: () => fetchSubjectById(subjectId!),
    enabled: !!subjectId,
  });

  const mutation = useMutation({
    mutationFn: (data: {
      name: string;
      description: string;
      topics: string[];
    }) => updateSubject(subjectId!, data),
    onSuccess: () => {
      Swal.fire("Updated!", "Subject updated successfully!", "success");
      queryClient.invalidateQueries({ queryKey: ["subjects"] });
      navigate("/dashboard/admin/subject-management/all-subjects");
    },
    onError: (error) => {
      console.log(error);
      Swal.fire("Error!", "Failed to update subject.", "error");
    },
  });

  const onSubmit = (data: {
    name: string;
    description: string;
    topics: string[];
  }) => {
    console.log(data);
    mutation.mutate(data);
  };

  if (isLoadingSubject || isLoadingTopics) {
    <Loader />;
  }
  if (subjectError || topicsError) return <p>Something went wrong...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center underline underline-offset-8 text-blue-500">
        Edit Subject
      </h1>
      {subject && (
        <AppForm
          schema={updateSubjectSchema}
          onSubmit={onSubmit}
          defaultValues={{
            ...subject?.data,
            // Keep `subjects` as string[] for default values
            topics: subject?.data?.topics.map(
              (subject: string | { _id: string }) =>
                typeof subject === "string" ? subject : subject._id
            ),
          }}
          buttonText="Update Subject"
        >
          {/* Name */}
          <AppInput
            name="name"
            label="Subject Name"
            placeholder="Enter subject name"
          />
          {/* Description */}
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
      )}
    </div>
  );
};

export default EditSubject;
