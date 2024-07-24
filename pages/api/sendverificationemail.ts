// pages/api/signup.ts
import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import crypto from 'crypto';
import { User } from '../models/User2'; // Adjust path as needed
import dbConnect from '../lib/db';
import bcrypt from 'bcryptjs';
import clientPromise from '../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const client = await clientPromise;
    const db = client.db();

    const { email, password } = req.body;

    try {
      // Check if user already exists
      

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);


      // Generate a verification token
      const verificationToken = crypto.randomBytes(32).toString('hex');

     

      const result = await db.collection('user').insertOne({
        email,
        password: hashedPassword,
        verificationToken,
        isVerified: false,
      });

      // Send verification email
      const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Email Verification',
        text: `Please verify your email by clicking on this link: ${process.env.BASE_URL}/api/verifyEmail?token=${verificationToken}`,
      };

      await transporter.sendMail(mailOptions);

      res.status(200).json({ message: 'Verification email sent' });
    } catch (error) {
      console.error('Error during signup:', error);
      res.status(500).json({ message: 'Error during signup' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
