// models/Category.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface ICategory extends Document {
  name: string;
  imageUrl: string;
}

const CategorySchema: Schema = new Schema({
  name: { type: String, required: true },
  imageUrl: { type: String, required: true },
});

const Category = mongoose.models.Category || mongoose.model<ICategory>('category', CategorySchema);

export default Category;
