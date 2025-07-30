import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import geminiHandler from './api/gemini.js';
import uploadImageHandler from './api/upload-image.js';

// Load environment variables
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// API routes
app.post('/api/gemini', geminiHandler);
app.post('/api/upload-image', uploadImageHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 