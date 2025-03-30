import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      console.error("🚨 Missing OpenAI API Key!");
      return NextResponse.json({ error: "Missing API key" }, { status: 500 });
    }

    console.log("📨 Sending request to OpenAI...");
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
          { role: "system", content: "You are a productivity assistant." },
          { role: "user", content: prompt },
        ],
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    console.log("📩 OpenAI Response:", data);

    if (!data.choices || !data.choices[0]?.message?.content) {
      return NextResponse.json({ error: "Invalid response from OpenAI" }, { status: 500 });
    }

    return NextResponse.json({ schedule: data.choices[0].message.content });
  } catch (error) {
    console.error("🚨 API Error:", error);
    return NextResponse.json({ error: "Failed to generate schedule" }, { status: 500 });
  }
}
