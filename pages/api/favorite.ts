// pages/api/favorite.ts
import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../lib/db'; // Adjust path as necessary

type Data = {
  message: string;
  data?: any;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const client = await clientPromise;
  const db = client.db();

  if (req.method === 'POST') {
    const { recipe } = req.body;

    if (!recipe) {
      return res.status(400).json({ message: 'Recipe is required.' });
    }

    try {
      const existingRecipe = await db.collection('favorites').findOne({ name: recipe.name });

      if (existingRecipe) {
        await db.collection('favorites').deleteOne({ name: recipe.name });
        res.status(200).json({ message: 'Recipe removed from favorites.' });
      } else {
        await db.collection('favorites').insertOne(recipe);
        res.status(201).json({ message: 'Recipe added to favorites.' });
      }
    } catch (error) {
      console.error('Error handling favorite recipe:', error);
      res.status(500).json({ message: 'Error handling favorite recipe.' });
    }
  } else if (req.method === 'GET') {
    try {
      const favorites = await db.collection('favorites').find({}).toArray();
      res.status(200).json({ message: 'Fetched favorite recipes.', data: favorites });
    } catch (error) {
      console.error('Error fetching favorite recipes:', error);
      res.status(500).json({ message: 'Error fetching favorite recipes.' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed.' });
  }
}
