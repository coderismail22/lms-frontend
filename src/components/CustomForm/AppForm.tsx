// AppForm.tsx
import { zodResolver } from "@hookform/resolvers/zod";
import { ReactNode } from "react";
import {
  FormProvider,
  SubmitHandler,
  useForm,
  FieldValues,
  DefaultValues,
} from "react-hook-form"; // Explicitly import DefaultValues
import { z } from "zod";
import { Button } from "@/components/ui/button";

interface AppFormProps<TFormValues extends FieldValues> {
  onSubmit: SubmitHandler<TFormValues>;
  children: ReactNode;
  schema?: z.ZodType<TFormValues>; // Flexible type for schema
  defaultValues?: DefaultValues<TFormValues>;
  buttonText?: string; // Default button text
  submitButtonStyles?: string;
  alignButton?: "center" | "left" | "right"; // Extend prop to include "right"
  // Default to no extra classes // Using imported DefaultValues type
}

const AppForm = <TFormValues extends FieldValues>({
  onSubmit,
  children,
  schema,
  defaultValues,
  buttonText = "Submit",
  submitButtonStyles = "",
  alignButton = "center", // Default alignment
}: AppFormProps<TFormValues>) => {
  const methods = useForm<TFormValues>({
    resolver: schema ? zodResolver(schema) : undefined,
    defaultValues,
  });

  // Conditional styling for button alignment
  const alignmentClass =
    alignButton === "center"
      ? "flex justify-center"
      : alignButton === "left"
      ? "flex justify-start"
      : "flex justify-end";

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        {children}
        <div className={`${alignmentClass} mt-5`}>
          <Button className={submitButtonStyles} type="submit">
            {buttonText}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default AppForm;
