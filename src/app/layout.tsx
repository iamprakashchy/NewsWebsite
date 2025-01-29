import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/ui/Navbar/Navbar";
import { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import TopNavbar from "@/components/ui/Navbar/TopNavbar";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "IPO Market",
  description: "Professional IT Solutions and Services",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class">
          <div className="fixed top-0 w-full z-50 flex flex-col">
            <TopNavbar />
            <Navbar />
          </div>
          <main className="pt-36 sm:pt-32">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
