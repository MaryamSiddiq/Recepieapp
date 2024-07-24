import React, { useEffect, useState } from 'react';
import Drawer from './drawer';
import Footer from './footer';
import { useRouter } from 'next/router';

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

const SearchCategoryPage: React.FC = () => {
  const [category, setCategory] = useState('');
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

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

  const handleSearch = async () => {
    if (!category) {
      alert('Please enter a category');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`http://localhost:3000/api/search?category=${category}`);
      const data = await response.json();

      if (response.ok) {
        setRecipes(data.data);
      } else {
        console.error('Error fetching recipes:', data.message);
      }
    } catch (error) {
      console.error('Error fetching recipes:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCookRecipe = (recipe: Recipe) => {
    router.push({
      pathname: '/recepiedetail',
      query: { recipe: JSON.stringify(recipe) },
    });
  };

  const handleFavoriteToggle = async (index: number) => {
    const recipe = recipes[index];
    const newRecipes = [...recipes];
    newRecipes[index].isFavorite = !recipe.isFavorite;
    setRecipes(newRecipes);

    try {
      const response = await fetch('http://localhost:3000/api/favorite', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ recipe: newRecipes[index] }),
      });

      const data = await response.json();
      console.log('Favorite API response:', data);
    } catch (error) {
      console.error('Error updating favorite recipe:', error);
    }
  };

  return (
    <div style={{ backgroundColor: '#DFC3C3', minHeight: '100vh', marginTop: '-20px', marginLeft: '-6.8px' }}>
      <Drawer />
      <div style={{ paddingTop: '68px', textAlign: 'center' }}>
        <h1 style={{ color: 'black' }}>Search Recipes by Category</h1>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Enter category name"
          style={{ padding: '10px', borderRadius: '5px', marginRight: '10px' }}
        />
        <button
          onClick={handleSearch}
          style={{ padding: '10px 20px', backgroundColor: 'black', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
        >
          Search
        </button>

        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div style={{ paddingTop: '68px' }}>
            <h1 style={{ color: 'black', textAlign: 'center' }}>All Recipes</h1>
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
                        paddingLeft: '30px',
                        paddingRight: '30px'
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
                ))
              ) : (
                <p>No Recipe</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchCategoryPage;
