// pages/api/auth/login.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../lib/db'; // Adjust path if necessary
import bcrypt from 'bcryptjs';

type Data = {
  message: string;
  user?: {
    email: string;
    username: string;
  };
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    try {
      // Connect to the database
      const client = await clientPromise;
      const db = client.db();

      // Find the user by email
      const user = await db.collection('user').findOne({ email });

      // Log the user object to debug
      console.log('Fetched user from database:', user);

      if (!user) {
        return res.status(401).json({ message: 'Invalid email.' });
      }

      // Check if the provided password matches the stored hashed password
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid password.' });
      }

      // Respond with user data (omit password)
      const { password: _, ...userData } = user; // Remove password field from response
      return res.status(200).json({ message: 'Login successful.' });
    } catch (error) {
      console.error('Error logging in:', error);
      return res.status(500).json({ message: 'Error logging in.' });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed.' });
  }
}
