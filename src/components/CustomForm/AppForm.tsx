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
  defaultValues?: DefaultValues<TFormValues>; // Using imported DefaultValues type
}

const AppForm = <TFormValues extends FieldValues>({
  onSubmit,
  children,
  schema,
  defaultValues,
}: AppFormProps<TFormValues>) => {
  const methods = useForm<TFormValues>({
    resolver: schema ? zodResolver(schema) : undefined,
    defaultValues,
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        {children}
        <Button type="submit">Submit</Button>
      </form>
    </FormProvider>
  );
};

export default AppForm;
