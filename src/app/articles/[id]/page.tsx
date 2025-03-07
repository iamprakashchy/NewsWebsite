"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import {
  Eye,
  Clock,
  Calendar,
  User,
  Tag,
} from "lucide-react";
import RelatedArticles from "@/components/Articles/RelatedArticles";
import ArticleActions from '@/components/Articles/ArticleActions';
import SocialShare from "@/components/Articles/SocialShare";
import AdPlaceholder from "@/components/Ads/AdPlaceholder";
import ArticleContent from "@/components/Articles/ArticleContent";
import { Skeleton } from "@/components/ui/skeleton";
import NewsletterSignup from "@/components/Articles/NewsletterSignup";
import TrendingArticles from "@/components/Articles/TrendingArticles";

interface Article {
  _id: string;
  title: string;
  content: string;
  category: string;
  published_date: string;
  source: string;
  image: string;
  author?: string;
  readTime?: number;
  views?: number;
  slug?: string;
  excerpt?: string;
  tags?: string[];
}

const ArticleSkeleton = () => (
  <div className="container mx-auto px-4 py-8">
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-8 space-y-6">
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-12 w-3/4" />
        <div className="flex gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-4 w-24" />
          ))}
        </div>
        <Skeleton className="aspect-video w-full rounded-lg" />
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-4 w-full" />
          ))}
        </div>
      </div>
      <div className="lg:col-span-4">
        <Skeleton className="h-64 w-full rounded-lg" />
      </div>
    </div>
  </div>
);

export default function ArticlePage() {
  const { id } = useParams();
  const [article, setArticle] = useState<Article | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        if (!id) {
          throw new Error("Article ID is required");
        }

        const response = await fetch(`/api/articles/${id}`, {
          cache: "no-store",
        });
        if (!response.ok) {
          throw new Error('Failed to fetch article');
        }
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to fetch article");
        }

        setArticle(data);
        setError(null);
      } catch (error) {
        console.error("Error fetching article:", error);
        setError(
          error instanceof Error ? error.message : "Failed to fetch article"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  if (isLoading) {
    return <ArticleSkeleton />;
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-destructive">Error</h1>
          <p className="text-muted-foreground">{error}</p>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold">Article Not Found</h1>
          <p className="text-muted-foreground">
            The requested article could not be found.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Top Ad Banner */}
      <AdPlaceholder
        className="w-full mb-6 mx-auto max-w-7xl"
        location="article_top"
        height="96px"
      />

      <article className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-8">
            {/* Article Header */}
            <header className="mb-8">
              <div className="flex items-center gap-2 text-sm text-primary mb-4">
                <Tag className="w-4 h-4" />
                <span className="font-jost text-sm hover:text-primary/80 transition-colors">
                  {article.category}
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-inter mb-6 tracking-tight">
                {article.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{article.author || "News Archive"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <time className="font-inter text-sm">
                    {new Date(article.published_date).toLocaleDateString()}
                  </time>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span className="font-inter text-sm">{article.readTime || "5"} min read</span>
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  <span className="font-inter text-sm">{article.views || "1,234"} views</span>
                </div>
              </div>

              {/* Featured Image */}
              <div className="relative aspect-video w-full rounded-lg overflow-hidden mb-8 shadow-lg">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 50vw"
                />
              </div>
            </header>

            {/* Article Content */}
            <ArticleContent content={article.content} />

            {/* Article Actions */}
            <ArticleActions
              articleId={article._id}
              title={article.title}
              slug={article.slug}
              className="mt-8"
            />

            {/* Inline Ad */}
            <AdPlaceholder
              className="w-full my-8"
              location="article_inline"
              height="128px"
            />

            {/* Related Articles */}
            <RelatedArticles
              category={article.category}
              currentId={article._id}
            />
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-8">
            {/* Sticky Sidebar */}
            <div className="sticky top-24 space-y-8">
              {/* Social Share Widget */}
              <SocialShare article={article} />

              {/* Sidebar Ad */}
              <AdPlaceholder
                className="w-full"
                location="article_sidebar"
                height="400px"
              />

              {/* Newsletter Signup */}
              <NewsletterSignup />

              {/* Trending Articles */}
              <TrendingArticles articles={[]} />
            </div>
          </aside>
        </div>
      </article>
    </div>
  );
}
