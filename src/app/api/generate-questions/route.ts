import { NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY || "",
});

const clarifyResearchGoals = async (topic: string) => {
    const prompt = `Given the research topic "${topic}", generate exactly 3 clarifying questions to help narrow down the research scope.

Return ONLY a JSON array of strings with no additional text or formatting. Example format:
["question 1?", "question 2?", "question 3?"]

Focus on:
- Specific aspects of interest
- Required depth/complexity level
- Particular perspectives or sources`;

    try {
        const completion = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: [
                {
                    role: "user",
                    content: prompt
                }
            ],
            temperature: 0.7,
            max_tokens: 500,
        });

        const text = completion.choices[0]?.message?.content || "";
        const cleaned = text.trim().replace(/```json\n?/g, '').replace(/```\n?/g, '');
        const questions = JSON.parse(cleaned);
        
        return Array.isArray(questions) ? questions : [questions];
    } catch (error) {
        console.error("Error generating questions:", error);
        throw error;
    }
}

export async function POST(req: Request) {
    try {
        const { topic } = await req.json();
        console.log("Topic:", topic);

        const questions = await clarifyResearchGoals(topic);
        console.log("Generated questions:", questions);

        return NextResponse.json({
            success: true,
            questions: questions
        });
    } catch (error) {
        console.error("Error in POST:", error);
        return NextResponse.json({
            success: false,
            error: error instanceof Error ? error.message : "Failed to generate questions"
        }, { status: 500 });
    }
}