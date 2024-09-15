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
const fileManager = new GoogleAIFileManager(apiKey);
const genAI = new GoogleGenerativeAI(apiKey);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const form = formidable({
      uploadDir: path.join(process.cwd(), 'tmp'),
      keepExtensions: true,
      filename: (name, ext, _path, _form) => `${Date.now()}${path.extname(name)}`, // Ensure unique filenames
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

        console.log('File Path:', filePath);

        if (!fs.existsSync(filePath)) {
          throw new Error(`File not found: ${filePath}`);
        }

        const uploadResult = await fileManager.uploadFile(filePath, {
          mimeType: file.mimetype,
          displayName: file.originalFilename,
        });

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent([
          "Solve the math problem in the image ",
          {
            fileData: {
              fileUri: uploadResult.file.uri,
              mimeType: uploadResult.file.mimeType,
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
