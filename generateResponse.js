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

async function run() {
  try {
    const chatSession = model.startChat({
      generationConfig,
      history: [],
    });

    const input = 'capital of usa'; // Replace this with your input
    const result = await chatSession.sendMessage(input);
    console.log(result.response.text());
  } catch (error) {
    console.error('Error generating response:', error);
  }
}

run();
