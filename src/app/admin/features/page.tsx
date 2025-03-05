"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { toast } from "react-hot-toast";
import ScrapConfigModal from "@/components/Admin/ScrapConfigModal";
import Loader from "@/components/ui/Loader";

interface ScrapConfig {
  _id?: string;
  category: string;
  keywords: string[];
  sourceUrl: string;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export default function ScrapConfigPage() {
  const [configs, setConfigs] = useState<ScrapConfig[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingConfig, setEditingConfig] = useState<ScrapConfig | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch existing configurations
  useEffect(() => {
    fetchConfigs();
  }, []);

  const fetchConfigs = async () => {
    try {
      const response = await fetch("/api/scrap-config");
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);

      // Ensure each config has keywords array, even if empty
      const sanitizedConfigs = data.map((config: ScrapConfig) => ({
        ...config,
        keywords: config.keywords || [],
      }));

      setConfigs(sanitizedConfigs);
    } catch (error) {
      console.error("Error fetching configs:", error);
      toast.error("Failed to fetch configurations");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateConfig = async (configData: Omit<ScrapConfig, "_id">) => {
    try {
      const response = await fetch("/api/scrap-config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(configData),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);

      setConfigs([...configs, data]);
      toast.success("Configuration created successfully");
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error creating config:", error);
      toast.error("Failed to create configuration");
    }
  };

  const handleUpdateConfig = async (configData: ScrapConfig) => {
    try {
      const response = await fetch(`/api/scrap-config/${configData._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(configData),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);

      setConfigs(
        configs.map((config) => (config._id === configData._id ? data : config))
      );
      toast.success("Configuration updated successfully");
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error updating config:", error);
      toast.error("Failed to update configuration");
    }
  };

  const handleDeleteConfig = async (id: string) => {
    if (!confirm("Are you sure you want to delete this configuration?")) return;

    try {
      const response = await fetch(`/api/scrap-config/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete");

      setConfigs(configs.filter((config) => config._id !== id));
      toast.success("Configuration deleted successfully");
    } catch (error) {
      console.error("Error deleting config:", error);
      toast.error("Failed to delete configuration");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader />
      </div>
    );
  }
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center space-x-5">
        <h1 className="text-2xl font-bold">Scraping Configuration</h1>
        <Button
          variant="primary"
          onClick={() => {
            setEditingConfig(null);
            setIsModalOpen(true);
          }}
          leftIcon={<Plus className="w-5 h-5" />}
        >
          Add New Configuration
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {configs.map((config) => (
          <Card key={config._id} className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-semibold text-lg">{config.category}</h3>
                <p className="text-sm text-gray-500">{config.sourceUrl}</p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setEditingConfig(config);
                    setIsModalOpen(true);
                  }}
                >
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => config._id && handleDeleteConfig(config._id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex flex-wrap gap-2">
                {Array.isArray(config.keywords) &&
                  config.keywords.map((keyword, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 text-sm bg-gray-100 dark:bg-gray-700 rounded-full"
                    >
                      {keyword}
                    </span>
                  ))}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm">Status:</span>
                <span
                  className={`px-2 py-1 text-sm rounded-full ${
                    config.isActive
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {config.isActive ? "Active" : "Inactive"}
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <ScrapConfigModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingConfig(null);
        }}
        onSubmit={editingConfig ? handleUpdateConfig : handleCreateConfig}
        initialData={editingConfig}
      />
    </div>
  );
}
