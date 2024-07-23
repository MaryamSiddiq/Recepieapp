// pages/api/auth/signup.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../lib/db';
import bcrypt from 'bcryptjs';

type Data = {
  message: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === 'POST') {
    const { email, password ,username} = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    try {
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Connect to the database
      const client = await clientPromise;
      const db = client.db();

      // Insert the user into the 'users' collection
      const result = await db.collection('user').insertOne({
        email,
        password: hashedPassword,
      });

      return res.status(201).json({ message: 'User created successfully.' });
    } catch (error) {
      return res.status(500).json({ message: 'Error creating user.' });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed.' });
  }
}
