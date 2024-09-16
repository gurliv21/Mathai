import { GoogleAIFileManager } from "@google/generative-ai/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';
import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';


// Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const fileManager = new GoogleAIFileManager(process.env.GEMINI_API_KEY);

// Fetch the image from the URL
const mediaPath = 'https://zoae7vgyjznrjcgo.public.blob.vercel-storage.com/1726426380164-h9UWshaZbj3LStZMydFivwNFXaV23J.jpeg';
const response = await fetch(mediaPath);
const imageBuffer = await response.arrayBuffer();

// Write the buffer to a temporary file
const tempFilePath = path.join(__dirname, 'tempImage.jpg');
fs.writeFileSync(tempFilePath, Buffer.from(imageBuffer));

// Upload the file
const uploadResult = await fileManager.uploadFile(tempFilePath, {
  mimeType: "image/jpeg",
  displayName: "Test Image",
});

// View the response
console.log(`Uploaded file ${uploadResult.file.displayName} as: ${uploadResult.file.uri}`);

// Generate content using the Gemini model
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
const result = await model.generateContent([
  "Tell me about this image.",
  {
    fileData: {
      fileUri: uploadResult.file.uri,
      mimeType: uploadResult.file.mimeType,
    },
  },
]);

console.log(result.response.text());

// Clean up the temporary file after uploading
fs.unlinkSync(tempFilePath);
