import TrendingArea from "@/components/Home/TrendingArea";
import StorySection from "@/components/Home/StorySection";
import Hero from "@/components/Home/Hero";
import { Card, CardContent } from "@/components/ui/Card";
import Image from "next/image";
import { CategorySection } from "@/components/ui/category-section";
import { NewsCard } from "@/components/ui/news-card";
import Test from "@/components/Test";
export default function Home() {
  return (
    <section>
      <Hero />
      <Test />
      <TrendingArea />
      <StorySection />
      <div className="min-h-screen bg-background">
        <main className="container px-4 py-6 mx-auto space-y-8">
          {/* Hero Section */}
          <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="md:col-span-2 lg:col-span-2 overflow-hidden">
              <CardContent className="p-0">
                <div className="relative aspect-[16/9]">
                  <Image
                    src="https://img.freepik.com/free-photo/professional-photographer-takes-photos-with-camera-tripod-rocky-peak-sunset_335224-433.jpg?t=st=1740479757~exp=1740483357~hmac=f103ffc9244d0ff26930775082a7840694d9578967703eb3d5419a307e5d0a01&w=1060"
                    alt="Featured news"
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 p-6 text-white">
                    <span className="px-2 py-1 text-xs font-medium bg-primary rounded-full">Breaking News</span>
                    <h1 className="mt-4 text-2xl font-bold md:text-3xl lg:text-4xl">
                      Global Leaders Gather for Climate Summit
                    </h1>
                    <p className="mt-2 text-sm md:text-base opacity-90">
                      World leaders meet to discuss urgent climate action and set new environmental goals
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <div className="grid gap-6">
              <NewsCard
                category="Technology"
                title="AI Breakthrough: New Model Shows Human-like Learning"
                image="https://img.freepik.com/free-photo/professional-photographer-takes-photos-with-camera-tripod-rocky-peak-sunset_335224-433.jpg?t=st=1740479757~exp=1740483357~hmac=f103ffc9244d0ff26930775082a7840694d9578967703eb3d5419a307e5d0a01&w=1060"
              />
              <NewsCard
                category="Politics"
                title="Key Legislation Passes in Historic Vote"
                image="https://img.freepik.com/free-photo/professional-photographer-takes-photos-with-camera-tripod-rocky-peak-sunset_335224-433.jpg?t=st=1740479757~exp=1740483357~hmac=f103ffc9244d0ff26930775082a7840694d9578967703eb3d5419a307e5d0a01&w=1060"
              />
            </div>
          </section>

          {/* Top Leaders Section */}
          <CategorySection
            title="Top Leaders"
            viewAllLink="/leaders"
          />

          {/* Top Actors Section */}
          <CategorySection
            title="Entertainment"
            viewAllLink="/entertainment"
          />

          {/* Politics Section */}
          <CategorySection
            title="Politics"
            viewAllLink="/politics"
          />

          {/* Prime Ministers Section */}
          <CategorySection
            title="Prime Ministers"
            viewAllLink="/category/prime-ministers"
            category="Prime Ministers"
          />
        </main>
      </div>
    </section>
  );
}