"use client";

import { useEffect, useState } from "react";
import { NewsCard } from "@/components/ui/news-card"
import ViewAllButton from "./ViewAllButton"
import Loader from "./Loader";

interface Article {
    _id: string;
    title: string;
    content: string;
    source: string;
    category: string;
    published_date: Date;
    image: string;
}

interface CategorySectionProps {
    title: string
    viewAllLink: string
    category?: string
}

export function CategorySection({ title, viewAllLink, category }: CategorySectionProps) {
    const [articles, setArticles] = useState<Article[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await fetch('/api/articles');
                if (!response.ok) throw new Error('Failed to fetch articles');
                const data = await response.json();

                // Filter articles by category if provided
                const filteredArticles = category
                    ? data.filter((article: Article) => article.category === category)
                    : data;

                setArticles(filteredArticles.slice(0, 4)); // Limit to 4 articles
            } catch (error) {
                console.error('Error fetching articles:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchArticles();
    }, [category]);

    return (
        <section className="py-8">
            <div className="flex items-center justify-between mb-8">
                <div className="relative">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">
                        {title}
                    </h2>
                    <div className="absolute -bottom-3 left-0 w-1/4 h-1 bg-primary rounded-full"></div>
                </div>
                <ViewAllButton
                    href={viewAllLink}
                    text="View All"
                    variant="default"
                    size="md"
                />
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {isLoading ? (
                    <Loader />
                ) : (
                    articles.map((article) => (
                        <NewsCard
                            key={article._id.toString()}
                            category={article.category}
                            title={article.title}
                            image={article.image}
                        />
                    ))
                )}
            </div>
        </section>
    )
}

