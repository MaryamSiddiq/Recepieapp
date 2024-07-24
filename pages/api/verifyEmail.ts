// pages/api/verifyEmail.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { User } from '../models/User2'; // Adjust path as needed
import dbConnect from '../lib/db';
import clientPromise from '../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const client = await clientPromise;
        const db = client.db();

        const { token } = req.query;
        if (typeof token === 'string') {
            try {
                // Find the user with the matching token
                const user = await db.collection('user').findOne({ verificationToken: token });
                if (user) {
                    // Update user to mark email as verified
                    await db.collection('user').updateOne(
                        { verificationToken: token },
                        {
                          $set: {
                            isVerified: true,
                            verificationToken: '', // Clear the token
                          },
                        }
                      );
                    // Redirect to homepage or another page
                    res.redirect('/HomePage'); // Adjust the path if necessary
                } else {
                    res.redirect('/login?verified=false');
                }
            } catch (error) {
                console.error('Error during email verification:', error);
                res.redirect('/login?verified=false');
            }
        } else {
            res.redirect('/login?verified=false');
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
