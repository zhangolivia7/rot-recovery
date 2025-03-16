import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { prompt } = await req.json();

  const apiKey = process.env.OPENAI_API_KEY; // Store this in .env.local
  if (!apiKey) return NextResponse.json({ error: "Missing API key" }, { status: 500 });

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [{ role: "system", content: "You are an expert at productivity scheduling." },
                   { role: "user", content: prompt }],
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    return NextResponse.json({ schedule: data.choices[0].message.content });
  } catch (error) {
    return NextResponse.json({ error: "Failed to generate schedule" }, { status: 500 });
  }
}