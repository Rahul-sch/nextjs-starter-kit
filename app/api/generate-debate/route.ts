import { NextResponse } from "next/server";
import { generateText } from "@/utils/groq";

export async function POST(req: Request) {
  try {
    const { firstDebater, secondDebater, playbackSpeed } = await req.json();

    const prompt = `Generate a debate script between two people. First debater's perspective: ${firstDebater}. Second debater's perspective: ${secondDebater}. Generate the debate at ${playbackSpeed}x speed. Present arguments for both sides.`;
    const generatedText = await generateText(prompt);

    return NextResponse.json({ text: generatedText });
  } catch (error) {
    console.error("Error in generate-debate API:", error);
    return NextResponse.json(
      { error: "Failed to generate debate" },
      { status: 500 }
    );
  }
}
