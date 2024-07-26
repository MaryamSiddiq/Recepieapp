import { GetServerSideProps } from 'next';
import axios from 'axios';

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

interface Props {
  recipes: Recipe[]; // Ensure Recipe type is properly imported
}

const RecipesPage: React.FC<Props> = ({ recipes = [] }) => { // Default to empty array
  return (
    <div style={{ padding: '20px', backgroundColor: '#DFC3C3' }}>
      <h1 style={{ color: 'black' }}>All Recipes</h1>
      {recipes.length > 0 ? (
        <div>
          {recipes.map((recipe, index) => (
            <div key={index} style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
              <h2>{recipe.name}</h2>
              <p><strong>Cooking Time:</strong> {recipe.cookingTime}</p>
              <p><strong>Description:</strong> {recipe.description}</p>
              <p><strong>Ingredients:</strong> {recipe.ingredients.join(', ')}</p>
              <h3>Steps:</h3>
              <ol>
                {recipe.steps.map((step, index) => (
                  <li key={index}>
                    {step.description} - {step.time} minutes
                  </li>
                ))}
              </ol>
              {recipe.imageUrl && <img src={recipe.imageUrl} alt={recipe.name} style={{ maxWidth: '100%', maxHeight: '200px', objectFit: 'cover' }} />}
            </div>
          ))}
        </div>
      ) : (
        <p>No recipes found.</p>
      )}
    </div>
  );
};



export async function getServerSideProps() {
  try {
    const res = await fetch('http://localhost:3000/api/recipes');
    const data = await res.json();

    // Assuming the API returns { message: '...', data: [...] }
    if (data.message === 'Recipes fetched successfully.') {
      return { props: { recipes: data.data || [] } };
    } else {
      return { props: { recipes: [] } };
    }
  } catch (error) {
    console.error('Error fetching recipes:', error);
    return { props: { recipes: [] } };
  }
}


export default RecipesPage;
