"use client";

import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useState, useEffect } from "react";

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (category: {
    categoryName: string;
    isActive: boolean;
    keywords: string[];
  }) => void;
  initialData?: {
    categoryName: string;
    isActive: boolean;
    keywords: string[];
  };
}

export default function CategoryModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}: CategoryModalProps) {
  const [formData, setFormData] = useState<{
    categoryName: string;
    isActive: boolean;
    keywords: string[];
  }>({
    categoryName: "",
    isActive: true,
    keywords: [],
  });

  const [keywordInput, setKeywordInput] = useState("");

  useEffect(() => {
    if (initialData) {
      setFormData({
        categoryName: initialData.categoryName,
        isActive: initialData.isActive,
        keywords: initialData.keywords || [],
      });
    } else {
      setFormData({
        categoryName: "",
        isActive: true,
        keywords: [],
      });
    }
  }, [initialData]);

  const handleAddKeyword = () => {
    if (keywordInput.trim()) {
      setFormData({
        ...formData,
        keywords: [...formData.keywords, keywordInput.trim()],
      });
      setKeywordInput("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddKeyword();
    }
  };

  const handleRemoveKeyword = (index: number) => {
    setFormData({
      ...formData,
      keywords: formData.keywords.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-background p-6 rounded-lg shadow-lg max-w-md w-full max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">
            {initialData ? "Edit Category" : "Create Category"}
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="hover:bg-muted"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
          <div className="space-y-4 flex-1 overflow-y-auto pr-2">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                value={formData.categoryName}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    categoryName: e.target.value,
                  })
                }
                className="w-full p-2 border rounded-md bg-background"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Keywords</label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={keywordInput}
                  onChange={(e) => setKeywordInput(e.target.value)}
                  onKeyDown={handleKeyPress}
                  className="flex-1 p-2 border rounded-md bg-background"
                  placeholder="Add keyword"
                />
                <Button
                  type="button"
                  onClick={handleAddKeyword}
                  variant="primary"
                >
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 max-h-[200px] overflow-y-auto border rounded-md p-2 bg-muted/30">
                {formData.keywords.map((keyword, index) => (
                  <span
                    key={index}
                    className="bg-secondary text-secondary-foreground px-2 py-1 rounded-md flex items-center gap-1 font-light"
                  >
                    {keyword}
                    <button
                      type="button"
                      onClick={() => handleRemoveKeyword(index)}
                      className="hover:text-destructive transition-colors"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.isActive}
                onChange={(e) =>
                  setFormData({ ...formData, isActive: e.target.checked })
                }
                className="rounded border-border text-primary focus:ring-ring"
              />
              <label className="text-sm font-medium">Active</label>
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-6 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              {initialData ? "Update" : "Create"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
