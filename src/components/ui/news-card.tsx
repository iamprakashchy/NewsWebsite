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
            <Image src="https://img.freepik.com/free-photo/professional-photographer-takes-photos-with-camera-tripod-rocky-peak-sunset_335224-433.jpg?t=st=1740479757~exp=1740483357~hmac=f103ffc9244d0ff26930775082a7840694d9578967703eb3d5419a307e5d0a01&w=1060" alt={title} fill className="object-cover" />
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

