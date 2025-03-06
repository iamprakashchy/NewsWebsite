"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';

interface RelatedArticlesProps {
  category: string;
  currentId: string;
}

interface Article {
  _id: string;
  title: string;
  image: string;
}


export default function RelatedArticles({ category, currentId }: RelatedArticlesProps) {
  const [articles, setArticles] = useState<Article[]>([]);


  useEffect(() => {
    const fetchRelatedArticles = async () => {
      try {
        const response = await fetch(`/api/articles?category=${category}&exclude=${currentId}&limit=3`);
        if (!response.ok) throw new Error('Failed to fetch related articles');
        const data = await response.json();
        setArticles(data);
      } catch (error) {
        console.error('Error fetching related articles:', error);
      }
    };

    fetchRelatedArticles();
  }, [category, currentId]);

  if (articles.length === 0) return null;
  
  return (
    <section className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Related Articles</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <Card key={article._id} className="overflow-hidden">
            <Link href={`/articles/${article._id}`}>
              <div className="relative h-48">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold mt-2 line-clamp-2">{article.title}</h3>
              </div>
            </Link>
          </Card>
        ))}
      </div>
    </section>
  );
}