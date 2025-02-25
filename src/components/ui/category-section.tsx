
import { NewsCard } from "@/components/ui/news-card"
import ViewAllButton from "./ViewAllButton"

interface CategorySectionProps {
    title: string
    viewAllLink: string
    items: Array<{
        title: string
        image: string
        category: string
    }>
}

export function CategorySection({ title, viewAllLink, items }: CategorySectionProps) {
    return (
        <section className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
                <ViewAllButton
                    href="/stories"
                    text="View All"
                    variant="default"
                    size="md"
                />
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {items.map((item, i) => (
                    <NewsCard key={i} category={item.category} title={item.title} image={item.image} />
                ))}
            </div>
        </section>
    )
}

