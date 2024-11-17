import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "../ui/input";

interface EditCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: { name: string; _id: string } | null; // Only for categories
  onSave: (updatedCategory: { name: string; _id: string }) => void;
  isLoading?: boolean;
}

const EditCategoryModal: React.FC<EditCategoryModalProps> = ({
  isOpen,
  onClose,
  category,
  onSave,
  isLoading = false,
}) => {
  const [name, setName] = useState(category?.name || "");

  useEffect(() => {
    if (category) {
      setName(category.name); // Pre-fill the input when the modal opens
    }
  }, [category]);

  const handleSubmit = () => {
    if (category && name.trim()) {
      onSave({ ...category, name }); // Pass the updated category
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Category</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <label htmlFor="name" className="block text-sm font-medium">
            Category Name
          </label>
          <Input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <DialogFooter>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? "Saving..." : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditCategoryModal;
