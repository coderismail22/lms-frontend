import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { TBatchForm } from "@/types/batch.type";
import axiosInstance from "@/api/axiosInstance";
import AppForm from "../CustomForm/AppForm";
import AppInput from "../CustomForm/AppInput";
import AppSelect from "../CustomForm/AppSelect";
import AppDatePicker from "../CustomForm/AppDatePicker";
import ImageUpload from "../ImageUpload/ImageUpload";
import Swal from "sweetalert2";
import { useState } from "react";
import { updateBatchSchema } from "@/schemas/batch.schema";

// Fetch Response Type
type FetchBatchResponse = {
  success: boolean;
  message: string;
  data: TBatchForm; // The `data` field contains the batch details
};
// Fetch a batch by ID
const fetchBatchById = async (batchId: string): Promise<FetchBatchResponse> => {
  const response = await axiosInstance.get(`/batches/${batchId}`);
  return response.data;
};

// Fetch Teachers
const fetchTeachers = async () => {
  const response = await axiosInstance.get("/teachers/");
  return response?.data?.data;
};

// Fetch Courses
const fetchCourses = async () => {
  const response = await axiosInstance.get("/courses/get-all-courses");
  return response?.data?.data;
};

// Update batch function
const updateBatch = async ({
  batchId,
  data,
}: {
  batchId: string;
  data: Partial<TBatchForm>;
}): Promise<void> => {
  await axiosInstance.patch(`/batches/update-batch/${batchId}`, data);
};

const EditBatch = () => {
  const { batchId } = useParams<{ batchId: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [batchImg, setBatchImg] = useState<string>("");

  // Fetch the batch details
  const {
    data: batch,
    isLoading: isLoadingBatch,
    error: batchError,
  } = useQuery({
    queryKey: ["batch", batchId],
    queryFn: () => fetchBatchById(batchId!),
    enabled: !!batchId, // Only fetch if batchId exists
  });

  // Fetch Teachers
  const {
    data: teachers,
    isLoading: isLoadingTeachers,
    error: teacherError,
  } = useQuery({
    queryKey: ["teachers"],
    queryFn: fetchTeachers,
  });

  // Fetch Courses
  const {
    data: courses,
    isLoading: isLoadingCourses,
    error: courseError,
  } = useQuery({
    queryKey: ["courses"],
    queryFn: fetchCourses,
  });

  // Mutation for updating the batch
  const mutation = useMutation({
    mutationFn: ({
      batchId,
      data,
    }: {
      batchId: string;
      data: Partial<TBatchForm>;
    }) => updateBatch({ batchId, data }),
    onSuccess: () => {
      Swal.fire("Updated!", "Batch has been updated successfully.", "success");
      queryClient.invalidateQueries({ queryKey: ["batches"] }); // Invalidate the batches list
      navigate("/dashboard/admin/batch"); // Redirect back to batch list
    },
    // TODO: Make a type for error
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      console.error("Error updating batch:", error);
      Swal.fire("Error!", "Failed to update batch.", "error");
    },
  });

  // Handle form submission
  const onSubmit = (data: Partial<TBatchForm>) => {
    const finalData = { ...data, batchImg: batchImg || batch?.data?.batchImg };
    console.log("hey", finalData);
    mutation.mutate({ batchId: batchId!, data: finalData });
  };

  if (isLoadingBatch || isLoadingTeachers || isLoadingCourses)
    return <p>Loading batch details...</p>;
  if (batchError || teacherError || courseError)
    return <p>Error loading batch details. Please try again.</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Edit Batch</h1>
      {batch && (
        <AppForm
          schema={updateBatchSchema}
          onSubmit={onSubmit}
          defaultValues={batch?.data} // Pass fetched data as default values
          submitButtonStyles="w-[150px]"
          buttonText={mutation?.isPending ? "Saving..." : "Save Changes"}
        >
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Batch Name */}
            <AppInput name="batchName" label="Batch Name" />
            {/* Upload Cover Image */}
            <div>
              <label className="block font-medium text-gray-700">
                Upload Cover Image
              </label>
              <ImageUpload setUploadedImageUrl={setBatchImg} />
            </div>
            {/* Course Name */}
            <AppSelect
              name="courseName"
              label="Course Name"
              options={courses?.map(
                (course: { _id: string; name: string }) => ({
                  value: course._id,
                  label: course.name,
                })
              )}
            />
            {/* Coupon Code */}
            <AppInput name="couponCode" label="Coupon Code" />
            {/* Discount Price */}
            <AppInput name="discountPrice" label="Discount Price" />
            {/* Max Students */}
            <AppInput name="maxStudentNumber" label="Max Students" />
            {/* Start Date */}
            <AppDatePicker name="startDate" label="Start Date" />
            {/* End Date */}
            <AppDatePicker name="endDate" label="End Date" />
            {/* Trainers */}
            <AppSelect
              name="trainers"
              label="Trainers"
              isMulti={true}
              options={teachers.map(
                (teacher: { _id: string; teacherName: string }) => ({
                  value: teacher._id,
                  label: teacher.teacherName,
                })
              )}
            />
          </div>
        </AppForm>
      )}
    </div>
  );
};

export default EditBatch;
