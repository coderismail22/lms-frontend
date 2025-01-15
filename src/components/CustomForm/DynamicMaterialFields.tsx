/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FaPlus } from "react-icons/fa";

interface DynamicMaterialsFieldProps {
  /** The label to display above the input fields. */
  label: string;
  /** The field name used by React Hook Form (e.g. "materials"). */
  name: string;
}

const DynamicMaterialsField: React.FC<DynamicMaterialsFieldProps> = ({
  label,
  name,
}) => {
  const { watch, setValue } = useFormContext();

  // "materials" is our array of { name: string, link: string } from the form
  const materials = watch(name) || [];

  // Local states for new (name, link) inputs
  const [newName, setNewName] = React.useState("");
  const [newLink, setNewLink] = React.useState("");

  // Add a new { name, link } to the array
  const handleAddMaterial = () => {
    if (!newName.trim() || !newLink.trim()) return;

    const updated = [
      ...materials,
      { name: newName.trim(), link: newLink.trim() },
    ];
    setValue(name, updated); // Update form state
    setNewName("");
    setNewLink("");
  };

  // Remove one material by index
  const handleRemoveMaterial = (index: number) => {
    const updated = materials.filter((_: any, i: number) => i !== index);
    setValue(name, updated);
  };

  // Live edit for name/link fields (if you want inline editing)
  const handleEditMaterial = (
    index: number,
    field: "name" | "link",
    value: string
  ) => {
    const updated = materials.map((material: any, i: number) => {
      if (i === index) {
        return { ...material, [field]: value };
      }
      return material;
    });
    setValue(name, updated);
  };

  return (
    <div className="my-4 w-full">
      <label className="font-semibold mb-2 block">{label}</label>

      {/* Inputs for adding a new material */}
      <div className="flex gap-2 mb-4">
        <Input
          type="text"
          placeholder="Material name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Material link"
          value={newLink}
          onChange={(e) => setNewLink(e.target.value)}
        />
        <Button
          type="button"
          onClick={handleAddMaterial}
          className="flex items-center gap-2  bg-green-600"
        >
          <FaPlus />
          Add
        </Button>
      </div>

      {/* Existing materials list */}
      {materials.map((material: any, index: number) => (
        <div key={index} className="flex gap-2 mb-2 items-center">
          <Input
            type="text"
            value={material.name}
            onChange={(e) => handleEditMaterial(index, "name", e.target.value)}
          />
          <Input
            type="text"
            value={material.link}
            onChange={(e) => handleEditMaterial(index, "link", e.target.value)}
          />
          <Button
            variant="destructive"
            type="button"
            onClick={() => handleRemoveMaterial(index)}
          >
            Remove
          </Button>
        </div>
      ))}
    </div>
  );
};

export default DynamicMaterialsField;
