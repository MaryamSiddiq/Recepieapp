import { NextApiRequest, NextApiResponse } from 'next';
import multer from 'multer';
import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';
import clientPromise from '../lib/db'; // Adjust path as necessary

const upload = multer({ dest: 'public/uploads/' });

const uploadMiddleware = (req: NextApiRequest, res: NextApiResponse, next: () => void) => {
  upload.single('image')(req as any, res as any, (err) => {
    if (err) {
      console.error('Multer upload error:', err);
      return res.status(500).json({ message: 'Failed to upload image' });
    }
    next();
  });
};

export const config = {
  api: {
    bodyParser: false,
  },
};

type Data = {
  message: string;
  data?: any;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === 'POST') {
    return new Promise<void>((resolve) => {
      uploadMiddleware(req as any, res, async () => {
        const { name, cookingTime, description, ingredients, steps, category } = req.body;
        const image = (req as any).file;

        // Basic validation
        if (!name || !cookingTime || !description || !ingredients || !steps || !category || !image) {
          console.log('Validation failed:', { name, cookingTime, description, ingredients, steps, category, image });
          res.status(400).json({ message: 'All fields are required.' });
          resolve();
          return;
        }

        const inputPath = path.join(process.cwd(), 'public/uploads/', image.filename);
        const outputPath = path.join(process.cwd(), 'public/uploads/', `compressed-${image.filename}`);

        try {
          // Compress the image using sharp
          await sharp(inputPath)
            .resize(300)
            .toFormat('jpeg', { quality: 80 })
            .toFile(outputPath);

          // Remove the original image file
          await fs.unlink(inputPath);

          const compressedImageUrl = `/uploads/compressed-${image.filename}`;

          // Connect to the database
          const client = await clientPromise;
          const db = client.db();
          await db.collection('recepies').insertOne({
            name,
            cookingTime,
            description,
            ingredients: JSON.parse(ingredients),
            steps: JSON.parse(steps),
            imageUrl: compressedImageUrl,
            category,
          });

          res.status(201).json({ message: 'Recipe added successfully.' });
        } catch (error) {
          console.error('Error processing the image:', error);
          res.status(500).json({ message: 'Error processing the image.' });
        }
        resolve();
      });
    });
  } else if (req.method === 'GET') {
    try {
      const client = await clientPromise;
      const db = client.db();
      const recipes = await db.collection('recepies').find({}).toArray();
      res.status(200).json({ message: 'Recipes fetched successfully', data: recipes });
    } catch (error) {
      console.error('Error fetching recipes:', error);
      res.status(500).json({ message: 'Error fetching recipes' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
