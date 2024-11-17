import { useEffect, useState } from "react";
import { TCategory, categoryColumns } from "./categoryColumns";
import axiosInstance from "@/api/axiosInstance";
import CategoryTable from "./CategoryTable";
import EditCategoryModal from "@/components/EditCategoryModal/EditCategoryModal";
import Swal from "sweetalert2";

export default function Categories() {
  const [categories, setCategories] = useState<TCategory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Modal states
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<TCategory | null>(
    null
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleUpdateClick = (category: TCategory) => {
    setSelectedCategory(category); // Pass the selected category to the modal
    setIsEditModalOpen(true);
  };

  const handleSave = async (updatedCategory: TCategory) => {
    setIsSubmitting(true);
    try {
      console.log(updatedCategory._id);
      await axiosInstance.patch(
        `/categories/update-category/${updatedCategory._id}`,
        {
          name: updatedCategory.name,
        }
      );
      setCategories((prev) =>
        prev.map((cat) =>
          cat._id === updatedCategory._id ? updatedCategory : cat
        )
      );
      Swal.fire("Updated!", "The category has been updated.", "success");
      setIsEditModalOpen(false); // Close the modal
    } catch (err) {
      console.error("Error updating category:", err);
      Swal.fire("Error!", "Failed to update category.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get("/categories");
        const allCategories = response.data.data;
        console.log(allCategories);
        setCategories(allCategories);
      } catch (err) {
        console.error("API Request Error:", err);
        setError("Failed to load courses.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Something went wrong...</div>;
  }

  const handleDelete = (categoryId: string) => {
    console.log("Deleting category with ID:", categoryId);
    // Add logic to delete the category (e.g., API call).
  };

  return (
    <div className="container mx-auto py-10">
      {categories && (
        <CategoryTable
          columns={categoryColumns(handleUpdateClick, handleDelete)}
          data={categories}
        />
      )}
      {/* Edit Modal */}
      <EditCategoryModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        category={selectedCategory}
        onSave={handleSave}
        isLoading={isSubmitting}
      />
    </div>
  );
}
