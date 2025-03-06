"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { Share2, Bookmark, Eye, Clock, Calendar, User, Tag } from 'lucide-react';
import RelatedArticles from '@/components/Articles/RelatedArticles';
// import ArticleActions from '@/components/Articles/ArticleActions=';
import SocialShare from '@/components/Articles/SocialShare';
import AdPlaceholder from '@/components/Ads/AdPlaceholder';
import ArticleContent from '@/components/Articles/ArticleContent';
import { Skeleton } from '@/components/ui/skeleton';

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
}

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
        
        const response = await fetch(`/api/articles/${id}`);
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.error || "Failed to fetch article");
        }
        
        setArticle(data);
        setError(null);
      } catch (error) {
        console.error('Error fetching article:', error);
        setError(error instanceof Error ? error.message : "Failed to fetch article");
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
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
          <p className="text-muted-foreground">The requested article could not be found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Top Ad Banner */}
      <AdPlaceholder className="w-full h-24 mb-6" location="article_top" />

      <article className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-8">
            {/* Article Header */}
            <header className="mb-8">
              <div className="flex items-center gap-2 text-sm text-primary mb-4">
                <Tag className="w-4 h-4" />
                <span>{article.category}</span>
              </div>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                {article.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{article.author || 'Anonymous'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <time>{new Date(article.published_date).toLocaleDateString()}</time>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{article.readTime || '5'} min read</span>
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  <span>{article.views || '1,234'} views</span>
                </div>
              </div>

              {/* Featured Image */}
              <div className="relative aspect-video w-full rounded-lg overflow-hidden mb-8">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </header>

            {/* Article Content */}
            <ArticleContent content={article.content} />

            {/* Article Actions */}
            {/* <ArticleActions articleId={article._id} /> */}

            {/* Inline Ad */}
            <AdPlaceholder className="w-full h-32 my-8" location="article_inline" />

            {/* Related Articles */}
            <RelatedArticles category={article.category} currentId={article._id} />
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-8">
            {/* Sticky Sidebar */}
            <div className="sticky top-24 space-y-8">
              {/* Social Share Widget */}
              <SocialShare article={article} />

              {/* Sidebar Ad */}
              <AdPlaceholder className="w-full h-64" location="article_sidebar" />

              {/* Newsletter Signup */}
              {/* <NewsletterSignup /> */}

              {/* Trending Articles */}
              {/* <TrendingArticles /> */}
            </div>
          </aside>
        </div>
      </article>
    </div>
  );
} 