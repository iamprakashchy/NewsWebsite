import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/Card"

interface NewsCardProps {
  category: string
  title: string
  image: string
}

export function NewsCard({ category, title, image }: NewsCardProps) {
  return (
    <Link href="#">
      <Card className="overflow-hidden transition-shadow hover:shadow-lg">
        <CardContent className="p-0 flex flex-col justify-between">
          <div className="relative aspect-[16/9] flex-1">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover"
            />
          </div>
          <div className="p-4">
            <span className="text-xs font-medium text-primary">{category}</span>
            <h3 className="mt-2 text-lg font-semibold leading-tight">{title}</h3>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

