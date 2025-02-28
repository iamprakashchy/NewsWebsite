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
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">{title}</h2>
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

