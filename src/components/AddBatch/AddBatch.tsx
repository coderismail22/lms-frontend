import { createBatchSchema } from "@/schemas/batch.schema";
import { TBatchForm } from "@/types/batch.type";
import AppForm from "../CustomForm/AppForm";
import AppInput from "../CustomForm/AppInput";
import AppSelect from "../CustomForm/AppSelect";
import "react-datepicker/dist/react-datepicker.css";
import AppDatePicker from "../CustomForm/AppDatePicker";
import { useState } from "react";
import ImageUpload from "../ImageUpload/ImageUpload";

const AddBatch = () => {
  const [batchImg, setBatchImg] = useState<string>("");
  const onSubmit = (data: TBatchForm) => {
    console.log("clicked", data);
    // console.log("clicked", ...data, date);
    const finalData = {
      ...data,
      batchImg,
    };

    console.log("Form Data:", finalData);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <AppForm
        schema={createBatchSchema}
        onSubmit={onSubmit}
        submitButtonStyles="w-[150px]"
        buttonText="Add Batch"
        alignButton="center"
        defaultValues={{
          batchName: "a",
          courseName: "",
          couponCode: "NA",
          discountPrice: 0,
          maxStudentNumber: 0,
          trainers: [],
          startDate: "",
          endDate: "",
        }}
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Batch Name */}
          <AppInput
            className="w-full"
            name="batchName"
            label="Batch Name"
            placeholder="Enter batch name"
          />
          {/* Image Upload Section */}
          <div>
            <label className="block font-medium text-white">
              Upload Cover Image
            </label>
            <ImageUpload setUploadedImageUrl={setBatchImg} />
            {batchImg === "" && (
              <p className="text-red-500 text-sm">Image is required</p>
            )}
          </div>

          {/* Course Name */}
          <AppSelect
            name="courseName"
            label="Course Name"
            placeholder="Select a course"
            options={[
              { value: "Web Development", label: "Web Development" },
              { value: "Graphic Design", label: "Graphic Design" },
              { value: "Video Editing", label: "Video Editing" },
            ]}
          />

          {/* Coupon Code */}
          <AppInput
            className="w-full"
            name="couponCode"
            label="Coupon Code"
            placeholder="Enter coupon code (optional)"
            isDisabled
          />

          {/* Discount Price */}
          <AppInput
            className="w-full"
            name="discountPrice"
            label="Discount Price"
            placeholder="Enter discount price"
          />

          {/* Max Student Number */}
          <AppInput
            className="w-full"
            name="maxStudentNumber"
            label="Max Students"
            placeholder="Enter max student number"
          />

          {/* Start Date */}
          <AppDatePicker
            name="startDate"
            label="Start Date"
            placeholder="Select start date"
          />

          {/* End Date */}
          <AppDatePicker
            name="endDate"
            label="End Date"
            placeholder="Select end date"
          />

          {/* Trainers*/}
          <AppSelect
            name="trainers"
            label="Trainers"
            placeholder="Select trainers"
            isMulti={true}
            options={[
              { value: "John Doe", label: "John Doe" },
              { value: "Jane Smith", label: "Jane Smith" },
              { value: "Alice Johnson", label: "Alice Johnson" },
            ]}
          />
        </div>
      </AppForm>
    </div>
  );
};

export default AddBatch;
