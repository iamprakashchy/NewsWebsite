import TrendingArea from "@/components/Home/TrendingArea";
import StorySection from "@/components/Home/StorySection";
import Hero from "@/components/Home/Hero";
import NewsGrid from "@/components/News/NewsGrid";
export default function Home() {
  return (
    <section>
      <Hero />
      <TrendingArea />
      <StorySection />
      <NewsGrid />
    </section>
  );
}