"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation, Autoplay } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";
import ViewAllButton from "../ui/ViewAllButton";
import { useEffect, useState } from "react";
import Loader from "../ui/Loader";
interface TrendingItem {
  _id: string;
  title: string;
  content: string;
  category: string;
  published_date: string;
  source: string;
  image: string;
}

const TrendingArea = () => {
  const [articles, setArticles] = useState<TrendingItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch("/api/articles", {
          next: {
            revalidate: 300,
          },
        });
        const data = await response.json();
        setArticles(data);
      } catch (error) {
        console.error("Error fetching articles:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (isLoading) {
    return (
      <section className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <div className="h-8 w-48 bg-gray-200 animate-pulse rounded"></div>
          <div className="h-8 w-24 bg-gray-200 animate-pulse rounded"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((item) => (
            <div key={item} className="border rounded-lg p-4">
              <div className="aspect-[16/10] w-full bg-gray-200 animate-pulse rounded-lg mb-4"></div>
              <div className="space-y-2">
                <div className="h-4 w-1/4 bg-gray-200 animate-pulse rounded"></div>
                <div className="h-6 w-3/4 bg-gray-200 animate-pulse rounded"></div>
                <div className="h-4 w-full bg-gray-200 animate-pulse rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }
  return (
    <section className="py-8">
      <div className="container">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Trending News</h2>
          <div className="flex items-center gap-4">
            <ViewAllButton
              href="/stories"
              text="View All"
              variant="default"
              size="md"
            />
          </div>
        </div>

        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          navigation={{
            prevEl: ".swiper-button-prev",
            nextEl: ".swiper-button-next",
          }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          className="trending-carousel"
        >
          {articles.map((article) => (
            <SwiperSlide key={article._id}>
              <article className="group border border-gray-200 p-4 rounded-lg overflow-hidden">
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg mb-4">
                  <Link href={`/articles/${article._id}`}>
                    <Image
                      src={article.image || "/fallback-image.jpg"}
                      alt={article.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </Link>
                  <span className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 text-xs font-medium rounded-sm">
                    {article.category}
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span>{article.category}</span>
                    <span>•</span>
                    <time>
                      {new Date(article.published_date).toLocaleDateString()}
                    </time>
                  </div>
                  <h3 className="text-xl font-bold hover:text-primary transition-colors line-clamp-2">
                    <Link href={`/articles/${article._id}`}>
                      {article.title}
                    </Link>
                  </h3>
                  <p className="text-gray-600 line-clamp-2 text-sm">
                    {article.content}
                  </p>
                </div>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default TrendingArea;
