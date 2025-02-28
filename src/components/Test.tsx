import Link from "next/link"
import Image from "next/image"

export default function Home() {
  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="container mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-center md:text-4xl">News Magazine</h1>
          <p className="mt-2 text-center text-gray-600">Your source for the latest news and updates</p>
        </header>

        <div className="grid gap-8">
          <section>
            <h2 className="mb-4 text-2xl font-bold">Featured Article</h2>
            <Link
              href="/article/2b3b5fdd-6748-423a-9ca8-f60d6559394b"
              className="block overflow-hidden transition-transform duration-300 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md hover:-translate-y-1"
            >
              <div className="relative w-full aspect-video">
                <Image
                  src="https://www.hindustantimes.com/ht-img/img/2025/02/14/550x309/pm_modi_donald_trump_1739516129524_1739516129892.jpg"
                  alt="PM Modi and President Trump"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <div className="mb-2 text-sm font-medium text-blue-600">Prime Ministers</div>
                <h3 className="mb-2 text-xl font-bold text-gray-900">
                  Narendra Modi US visit Highlights: PM Modi departs for India after 'productive and substantive' talks
                  with Trump
                </h3>
                <p className="text-gray-700">
                  US President Donald Trump on Thursday welcomed Prime Minister Narendra Modi to the White House in
                  Washington, D.C., with a firm handshake and a warm hug, referring to him as a "great friend" for many
                  years...
                </p>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-sm text-gray-500">February 14, 2025</span>
                  <span className="text-sm font-medium text-blue-600">Read more →</span>
                </div>
              </div>
            </Link>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold">Latest News</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* Sample articles - in a real app, these would be dynamically generated */}
              {[1, 2, 3].map((i) => (
                <Link
                  key={i}
                  href="/article/2b3b5fdd-6748-423a-9ca8-f60d6559394b"
                  className="block overflow-hidden transition-transform duration-300 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md hover:-translate-y-1"
                >
                  <div className="relative w-full aspect-video">
                    <Image
                      src={`/placeholder.svg?height=200&width=400&text=Article ${i}`}
                      alt={`Article ${i}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <div className="mb-2 text-sm font-medium text-blue-600">Category</div>
                    <h3 className="mb-2 text-lg font-bold text-gray-900">Sample Article Title {i}</h3>
                    <p className="text-sm text-gray-700">
                      This is a sample article description that would typically summarize the content...
                    </p>
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-sm text-gray-500">February 14, 2025</span>
                      <span className="text-sm font-medium text-blue-600">Read more →</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}

