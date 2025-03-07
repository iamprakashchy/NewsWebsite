import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/Card"

interface NewsCardProps {
  category: string
  title: string
  image: string
  date?: string
  excerpt?: string
  readMoreText?: string
}

export function NewsCard({
  category, title, image, readMoreText = "Read More" }: NewsCardProps) {
  return (
    <Link href="#" className="block w-full">
      <Card className="overflow-hidden transition-shadow hover:shadow-lg">
        <CardContent className="p-0 flex flex-col justify-between">
          <div className="relative aspect-[16/9] flex-1">
            <Image
              src={image}
              alt={title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
              priority={false}
              className="object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
          <div className="p-4">
            <span className="text-xs lg:text-sm font-normal font-poppins text-primary">{category}</span>
            <h3 className="text-base sm:text-lg md:text-xl font-semibold leading-tight line-clamp-2">{title}</h3>
            <div className="pt-2">
              <span className="hover:underline decoration-primary underline-offset-4 inline-flex font-inter items-center text-sm font-medium text-primary hover:text-primary/80">
                {readMoreText}
                <svg
                  className="ml-1 h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

