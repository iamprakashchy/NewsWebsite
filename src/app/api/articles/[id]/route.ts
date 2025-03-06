import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await Promise.resolve(params);

    const client = await clientPromise;
    const db = client.db("newsarchives");

    console.log(`Searching for article with ID: ${id}`);

    // Try to find by ObjectId first if it's a valid ObjectId
    let article = null;
    if (ObjectId.isValid(id)) {
      article = await db.collection("articles").findOne({
        _id: new ObjectId(id),
      });
      console.log(`ObjectId search result: ${article ? "Found" : "Not found"}`);
    }

    // If not found by ObjectId, try to find by UUID in various possible fields
    if (!article) {
      // First try exact field matches
      const query = {
        $or: [{ id: id }, { uuid: id }, { articleId: id }, { slug: id }],
      };
      console.log(
        "Trying exact field matches with query:",
        JSON.stringify(query)
      );
      article = await db.collection("articles").findOne(query);
      console.log(
        `Exact field matches result: ${article ? "Found" : "Not found"}`
      );
    }

    // If still not found, try a more flexible approach with regex for partial matches
    if (!article) {
      // Get a sample article to see its structure
      const sampleArticle = await db.collection("articles").findOne({});
      console.log(
        "Sample article structure:",
        JSON.stringify(
          sampleArticle ? Object.keys(sampleArticle) : "No articles found"
        )
      );

      // If we have a sample, try to find the article by title or content containing the ID
      if (sampleArticle) {
        article = await db.collection("articles").findOne({
          $or: [
            { title: { $regex: id, $options: "i" } },
            { content: { $regex: id, $options: "i" } },
          ],
        });
        console.log(
          `Content search result: ${article ? "Found" : "Not found"}`
        );
      }
    }

    if (!article) {
      // As a fallback, return the most recent article
      console.log("Fallback: returning most recent article");
      article = await db
        .collection("articles")
        .find({})
        .sort({ published_date: -1 })
        .limit(1)
        .next();

      if (!article) {
        return NextResponse.json(
          { error: "No articles found in database" },
          { status: 404 }
        );
      }
    }

    // Set cache control headers for better performance
    const response = NextResponse.json(article);
    response.headers.set(
      "Cache-Control",
      "public, s-maxage=60, stale-while-revalidate=30"
    );

    return response;
  } catch (error) {
    console.error("Error fetching article:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch article",
        details: process.env.NODE_ENV === "development" ? error : undefined,
      },
      { status: 500 }
    );
  }
}
