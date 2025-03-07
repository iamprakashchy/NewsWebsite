import { Inter, Jost, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/ui/Navbar/Navbar";
import { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import TopNavbar from "@/components/ui/Navbar/TopNavbar";
import { Footer } from "@/components/ui/Footer/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "News Archive",
  description: "News Archive",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${jost.variable} ${poppins.variable} antialiased`}>
        <ThemeProvider attribute="class">
          <div className="fixed top-0 w-full z-50 flex flex-col">
            <TopNavbar />
            <Navbar />
          </div>
          <main className="pt-36 sm:pt-32">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
