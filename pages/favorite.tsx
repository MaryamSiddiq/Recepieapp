// pages/favorites.tsx
import React, { useState, useEffect } from 'react';
import Drawer from './drawer';

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
}

const FavoritesPage: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/favorite', {
          method: 'GET',
        });
        const data = await response.json();
        if (response.ok) {
          setRecipes(data.data);
        } else {
          console.error('Error fetching favorite recipes:', data.message);
        }
      } catch (error) {
        console.error('Error fetching favorite recipes:', error);
      }
    };

    fetchFavorites();
  }, []);

  return (
    <div style={{ backgroundColor: '#DFC3C3', minHeight: '100vh', marginTop: '-20px', marginLeft: '-6.8px' }}>
      <Drawer />
      <div style={{ paddingTop: '68px' }}>
        <h1 style={{ color: 'black', textAlign: 'center' }}>Favorite Recipes</h1>
        <div style={{ paddingTop: '10px', paddingLeft: '12px', paddingRight: '12px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 2fr))', gap: '10px', color: 'black', borderRadius: '30px' }}>
          {Array.isArray(recipes) && recipes.length > 0 ? (
            recipes.map((recipe, index) => (
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
                <h3 style={{ color: '#333', margin: '10px 0px', textAlign: 'left' }}>{recipe.name}</h3>
                <p style={{ color: '#777', margin: '5px 0' }}><strong>Cooking Time:</strong> {recipe.cookingTime}</p>
                <p style={{ color: '#777', margin: '5px 10px' }}><strong>Description:</strong> {recipe.description}</p>
              </div>
            ))
          ) : (
            <p>No favorite recipes found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FavoritesPage;
