// src/app/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  name: string;
  cookingTime: string;
  description: string;
  ingredients: string[];
  steps: { description: string; time: number }[];
  imageUrl: string;
  category: string;
}

const initialState: AuthState = {
  name: '',
  cookingTime: '',
  description: '',
  ingredients: [''],
  steps: [{ description: '', time: 0 }],
  imageUrl: '',
  category: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setName(state, action: PayloadAction<string>) {
      state.name = action.payload;
    },
    setCookingTime(state, action: PayloadAction<string>) {
      state.cookingTime = action.payload;
    },
    setDescription(state, action: PayloadAction<string>) {
      state.description = action.payload;
    },
    setIngredients(state, action: PayloadAction<string[]>) {
      state.ingredients = action.payload;
    },
    setSteps(state, action: PayloadAction<{ description: string; time: number }[]>) {
      state.steps = action.payload;
    },
    setImageUrl(state, action: PayloadAction<string>) {
      state.imageUrl = action.payload;
    },
    setCategory(state, action: PayloadAction<string>) {
      state.category = action.payload;
    },
  },
});

export const { setName, setCookingTime, setDescription, setIngredients, setSteps, setImageUrl, setCategory } = authSlice.actions;

export default authSlice.reducer;
