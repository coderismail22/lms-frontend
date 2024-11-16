// AppSearchableSelect.tsx
import { Controller, useFormContext } from "react-hook-form";
import Select from "react-select";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface Option {
  value: string;
  label: string;
}

interface AppSearchableSelectProps {
  name: string;
  label: string;
  options: Option[];
  placeholder?: string;
}

const AppSelect = ({
  name,
  label,
  options,
  placeholder,
}: AppSearchableSelectProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div className="bg-blue-50">
              <Select
                {...field}
                options={options}
                placeholder={placeholder || "Select an option"}
                onChange={(option) => field.onChange(option?.value)}
                value={
                  options.find((option) => option.value === field.value) || null
                }
                isClearable
                isSearchable
                classNamePrefix="react-select"
              />
            </div>
          </FormControl>
          {error && <FormMessage>{error.message}</FormMessage>}
        </FormItem>
      )}
    />
  );
};

export default AppSelect;
