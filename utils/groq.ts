import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY!,
});

export async function generateText(prompt: string): Promise<string> {
  try {
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "llama3-8b-8192",
      temperature: 0.7,
      max_tokens: 3, // Limiting to 3 words for testing
      top_p: 1,
      stream: false,
    });

    return completion.choices[0]?.message?.content || "No response generated";
  } catch (error) {
    console.error("Error generating text with GROQ:", error);
    throw error;
  }
}
