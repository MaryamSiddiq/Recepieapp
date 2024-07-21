import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Drawer from './drawer';
import Footer from './footer';

interface Step {
  description: string;
  time: number;
}

interface Recipe {
  name: string;
  cookingTime: string;
  description: string;
  ingredients: string[];
  steps: Step[];
  imageUrl: string;
  isFavorite: boolean;
}

const RecipeListPage: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const router = useRouter();

  useEffect(() => {
    const storedRecipes = localStorage.getItem('recipes');
    if (storedRecipes) {
      setRecipes(JSON.parse(storedRecipes));
    }
  }, []);

  const handleCookRecipe = (recipe: Recipe) => {
    router.push({
      pathname: '/recepiedetail',
      query: { recipe: JSON.stringify(recipe) },
    });
  };

  const handleFavoriteToggle = (index: number) => {
    const newRecipes = [...recipes];
    newRecipes[index].isFavorite = !newRecipes[index].isFavorite;
    setRecipes(newRecipes);
    localStorage.setItem('recipes', JSON.stringify(newRecipes));
  };

  return (
    <div style={{ backgroundColor: '#DFC3C3', minHeight: '100vh',marginTop:'-20px',marginLeft: '-6.8px', }}>
      <Drawer />
      <div style={{ paddingTop: '68px'}} >
      <h1 style={{ color: 'black',textAlign:'center' }}>All Recipes</h1>
      <div style={{ paddingTop: '10px', paddingLeft: '9px',paddingRight:'9px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 2fr))', gap: '10px', color: 'black', borderRadius: '30px' }}>
        {recipes.map((recipe, index) => (
          <div key={index} style={{
            padding: '0px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            margin: '10px 0',
            backgroundColor: '#F2E5E5',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            <img src={recipe.imageUrl} alt={recipe.name} style={{
              width: '100%',
              height: '200px',
              objectFit: 'cover',
              borderRadius: '5px',
              marginBottom: '10px'
            }} />
            <h3 style={{ color: '#333', margin: '10px 0px',textAlign:'left' }}>{recipe.name}</h3>
            <p style={{ color: '#777', margin: '5px 0' }}><strong>Cooking Time:</strong> {recipe.cookingTime}</p>
            <p style={{ color: '#777', margin: '5px 10px' }}><strong>Description:</strong> {recipe.description}</p>
            <div style={{ display: 'flex' }}>
              <button onClick={() => handleCookRecipe(recipe)} style={{
                padding: '10px 10px',
                backgroundColor: 'black',
                color: 'white',
                border: 'none',
                width: '100%',
                borderRadius: '5px',
                cursor: 'pointer',
                margin: '10px 0',
                paddingLeft:'30px',
                paddingRight:'30px'
              }}>
                Cook 
              </button>
              <button onClick={() => handleFavoriteToggle(index)} style={{
                padding: '10px',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: recipe.isFavorite ? '#E9445C' : '#ccc',
                fontSize: '20px'
              }}>
                {recipe.isFavorite ? '♥' : '♡'}
              </button>
            </div>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
};

export default RecipeListPage;
