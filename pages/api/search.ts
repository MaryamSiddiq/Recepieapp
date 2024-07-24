import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../lib/db'; // Adjust path as necessary

type Data = {
  message: string;
  data?: any;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === 'GET') {
    const { category } = req.query;

    if (!category) {
      return res.status(400).json({ message: 'Category is required.' });
    }

    try {
      const client = await clientPromise;
      const db = client.db();
      const recipes = await db.collection('recepie').find({ category: category as string }).toArray();
      res.status(200).json({ message: 'Recipes fetched successfully', data: recipes });
    } catch (error) {
      console.error('Error fetching recipes:', error);
      res.status(500).json({ message: 'Error fetching recipes' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
