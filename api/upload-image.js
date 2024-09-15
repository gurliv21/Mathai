import { put } from '@vercel/blob';  // Import Vercel Blob Storage
import { GoogleAIFileManager } from "@google/generative-ai/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

const apiKey = process.env.GEMINI_API_KEY;
const blobToken = process.env.BLOB_READ_WRITE_TOKEN; // Fetch the token from environment variables
const fileManager = new GoogleAIFileManager(apiKey);
const genAI = new GoogleGenerativeAI(apiKey);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const form = formidable({
      multiples: true,
      uploadDir: '/tmp', // Use /tmp directory for temporary storage
      keepExtensions: true,
    });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error('Error parsing form:', err);
        res.status(500).json({ error: `Error parsing form: ${err.message}` });
        return;
      }

      try {
        const file = files.image[0];
        const filePath = file.filepath; // Use file.filepath directly
        const fileStream = fs.createReadStream(filePath); // Create a readable stream for the file

        // Upload to Vercel Blob Storage
        const filename = `${Date.now()}${path.extname(file.originalFilename)}`;
        const blob = await put(filename, fileStream, { access: 'public', token: blobToken }); // Include the token

        console.log('Blob URL:', blob.url);

        // Create a reference URL for the uploaded file
        const fileUri = blob.url;

        // Generate content using Google Generative AI
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent([
          "Solve the math problem in the image ",
          {
            fileData: {
              fileUri: fileUri,
              mimeType: file.mimetype,
            },
          },
        ]);

        res.status(200).json({ text: result.response.text() });
      } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).json({ error: `Error processing request: ${error.message}` });
      }
    });
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
