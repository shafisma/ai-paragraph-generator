import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY);

export async function POST(request) {
  const { topic, wordCount } = await request.json();

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro"});
    const prompt = `Write a paragraph about ${topic} in approximately ${wordCount} words.`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const paragraph = response.text();

    return NextResponse.json({ paragraph });
  } catch (error) {
    console.error('Gemini AI error:', error);
    return NextResponse.json({ error: 'An error occurred while generating the paragraph.' }, { status: 500 });
  }
}