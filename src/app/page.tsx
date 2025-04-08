import TrendingArea from "@/components/Home/TrendingArea";
import StorySection from "@/components/Home/StorySection";
import Hero from "@/components/Home/Hero";
import { CategorySection } from "@/components/ui/category-section";
import { getBlogPosts } from "@/lib/blog/api";
import { BlogPost } from "@/lib/blog/type";
import BlogSection from "@/components/Home/BlogSection";
export default async function Home() {
  let blogPosts: BlogPost[] = [];
  try {
    blogPosts = await getBlogPosts();
  } catch (error) {
    console.error("Failed to fetch blog posts:", error);
  }
  return (
    <section>
      <Hero />
      <TrendingArea />
      <StorySection />
      <div className="min-h-screen bg-background">
        <div className="container px-4 py-6 mx-auto space-y-8">
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
        </div>
      </div>
      <BlogSection posts={blogPosts} />
    </section>
  );
}