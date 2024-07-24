// models/User.ts
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  verificationToken: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
});

export const User = mongoose.models.User || mongoose.model('User', UserSchema);
