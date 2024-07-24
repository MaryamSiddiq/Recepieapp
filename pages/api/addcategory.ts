import type { NextApiRequest, NextApiResponse } from 'next';
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
      return res.status(500).json({ error: 'Failed to upload image' });
    }
    next();
  });
};

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    return new Promise<void>((resolve) => {
      uploadMiddleware(req as any, res, async () => {
        const { name } = req.body;
        const image = (req as any).file;

        if (!name || !image) {
          res.status(400).json({ error: 'Name and image are required' });
          resolve();
          return;
        }

        const inputPath = path.join(process.cwd(), 'public/uploads/', image.filename);
        const outputPath = path.join(process.cwd(), 'public/uploads/', `compressed-${image.filename}`);

        try {
          // Use sharp to handle different formats dynamically
          const imageBuffer = await sharp(inputPath).toBuffer();
          
          // Get the image format from the buffer
          const { format } = await sharp(imageBuffer).metadata();

          await sharp(imageBuffer)
            .resize(300)
            .toFormat('jpg', { quality: 80 }) // Convert all images to JPEG format
            .toFile(outputPath);

          await fs.unlink(inputPath);

          const compressedImageUrl = `/uploads/compressed-${image.filename}`;

          const client = await clientPromise;
          const db = client.db();
          const newCategory = {
            name,
            imageUrl: compressedImageUrl,
          };

          await db.collection('categories').insertOne(newCategory);

          res.status(200).json({ success: true, category: newCategory });
        } catch (error) {
          console.error('Error processing the image:', error);
          res.status(500).json({ error: 'Failed to upload and compress image' });
        }
        resolve();
      });
    });
  } else if (req.method === 'GET') {
    try {
      const client = await clientPromise;
      const db = client.db();
      const categories = await db.collection('categories').find({}).toArray();
      res.status(200).json(categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
      res.status(500).json({ error: 'Failed to fetch categories' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};

export default handler;
