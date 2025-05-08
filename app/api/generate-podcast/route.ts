import { NextResponse } from "next/server";
import { generateText } from "@/utils/groq";

export async function POST(req: Request) {
  try {
    const { topic, language, voiceGender, playbackSpeed } = await req.json();

    const prompt = `Generate a podcast script about ${topic}. Use ${language} language with a ${voiceGender} voice at ${playbackSpeed}x speed. Keep it concise and engaging.`;
    const generatedText = await generateText(prompt);

    return NextResponse.json({ text: generatedText });
  } catch (error) {
    console.error("Error in generate-podcast API:", error);
    return NextResponse.json(
      { error: "Failed to generate podcast" },
      { status: 500 }
    );
  }
}
