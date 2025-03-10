"use client";

import { useSelectedLayoutSegments } from "next/navigation";
import { ThemeProvider } from "next-themes";
import TopNavbar from "@/components/ui/Navbar/TopNavbar";
import Navbar from "@/components/ui/Navbar/Navbar";
import { Footer } from "@/components/ui/Footer/Footer";

interface MainLayoutWrapperProps {
  children: React.ReactNode;
  interClass: string;
  jostClass: string;
  poppinsClass: string;
}

export default function MainLayoutWrapper({
  children,
  interClass,
  jostClass,
  poppinsClass,
}: MainLayoutWrapperProps) {
  const segments = useSelectedLayoutSegments();
  const isAdminRoute = segments[0] === "admin";

  return (
    <body className={`${interClass} ${jostClass} ${poppinsClass} antialiased`}>
      <ThemeProvider attribute="class">
        {!isAdminRoute && (
          <div className="fixed top-0 w-full z-50 flex flex-col">
            <TopNavbar />
            <Navbar />
          </div>
        )}
        <main className={isAdminRoute ? "" : "pt-36 sm:pt-32"}>{children}</main>
        {!isAdminRoute && <Footer />}
      </ThemeProvider>
    </body>
  );
}
