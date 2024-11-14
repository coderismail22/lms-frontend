import { useState } from "react";
import Select from "react-select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FaPlus } from "react-icons/fa";

interface DynamicSelectFieldProps {
  label: string;
  placeholder: string;
  options: { value: string; label: string }[];
  onChange: (selectedValues: string[]) => void;
}

const DynamicSelectField = ({
  label,
  placeholder,
  options,
  onChange,
}: DynamicSelectFieldProps) => {
  const [inputValue, setInputValue] = useState("");
  const [customOptions, setCustomOptions] = useState(options);

  const handleAddOption = () => {
    if (inputValue.trim() !== "") {
      const newOption = { value: inputValue, label: inputValue };
      setCustomOptions((prevOptions) => [...prevOptions, newOption]);
      setInputValue("");
    }
  };

  return (
    <div className="w-full my-4">
      <label>{label}</label>
      <div className="flex gap-2 mb-2">
        <Input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={`Add new ${label.toLowerCase()}`}
          className="border p-2 flex-1"
        />
        <Button
          onClick={handleAddOption}
          type="button"
          className="flex items-center justify-center gap-2 bg-white hover:bg-slate-200 p-2 border rounded-sm"
        >
          <p className="text-black">New</p>
          <FaPlus className="text-green-700" />
        </Button>
      </div>
      <Select
        options={customOptions}
        isMulti
        onChange={(selectedOptions) =>
          onChange(
            selectedOptions ? selectedOptions.map((option) => option.value) : []
          )
        }
        placeholder={placeholder}
      />
    </div>
  );
};

export default DynamicSelectField;
