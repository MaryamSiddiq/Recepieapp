// src/usecases/AddRecipe.ts
import sharp from "sharp";
import { promises as fs } from "fs";
import path from "path";
import Recipe from "../models/Recepie"; // Ensure correct path

interface AddRecipeDTO {
  name: string;
  cookingTime: string;
  description: string;
  ingredients: { name: string }[];
  steps: { description: string; time: number }[];
  image: any; // The image file
  category: string;
}

export class AddRecipe {
  async execute(recipeData: AddRecipeDTO) {
    const { name, cookingTime, description, ingredients, steps, image, category } = recipeData;

    const inputPath = path.join(process.cwd(), "public/uploads/", image.filename);
    const outputPath = path.join(process.cwd(), "public/uploads/", `compressed-${image.filename}`);

    // Compress the image using sharp
    await sharp(inputPath)
      .resize(300)
      .toFormat("jpeg", { quality: 80 })
      .toFile(outputPath);

    // Remove the original image file
    await fs.unlink(inputPath);

    const compressedImageUrl = `/uploads/compressed-${image.filename}`;

    // Create a new Recipe document and save it
    const newRecipe = new Recipe({
      name,
      cookingTime,
      description,
      ingredients,
      steps,
      imageUrl: compressedImageUrl,
      category,
    });

    await newRecipe.save();
  }

  async findAll() {
    return await Recipe.find({});
  }
}
