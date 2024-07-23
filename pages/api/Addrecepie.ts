// pages/api/recipes/index.ts
import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../lib/db';
import Recipe from '../models/Recepie';

type Data = {
  message: string;
  data?: any;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === 'POST') {
    const { name, cookingTime, description, ingredients, steps, imageUrl } = req.body;

    // Basic validation
    if (!name || !cookingTime || !description || !ingredients || !steps || !imageUrl) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
      // Connect to the database
      const client = await clientPromise;
      const db = client.db();
      const result = await db.collection('recepie').insertOne({
        name,
        cookingTime,
        description,
        ingredients,
        steps,
        imageUrl
      });
      // Create a new recipe
     
      return res.status(201).json({ message: 'Recipe added successfully.'});
    } catch (error) {
      console.error('Error adding recipe:', error);
      return res.status(500).json({ message: 'Error adding recipe.' });
    }
  } else {
    return res.status(405).json({ message: `Method ${req.method} not allowed.` });
  }
}
