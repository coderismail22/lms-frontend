// AppTextAreaInput.tsx
import { useFormContext } from "react-hook-form";
import { FormControl, FormItem, FormLabel, FormMessage } from "../ui/form";

interface AppTextAreaInputProps {
  name: string;
  label: string;
  placeholder?: string;
  rows?: number;
}

const AppTextAreaInput = ({
  name,
  label,
  placeholder,
  rows = 4,
}: AppTextAreaInputProps) => {
  const { register } = useFormContext();

  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <textarea
          {...register(name)}
          placeholder={placeholder}
          rows={rows}
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none"
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};

export default AppTextAreaInput;
