import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: "Missing API key" }, { status: 500 });
    }

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

    // Debug: Log the response to check if it's JSON
    console.log("API Response:", data);

    // Ensure the response contains a valid schedule
    if (!data.choices || !data.choices[0]?.message?.content) {
      return NextResponse.json({ error: "Invalid response from OpenAI" }, { status: 500 });
    }

    return NextResponse.json({ schedule: data.choices[0].message.content });
  } catch (error) {
    console.error("API Request Error:", error);
    return NextResponse.json({ error: "Failed to generate schedule" }, { status: 500 });
  }
}
