// AppInput.tsx
import { Controller, useFormContext } from "react-hook-form";
import { FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface AppInputProps {
  name: string;
  label: string;
  placeholder?: string;
}

const AppInput = ({ name, label, placeholder }: AppInputProps) => {
  const { control } = useFormContext();

  if (!control) {
    console.error("Form context is missing. Ensure that AppInput is rendered within AppForm.");
    return null;
  }

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input {...field} placeholder={placeholder} />
          </FormControl>
          {error && <FormMessage>{error.message}</FormMessage>}
        </FormItem>
      )}
    />
  );
};

export default AppInput;
