import Sidebar from "@/components/Admin/Sidebar";
import { Toaster } from "react-hot-toast";

/**
 * AdminLayout Component
 * Provides the layout structure for all admin pages with toast notifications
 */
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex h-screen bg-background">
        {/* Sidebar Navigation */}
        <Sidebar />

        {/* Main Content Area */}
        <main className="p-4">{children}</main>

        {/* Toast Notifications */}
        <Toaster position="top-center" reverseOrder={false} />
      </div>
    </>
  );
}