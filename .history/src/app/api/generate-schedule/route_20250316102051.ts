import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();
    const apiKey = process.env.GROQ_API_KEY;
    const baseUrl = process.env.GROQ_BASE_URL || "https://api.groq.com/openai/v1";

    if (!apiKey) {
      console.error("🚨 Missing Groq API Key!");
      return NextResponse.json({ error: "Missing API key" }, { status: 500 });
    }

    console.log("📨 Sending request to Groq...");
    const response = await fetch(`${baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "llama3-70b-8192", // Use Groq's LLaMA 3 model
        messages: [
          { role: "system", content: "You are a productivity assistant." },
          { role: "user", content: prompt },
        ],
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    console.log("📩 Groq Response:", data);

    if (!data.choices || !data.choices[0]?.message?.content) {
      return NextResponse.json({ error: "Invalid response from Groq" }, { status: 500 });
    }

    return NextResponse.json({ schedule: data.choices[0].message.content });
  } catch (error) {
    console.error("🚨 API Error:", error);
    return NextResponse.json({ error: "Failed to generate schedule" }, { status: 500 });
  }
}
