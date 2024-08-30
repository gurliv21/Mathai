import express from 'express';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';
import cors from 'cors';  // Keep this import

dotenv.config();

const app = express();
const port = 3000;

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

app.use(cors());  // Enable CORS for all routes
app.use(express.json());

app.post('/gemini', async (req, res) => {
  try {
    const chat = model.startChat({
      history: req.body.history,
    });

    const result = await chat.sendMessage(req.body.message);
    const response = await result.response;
    const text = response.text();
        
  

    res.send(text);
  } catch (error) {
    console.error('Error processing request:', error.message);
    res.status(500).send('Internal Server Error: ' + error.message);
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
