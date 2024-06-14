import { GoogleGenerativeAI } from "@google/generative-ai";

// Access your API key as an environment variable
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { topic, wordCount } = req.body;

    try {
      // For text-only input, use the gemini-pro model
      const model = genAI.getGenerativeModel({ model: "gemini-pro"});

      const prompt = `Write a paragraph about ${topic} in approximately ${wordCount} words.`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const paragraph = response.text();

      res.status(200).json({ paragraph });
    } catch (error) {
      console.error('Gemini AI error:', error);
      res.status(500).json({ error: 'An error occurred while generating the paragraph.' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}