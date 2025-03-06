"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CategoryManager from "@/components/Admin/CategoryManager";
import KeywordManager from "@/components/Admin/KeywordManager";
import UrlManager from "@/components/Admin/UrlManager";
import { Tag, Globe, Database } from "lucide-react";

export default function ContentManagementPage() {
  const [activeTab, setActiveTab] = useState("categories");

  return (
    <div className="space-y-6 p-4 sm:p-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-2">Content Management</h1>
        <p className="text-muted-foreground">
          Manage your categories, keywords, and source URLs for content scraping.
        </p>
      </div>

      <Tabs
        defaultValue="categories"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
          <TabsTrigger value="categories" className="flex items-center gap-2">
            <Database className="w-4 h-4" />
            <span className="hidden sm:inline">Categories</span>
          </TabsTrigger>
          <TabsTrigger value="keywords" className="flex items-center gap-2">
            <Tag className="w-4 h-4" />
            <span className="hidden sm:inline">Keywords</span>
          </TabsTrigger>
          <TabsTrigger value="urls" className="flex items-center gap-2">
            <Globe className="w-4 h-4" />
            <span className="hidden sm:inline">URLs</span>
          </TabsTrigger>
        </TabsList>

        <div className="mt-6">
          <TabsContent value="categories" className="m-0">
            <CategoryManager />
          </TabsContent>
          <TabsContent value="keywords" className="m-0">
            <KeywordManager />
          </TabsContent>
          <TabsContent value="urls" className="m-0">
            <UrlManager />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
