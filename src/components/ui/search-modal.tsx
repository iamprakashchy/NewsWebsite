"use client"

import { Search } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/Button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/Dialog"
import { Input } from "@/components/ui/Input"

export function SearchModal() {
  const [search, setSearch] = useState("")

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Search className="h-5 w-5" />
          <span className="sr-only">Search</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Search</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Input placeholder="Search articles..." value={search} onChange={(e) => setSearch(e.target.value)} />
          {search && (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">Search results for &quot;{search}&quot;</p>
              {/* Add search results here */}
              <div className="text-sm">No results found.</div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

