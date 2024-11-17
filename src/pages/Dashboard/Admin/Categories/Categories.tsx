import { useEffect, useState } from "react";
import { TCategory, categoryColumns } from "./categoryColumns";
import axiosInstance from "@/api/axiosInstance";
import CategoryTable from "./CategoryTable";

export default function Categories() {
  const [categories, setCategories] = useState<TCategory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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

  const handleUpdate = (category: TCategory) => {
    console.log("Updating category:", category);
    // Add logic to open a form/modal for editing the category.
  };

  const handleDelete = (categoryId: string) => {
    console.log("Deleting category with ID:", categoryId);
    // Add logic to delete the category (e.g., API call).
  };

  return (
    <div className="container mx-auto py-10">
      {categories && (
        <CategoryTable
          columns={categoryColumns(handleUpdate, handleDelete)}
          data={categories}
        />
      )}
    </div>
  );
}
