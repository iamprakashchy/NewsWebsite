import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const { id } = params;

        // Validate ObjectId format
        if (!ObjectId.isValid(id)) {
            return NextResponse.json(
                { error: "Invalid article ID format" },
                { status: 400 }
            );
        }

        const client = await clientPromise;
        const db = client.db("newsarchives");
        
        const article = await db.collection("articles").findOne({
            _id: new ObjectId(id)
        });

        if (!article) {
            return NextResponse.json(
                { error: "Article not found" },
                { status: 404 }
            );
        }

        // Set cache control headers for better performance
        const response = NextResponse.json(article);
        response.headers.set('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=30');
        
        return response;
    } catch (error) {
        console.error("Error fetching article:", error);
        return NextResponse.json(
            { 
                error: "Failed to fetch article",
                details: process.env.NODE_ENV === 'development' ? error : undefined
            },
            { status: 500 }
        );
    }
} 