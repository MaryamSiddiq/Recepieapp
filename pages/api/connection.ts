// pages/api/test-connection.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Await the MongoDB client connection
    const client = await clientPromise;
    
    // Access the database and collection
    const db = client.db('recepiedatabase'); // Replace with your database name
    const collection = db.collection('user'); // Replace with your collection name
    
    // Perform a simple operation
    const result = await collection.find({}).toArray();
    
    // Respond with the result
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    res.status(500).json({ success: false, error: 'Failed to connect to MongoDB' });
  }
}
