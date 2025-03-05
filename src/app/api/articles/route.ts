import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { z } from "zod";

/**
 * Validation schema for article data
 */
const articleSchema = z.object({
  title: z.string()
    .min(1, "Title is required")
    .max(200, "Title cannot exceed 200 characters"),
  content: z.string()
    .min(1, "Content is required")
    .max(50000, "Content is too long"),
  category: z.string()
    .min(1, "Category is required"),
  published_date: z.string()
    .or(z.date())
    .transform(val => new Date(val)),
  source_url: z.string().url("Invalid source URL").optional(),
  author: z.string().optional(),
});

type ArticleData = z.infer<typeof articleSchema>;

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("newsarchives");

    const articles = await db.collection("articles")
      .find({})
      .sort({ published_date: -1 })
      .project({
        title: 1,
        content: 1,
        category: 1,
        published_date: 1,
        source_url: 1,
        author: 1,
        createdAt: 1,
        updatedAt: 1
      })
      .toArray();

    return NextResponse.json(articles);
  } catch (error) {
    console.error("Error fetching articles:", error);
    return NextResponse.json(
      { 
        error: "Failed to fetch articles",
        details: process.env.NODE_ENV === 'development' ? error : undefined
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Validate input data against schema
    const validatedData: ArticleData = articleSchema.parse(data);
    
    const client = await clientPromise;
    const db = client.db("newsarchives");
    
    // Add timestamps
    const articleWithTimestamps = {
      ...validatedData,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    const result = await db.collection("articles").insertOne(articleWithTimestamps);
    
    if (!result.acknowledged) {
      throw new Error("Failed to insert article");
    }
    
    return NextResponse.json({
      success: true,
      id: result.insertedId,
      message: "Article created successfully"
    }, { status: 201 });
  } catch (error) {
    console.error("Error creating article:", error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          error: "Validation failed", 
          details: error.errors.map(err => ({
            field: err.path.join('.'),
            message: err.message
          }))
        },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { 
        error: "Failed to create article",
        details: process.env.NODE_ENV === 'development' ? error : undefined
      },
      { status: 500 }
    );
  }
} 