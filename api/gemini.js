import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: 'gemini-1.5-flash',
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: 'application/json',
};

// The serverless function handler
export default async function handler(req, res) {
  if (!apiKey) {
    return res.status(500).send('API key not found. Please set GEMINI_API_KEY in your .env file.');
  }

  if (req.method === 'POST') {
    try {
      const chat = model.startChat({
        history: req.body.history,
      });

      const result = await chat.sendMessage(req.body.message);
      const response = await result.response;
      const text = response.text();

      return res.status(200).send(text);
    } catch (error) {
      console.error('Error processing request:', error.message);
      return res.status(500).send('Internal Server Error: ' + error.message);
    }
  } else {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
}
