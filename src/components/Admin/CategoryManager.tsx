import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/Input";
import { Plus, Pencil, Trash2, Search, Copy } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { toast } from "react-hot-toast";
import CategoryModal from "./CategoryModal";

interface Category {
  _id?: string;
  categoryName: string;
  isActive: boolean;
  keywords: string[];
}

export default function CategoryManager() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/categories");
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Failed to fetch categories");
    }
  };

  const handleCreate = async (categoryData: Omit<Category, "_id">) => {
    try {
      const response = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(categoryData),
      });

      if (!response.ok) throw new Error("Failed to create category");

      const newCategory = await response.json();
      if (!newCategory._id) throw new Error("Invalid response from server");
      setCategories([...categories, newCategory]);
      toast.success("Category created successfully");
      setIsModalOpen(false);
    } catch (error) {
      toast.error("Failed to create category");
      console.error(error);
    }
  };

  const handleUpdate = async (categoryData: Omit<Category, "_id">) => {
    if (!editingCategory?._id) return;

    try {
      const response = await fetch(`/api/categories/${editingCategory._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(categoryData),
      });

      if (!response.ok) throw new Error("Failed to update category");

      const updatedCategory = await response.json();
      setCategories(
        categories.map((cat) =>
          cat._id === editingCategory._id
            ? { ...updatedCategory, _id: editingCategory._id }
            : cat
        )
      );
      toast.success("Category updated successfully");
      setIsModalOpen(false);
      setEditingCategory(null);
    } catch (error) {
      toast.error("Failed to update category");
      console.error(error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this category?"))
      return;

    try {
      const response = await fetch(`/api/categories/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete category");

      setCategories(categories.filter((cat) => cat._id !== id));
      toast.success("Category deleted successfully");
    } catch (error) {
      toast.error("Failed to delete category");
      console.error(error);
    }
  };

  const handleReplicate = async (category: Category) => {
    try {
      const replicaData = {
        categoryName: `${category.categoryName} (Copy)`,
        keywords: [...category.keywords],
        isActive: category.isActive,
      };

      const response = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(replicaData),
      });

      if (!response.ok) throw new Error("Failed to replicate category");

      const newCategory = await response.json();
      setCategories([...categories, newCategory]);
      toast.success("Category replicated successfully");
    } catch (error) {
      toast.error("Failed to replicate category");
      console.error(error);
    }
  };

  const filteredCategories = categories.filter(
    (category) =>
      (category.categoryName?.toLowerCase() || "").includes(
        searchTerm.toLowerCase()
      )
  );

  return (
    <div className="container py-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            type="text"
            placeholder="Search categories..."
            className="pl-10 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button
          onClick={() => {
            setEditingCategory(null);
            setIsModalOpen(true);
          }}
          leftIcon={<Plus className="h-5 w-5" />}
          className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg shadow-md transition-all duration-300 flex items-center gap-2"
        >
          <span>Add Category</span>
        </Button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCategories.map((category) => (
          <Card
            key={category._id}
            className="p-5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="flex flex-col gap-4">
              {/* Header */}
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <h3 className="font-bold text-xl text-gray-900 dark:text-white line-clamp-1">
                    {category.categoryName}
                  </h3>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleReplicate(category)}
                    className="text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                    title="Create copy"
                  >
                    <Copy className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setEditingCategory(category);
                      setIsModalOpen(true);
                    }}
                    className="text-gray-500 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200"
                  >
                    <Pencil className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(category._id!)}
                    className="text-gray-500 hover:text-red-600 dark:hover:text-red-400 transition-colors duration-200"
                  >
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              {/* Keywords */}
              {category.keywords && category.keywords.length > 0 && (
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-foreground dark:text-gray-400 uppercase tracking-wide">
                    Keywords
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {category.keywords.map((keyword, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900 dark:to-indigo-900 text-blue-800 dark:text-blue-200 rounded-full text-xs font-medium shadow-sm hover:shadow-md transition-all duration-200 transform hover:scale-105"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Status */}
              <div className="flex justify-between items-center pt-3 border-t border-gray-200 dark:border-gray-700">
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium shadow-sm ${category.isActive
                    ? "bg-primary text-primary-foreground"
                    : "bg-destructive text-destructive-foreground"
                    }`}
                >
                  {category.isActive ? "Active" : "Inactive"}
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredCategories.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            No categories found. Create one to get started!
          </p>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <CategoryModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditingCategory(null);
          }}
          onSubmit={editingCategory ? handleUpdate : handleCreate}
          initialData={editingCategory || undefined}
        />
      )}
    </div>
  );
}