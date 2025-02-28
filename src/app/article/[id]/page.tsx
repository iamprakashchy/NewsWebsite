import { notFound } from "next/navigation"
import Image from "next/image"
import { formatDistanceToNow } from "date-fns"
import { ArrowLeft, Calendar, Clock, Globe, Tag } from "lucide-react"
import Link from "next/link"

// Types for our article data
interface Article {
  _id: string
  title: string
  content: string
  source: string
  category: string
  published_date: {
    $date: string
  }
  image: string
}

// Function to fetch article by ID
async function getArticle(id: string): Promise<Article | null> {
  try {
    // In a real app, this would be a database call
    // For demo purposes, we're mocking the response
    // Replace this with your actual MongoDB fetch logic

    // Simulating a database fetch delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Return mock data for demo
    return {
      _id: id,
      title:
        "Narendra Modi US visit Highlights: PM Modi departs for India after 'productive and substantive' talks with Trump | Hindustan Times",
      content:
        'Narendra Modi US visit Highlights: US President Donald Trump on Thursday welcomed Prime Minister Narendra Modi to the White House in Washington, D.C., with a firm handshake and a warm hug, referring to him as a "great friend" for many years. The two leaders addressed the media with brief statements and answered several questions before proceeding to key discussions. Their meeting came just hours after Trump announced a new reciprocal tariff policy affecting all US trading partners....\n\nDuring his remarks, Modi congratulated Trump on securing a second term as president and highlighted the strengthening ties between India and the US during Trump\'s first tenure at the White House.\n\nAhead of his meeting with Trump, Modi also held separate discussions with US National Security Advisor Mike Waltz, Director of National Intelligence Tulsi Gabbard, billionaire Elon Musk, and Republican leader Vivek Ramaswamy. His two-day visit to Washington, DC, began on Wednesday evening (Thursday morning India time) after concluding his trip to France.\n\nKey highlights\n• US President Donald Trump announced plans to strengthen trade ties between India and the US, stating that "some wonderful trade deals" were in the works. During his meeting with Prime Minister Narendra Modi, discussions covered expanding bilateral cooperation in key sectors, including defence, energy, and critical technology.\n\n• Highlighting India\'s growing energy needs, Trump said, "We have some very big things to talk about; they (India) are going to be purchasing a lot of our oil and gas (from the US)." He further said, "We have more oil and gas than any other country in the world and they (India) need it, and we have it."\n\n• Praising Modi\'s leadership, Trump said, "He is doing a great job in India and he (PM Modi) and I share a great friendship and we will continue to build on ties between our nations."\n\n• Prime Minister Modi announced that India and the US have set a target of USD 500 billion in bilateral trade by 2030. He said that both nations\' teams would collaborate to finalise a mutually beneficial trade agreement. Speaking at a joint press conference with Trump, Modi noted that while Americans recognise Trump\'s "MAGA" slogan, India is focused on achieving "Viksit Bharat 2047." He also reiterated India\'s commitment to strengthening oil and gas trade to ensure energy security.\n\n• Trump offered India advanced fighter jets as both leaders reaffirmed their commitment to enhancing trade and defence cooperation. Despite the US administration\'s stricter trade policies with other countries, Trump and Modi\'s bond remained strong.\n\n• Modi became the fourth world leader to visit the White House since Trump\'s return. Describing Trump as a friend, Modi referenced his "Make America Great Again" slogan while expressing India\'s commitment to strengthening ties.\n\n• Trump announced the extradition of 26/11 Mumbai terror attack accused Tahawwur Rana to India, stating that he "will face justice." The announcement came during a joint press conference following Modi and Trump\'s bilateral meeting. Last month, the US State Department had confirmed that it was assessing the next steps in Rana\'s extradition.',
      source: "https://www.hindustantimes.com/",
      category: "Prime Ministers",
      published_date: {
        $date: "2025-02-14T00:53:26.000Z",
      },
      image:
        "https://www.hindustantimes.com/ht-img/img/2025/02/14/550x309/pm_modi_donald_trump_1739516129524_1739516129892.jpg",
    }
  } catch (error) {
    console.error("Error fetching article:", error)
    return null
  }
}

// Format the content for better readability
function formatContent(content: string) {
  // Split content by newlines and filter out empty lines
  return content.split("\n").filter((line) => line.trim() !== "")
}

// Format date to readable format
function formatDate(dateString: string) {
  try {
    const date = new Date(dateString)
    return {
      formatted: new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(date),
      relative: formatDistanceToNow(date, { addSuffix: true }),
    }
  } catch (error) {
    return { formatted: "Unknown date", relative: "" }
  }
}

// Estimate reading time
function calculateReadingTime(content: string) {
  const wordsPerMinute = 200
  const words = content.split(/\s+/).length
  const minutes = Math.ceil(words / wordsPerMinute)
  return minutes
}

export default async function ArticlePage({ params }: { params: { id: string } }) {
  const article = await getArticle(params.id)

  if (!article) {
    notFound()
  }

  const formattedContent = formatContent(article.content)
  const date = formatDate(article.published_date.$date)
  const readingTime = calculateReadingTime(article.content)

  return (
    <main className="min-h-screen bg-white">
      {/* Navigation bar */}
      <nav className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
        <div className="container flex items-center justify-between px-4 py-4 mx-auto">
          <Link href="/" className="flex items-center gap-2 text-gray-800 transition-colors hover:text-gray-600">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Home</span>
          </Link>
          <div className="text-sm font-medium text-gray-500">{article.category}</div>
        </div>
      </nav>

      {/* Article header */}
      <header className="container px-4 py-8 mx-auto mt-4 md:py-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap items-center gap-3 mb-4 text-sm text-gray-600">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              <time dateTime={article.published_date.$date} title={date.formatted}>
                {date.relative}
              </time>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              <span>{readingTime} min read</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Globe className="w-4 h-4" />
              <a href={article.source} target="_blank" rel="noopener noreferrer" className="hover:underline">
                Source
              </a>
            </div>
            <div className="flex items-center gap-1.5">
              <Tag className="w-4 h-4" />
              <span>{article.category}</span>
            </div>
          </div>

          <h1 className="mb-6 text-3xl font-bold leading-tight text-gray-900 md:text-4xl lg:text-5xl">
            {article.title}
          </h1>
        </div>
      </header>

      {/* Featured image */}
      <div className="container px-4 mx-auto mb-8">
        <div className="relative max-w-4xl mx-auto overflow-hidden rounded-xl aspect-video">
          <Image src={article.image || "/placeholder.svg"} alt={article.title} fill priority className="object-cover" />
        </div>
      </div>

      {/* Article content */}
      <article className="container px-4 mx-auto mb-16">
        <div className="max-w-3xl mx-auto prose prose-lg prose-gray lg:prose-xl">
          {formattedContent.map((paragraph, index) => {
            // Check if paragraph is a bullet point
            if (paragraph.startsWith("•")) {
              return (
                <div key={index} className="flex gap-2 my-2">
                  <span className="text-gray-400">•</span>
                  <p className="mt-0">{paragraph.substring(1).trim()}</p>
                </div>
              )
            }

            // Check if paragraph is a heading (Key highlights)
            if (paragraph.startsWith("Key highlights")) {
              return (
                <h2 key={index} className="mt-8 mb-4 text-2xl font-bold">
                  {paragraph}
                </h2>
              )
            }

            // Regular paragraph
            return <p key={index}>{paragraph}</p>
          })}
        </div>
      </article>

      {/* Footer */}
      <footer className="py-8 mt-auto bg-gray-100">
        <div className="container px-4 mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
              <div>
                <h3 className="mb-1 text-lg font-semibold text-gray-900">Share this article</h3>
                <div className="flex gap-3">
                  <button className="p-2 text-gray-700 transition-colors bg-white rounded-full hover:bg-gray-200">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                    </svg>
                  </button>
                  <button className="p-2 text-gray-700 transition-colors bg-white rounded-full hover:bg-gray-200">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </button>
                  <button className="p-2 text-gray-700 transition-colors bg-white rounded-full hover:bg-gray-200">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        fillRule="evenodd"
                        d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-gray-500">Source: {article.source}</span>
                <span className="text-sm text-gray-500">Published: {date.formatted}</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}

