import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function StoryCircle() {
  return (
    <Link href="#" className="inline-block">
      <div className="space-y-2">
        <Avatar className="w-16 h-16 ring-2 ring-primary ring-offset-2">
          <AvatarImage src="/placeholder.svg?height=64&width=64" />
          <AvatarFallback>ST</AvatarFallback>
        </Avatar>
        <p className="text-xs text-center truncate w-16">Story Title</p>
      </div>
    </Link>
  )
}

