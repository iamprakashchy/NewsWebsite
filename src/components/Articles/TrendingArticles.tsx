import { Card } from "@/components/ui/Card";
import Link from "next/link";
import Image from "next/image";
import { TrendingUp } from "lucide-react";

interface TrendingArticle {
  id: string;
  title: string;
  imageUrl: string;
  category: string;
  readTime: string;
}

interface TrendingArticlesProps {
  articles: TrendingArticle[];
}

export default function TrendingArticles({ articles }: TrendingArticlesProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold">Trending Articles</h3>
      </div>
      <div className="space-y-4">
        {articles.map((article) => (
          <Link key={article.id} href={`/articles/${article.id}`}>
            <Card className="p-3 hover:shadow-md transition-shadow">
              <div className="flex gap-4">
                <div className="relative w-20 h-20">
                  <Image
                    src={article.imageUrl}
                    alt={article.title}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
                <div className="flex-1">
                  <span className="text-xs font-medium text-primary">
                    {article.category}
                  </span>
                  <h4 className="text-sm font-medium line-clamp-2">
                    {article.title}
                  </h4>
                  <span className="text-xs text-muted-foreground">
                    {article.readTime} read
                  </span>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
} 