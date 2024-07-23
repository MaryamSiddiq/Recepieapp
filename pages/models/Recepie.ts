// models/Recipe.ts
import mongoose, { Document, Schema } from 'mongoose';

interface IIngredient {
  name: string;
}

interface IStep {
  description: string;
  time: number;
}

export interface IRecipe extends Document {
  name: string;
  cookingTime: string;
  description: string;
  ingredients: IIngredient[];
  steps: IStep[];
  imageUrl: string;
}

const IngredientSchema: Schema = new Schema({
  name: { type: String, required: true },
});

const StepSchema: Schema = new Schema({
  description: { type: String, required: true },
  time: { type: Number, required: true },
});

const RecipeSchema: Schema = new Schema({
  name: { type: String, required: true },
  cookingTime: { type: String, required: true },
  description: { type: String, required: true },
  ingredients: { type: [IngredientSchema], required: true },
  steps: { type: [StepSchema], required: true },
  imageUrl: { type: String, required: true },
});

const Recipe = mongoose.models.Recipe || mongoose.model<IRecipe>('Recipe', RecipeSchema);

export default Recipe;
