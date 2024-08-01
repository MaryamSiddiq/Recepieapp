/*import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
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
  category: string;
}

const HomePage: React.FC = () => {
  const [name, setName] = useState('');
  const [cookingTime, setCookingTime] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState<string[]>(['']);
  const [steps, setSteps] = useState<Step[]>([{ description: '', time: 0 }]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState('');
  const [category, setCategory] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Load state from localStorage
    const savedState = localStorage.getItem('recipeFormState');
    if (savedState) {
      const {
        name,
        cookingTime,
        description,
        ingredients,
        steps,
        imageUrl,
        category
      } = JSON.parse(savedState);

      setName(name || '');
      setCookingTime(cookingTime || '');
      setDescription(description || '');
      setIngredients(ingredients || ['']);
      setSteps(steps || [{ description: '', time: 0 }]);
      setImageUrl(imageUrl || '');
      setCategory(category || '');
    }

    // Load category from query parameter
    const { category } = router.query;
    if (category) {
      setCategory(category as string);
    }
  }, [router.query]);

  useEffect(() => {
    // Save state to localStorage
    const state = {
      name,
      cookingTime,
      description,
      ingredients,
      steps,
      imageUrl,
      category
    };
    localStorage.setItem('recipeFormState', JSON.stringify(state));
  }, [name, cookingTime, description, ingredients, steps, imageUrl, category]);

  const handleAddRecipe = async () => {
    if (!imageFile) {
      alert('Please upload an image');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('cookingTime', cookingTime);
    formData.append('description', description);
    formData.append('ingredients', JSON.stringify(ingredients));
    formData.append('steps', JSON.stringify(steps));
    formData.append('category', category);
    formData.append('image', imageFile);

    try {
      const response = await fetch('http://localhost:3000/api/Addrecepie', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        // Clear state after successful submission
        setName('');
        setCookingTime('');
        setDescription('');
        setIngredients(['']);
        setSteps([{ description: '', time: 0 }]);
        setImageFile(null);
        setImageUrl('');
        setCategory('');

        // Remove state from localStorage
        localStorage.removeItem('recipeFormState');

        router.push('/addedrecepie');
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error adding recipe:', error);
      alert('Error adding recipe.');
    }
  };

  const handleIngredientChange = (index: number, value: string) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = value;
    setIngredients(newIngredients);
  };

  const handleStepChange = (index: number, value: string | number, field: 'description' | 'time') => {
    const newSteps = [...steps];
    newSteps[index] = { ...newSteps[index], [field]: field === 'time' ? Number(value) : value };
    setSteps(newSteps);
  };

  const addIngredientField = () => {
    setIngredients([...ingredients, '']);
  };

  const addStepField = () => {
    setSteps([...steps, { description: '', time: 0 }]);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div style={{ backgroundColor: '#DFC3C3', marginLeft: '-6.8px', marginTop: '-20px' }}>
      <Drawer />
      <div style={{ paddingTop: '60px', paddingLeft: '10px' }}>
        <h1 style={{ color: 'black' }}>Add Recipe</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAddRecipe();
          }}
        >
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Recipe Name"
            required
            style={{ padding: '10px', margin: '10px 0', width: '90%', borderRadius: '5px', color: 'black', border: '1px solid #ccc' }}
          />
          <input
            type="text"
            value={cookingTime}
            onChange={(e) => setCookingTime(e.target.value)}
            placeholder="Cooking Time"
            required
            style={{ padding: '10px', margin: '10px 0', width: '90%', borderRadius: '5px', border: '1px solid #ccc' }}
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            required
            style={{ color: 'black', padding: '10px', margin: '10px 0', width: '90%', borderRadius: '5px', border: '1px solid #ccc', height: '100px' }}
          />
          <h3 style={{ color: 'white' }}>Ingredients</h3>
          {ingredients.map((ingredient, index) => (
            <input
              key={index}
              type="text"
              value={ingredient}
              onChange={(e) => handleIngredientChange(index, e.target.value)}
              placeholder={`Ingredient ${index + 1}`}
              required
              style={{ color: 'black', padding: '10px', margin: '10px 0', width: '90%', borderRadius: '5px', border: '1px solid #ccc' }}
            />
          ))}
          <button type="button" onClick={addIngredientField} style={{ padding: '10px 20px', margin: '10px 0', backgroundColor: '#E9445C', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
            Add Ingredient
          </button>
          <h3 style={{ color: 'white' }}>Steps</h3>
          {steps.map((step, index) => (
            <div key={index}>
              <textarea
                value={step.description}
                onChange={(e) => handleStepChange(index, e.target.value, 'description')}
                placeholder={`Step ${index + 1}`}
                required
                style={{ padding: '10px', margin: '10px 0', width: '90%', borderRadius: '5px', border: '1px solid #ccc', height: '50px' }}
              />
              <input
                type="number"
                value={step.time}
                onChange={(e) => handleStepChange(index, e.target.value, 'time')}
                placeholder="Time in minutes"
                required
                style={{ padding: '10px', margin: '10px 0', width: '90%', borderRadius: '5px', border: '1px solid #ccc' }}
              />
            </div>
          ))}
          <button type="button" onClick={addStepField} style={{ padding: '10px 20px', margin: '10px 0', backgroundColor: '#E9445C', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
            Add Step
          </button>
          <h3 style={{ color: 'white' }}>Image</h3>
          <input
            type="file"
            onChange={handleImageChange}
            required
            style={{ backgroundColor: 'white', padding: '10px', margin: '10px 0', width: '90%', borderRadius: '5px', border: '1px solid #ccc' }}
          />
          {imageUrl && <img src={imageUrl} alt="Recipe" style={{ maxWidth: '100%', maxHeight: '200px', objectFit: 'cover', margin: '10px 0' }} />}
          <button type="submit" style={{ padding: '10px 20px', margin: '10px 0', backgroundColor: '#E9445C', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
            Add Recipe
          </button>
        </form>
      </div>
    </div>
  );
};

export default HomePage;*/



/*import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Drawer from './drawer';
import { useNetwork } from './context/networkcontext';

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
  category: string;
}

const HomePage: React.FC = () => {
  const [name, setName] = useState('');
  const [cookingTime, setCookingTime] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState<string[]>(['']);
  const [steps, setSteps] = useState<Step[]>([{ description: '', time: 0 }]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState('');
  const [category, setCategory] = useState('');
  const router = useRouter();
  const { isOnline, saveDataLocally } = useNetwork(); // Use network context

  useEffect(() => {
    // Load state from localStorage
    const savedState = localStorage.getItem('recipeFormState');
    if (savedState) {
      const {
        name,
        cookingTime,
        description,
        ingredients,
        steps,
        imageUrl,
        category
      } = JSON.parse(savedState);

      setName(name || '');
      setCookingTime(cookingTime || '');
      setDescription(description || '');
      setIngredients(ingredients || ['']);
      setSteps(steps || [{ description: '', time: 0 }]);
      setImageUrl(imageUrl || '');
      setCategory(category || '');
    }

    // Load category from query parameter
    const { category } = router.query;
    if (category) {
      setCategory(category as string);
    }
  }, [router.query]);

  useEffect(() => {
    // Save state to localStorage
    const state = {
      name,
      cookingTime,
      description,
      ingredients,
      steps,
      imageUrl,
      category
    };
    localStorage.setItem('recipeFormState', JSON.stringify(state));
  }, [name, cookingTime, description, ingredients, steps, imageUrl, category]);

  const handleAddRecipe = async () => {
    if (!imageFile) {
      alert('Please upload an image');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('cookingTime', cookingTime);
    formData.append('description', description);
    formData.append('ingredients', JSON.stringify(ingredients));
    formData.append('steps', JSON.stringify(steps));
    formData.append('category', category);
    formData.append('image', imageFile);

    if (isOnline) {
      try {
        const response = await fetch('/api/Addrecepie', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          // Clear state after successful submission
          setName('');
          setCookingTime('');
          setDescription('');
          setIngredients(['']);
          setSteps([{ description: '', time: 0 }]);
          setImageFile(null);
          setImageUrl('');
          setCategory('');

          // Remove state from localStorage
          localStorage.removeItem('recipeFormState');

          router.push('/addedrecepie');
        } else {
          const errorData = await response.json();
          alert(`Error: ${errorData.message}`);
        }
      } catch (error) {
        console.error('Error adding recipe:', error);
        alert('Error adding recipe.');
      }
    } else {
      // Save data locally if offline
      try {
        await saveDataLocally({
          name,
          cookingTime,
          description,
          ingredients,
          steps,
          imageUrl,
          category
        });

        // Clear state after saving locally
        setName('');
        setCookingTime('');
        setDescription('');
        setIngredients(['']);
        setSteps([{ description: '', time: 0 }]);
        setImageFile(null);
        setImageUrl('');
        setCategory('');

        // Remove state from localStorage
        localStorage.removeItem('recipeFormState');

        alert('Recipe saved locally. It will be synced when back online.');
        router.push('/addedrecepie');
      } catch (error) {
        console.error('Error saving recipe locally:', error);
        alert('Error saving recipe locally.');
      }
    }
  };

  const handleIngredientChange = (index: number, value: string) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = value;
    setIngredients(newIngredients);
  };

  const handleStepChange = (index: number, value: string | number, field: 'description' | 'time') => {
    const newSteps = [...steps];
    newSteps[index] = { ...newSteps[index], [field]: field === 'time' ? Number(value) : value };
    setSteps(newSteps);
  };

  const addIngredientField = () => {
    setIngredients([...ingredients, '']);
  };

  const addStepField = () => {
    setSteps([...steps, { description: '', time: 0 }]);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div style={{ backgroundColor: '#DFC3C3', marginLeft: '-6.8px', marginTop: '-20px' }}>
      <Drawer />
      <div style={{ paddingTop: '60px', paddingLeft: '10px' }}>
        <h1 style={{ color: 'black' }}>Add Recipe</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAddRecipe();
          }}
        >
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Recipe Name"
            required
            style={{ padding: '10px', margin: '10px 0', width: '90%', borderRadius: '5px', color: 'black', border: '1px solid #ccc' }}
          />
          <input
            type="text"
            value={cookingTime}
            onChange={(e) => setCookingTime(e.target.value)}
            placeholder="Cooking Time"
            required
            style={{ padding: '10px', margin: '10px 0', width: '90%', borderRadius: '5px', border: '1px solid #ccc' }}
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            required
            style={{ color: 'black', padding: '10px', margin: '10px 0', width: '90%', borderRadius: '5px', border: '1px solid #ccc', height: '100px' }}
          />
          <h3 style={{ color: 'white' }}>Ingredients</h3>
          {ingredients.map((ingredient, index) => (
            <input
              key={index}
              type="text"
              value={ingredient}
              onChange={(e) => handleIngredientChange(index, e.target.value)}
              placeholder={`Ingredient ${index + 1}`}
              required
              style={{ color: 'black', padding: '10px', margin: '10px 0', width: '90%', borderRadius: '5px', border: '1px solid #ccc' }}
            />
          ))}
          <button type="button" onClick={addIngredientField} style={{ padding: '10px 20px', margin: '10px 0', backgroundColor: '#E9445C', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
            Add Ingredient
          </button>
          <h3 style={{ color: 'white' }}>Steps</h3>
          {steps.map((step, index) => (
            <div key={index}>
              <textarea
                value={step.description}
                onChange={(e) => handleStepChange(index, e.target.value, 'description')}
                placeholder={`Step ${index + 1}`}
                required
                style={{ padding: '10px', margin: '10px 0', width: '90%', borderRadius: '5px', border: '1px solid #ccc', height: '50px' }}
              />
              <input
                type="number"
                value={step.time}
                onChange={(e) => handleStepChange(index, e.target.value, 'time')}
                placeholder="Time in minutes"
                required
                style={{ padding: '10px', margin: '10px 0', width: '90%', borderRadius: '5px', border: '1px solid #ccc' }}
              />
            </div>
          ))}
          <button type="button" onClick={addStepField} style={{ padding: '10px 20px', margin: '10px 0', backgroundColor: '#E9445C', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
            Add Step
          </button>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ margin: '10px 0' }}
          />
          {imageUrl && (
            <img
              src={imageUrl}
              alt="Recipe"
              style={{ width: '100px', height: '100px', margin: '10px 0', borderRadius: '5px' }}
            />
          )}
          <button
            type="submit"
            style={{ padding: '10px 20px', backgroundColor: '#E9445C', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
          >
            Add Recipe
          </button>
        </form>
      </div>
    </div>
  );
};

export default HomePage;
*/
// components/HomePage.tsx

// components/HomePage.tsx
// components/HomePage.tsx

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Drawer from './drawer';
import { useNetwork } from './context/networkcontext';
import { addRecipeToIndexedDB } from '../public/IndexedDB';

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
  category: string;
}

const HomePage: React.FC = () => {
  const [name, setName] = useState('');
  const [cookingTime, setCookingTime] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState<string[]>(['']);
  const [steps, setSteps] = useState<Step[]>([{ description: '', time: 0 }]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState('');
  const [category, setCategory] = useState('');
  const router = useRouter();
  const { isOnline } = useNetwork();

  useEffect(() => {
    // Load state from localStorage
    const savedState = localStorage.getItem('recipeFormState');
    if (savedState) {
      const {
        name,
        cookingTime,
        description,
        ingredients,
        steps,
        imageUrl,
        category,
      } = JSON.parse(savedState);

      setName(name || '');
      setCookingTime(cookingTime || '');
      setDescription(description || '');
      setIngredients(ingredients || ['']);
      setSteps(steps || [{ description: '', time: 0 }]);
      setImageUrl(imageUrl || '');
      setCategory(category || '');
    }

    // Load category from query parameter
    const { category } = router.query;
    if (category) {
      setCategory(category as string);
    }
  }, [router.query]);

  useEffect(() => {
    // Save state to localStorage
    const state = {
      name,
      cookingTime,
      description,
      ingredients,
      steps,
      imageUrl,
      category,
    };
    localStorage.setItem('recipeFormState', JSON.stringify(state));
  }, [name, cookingTime, description, ingredients, steps, imageUrl, category]);

  const handleAddRecipe = async () => {
    if (!imageFile) {
      alert('Please upload an image');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('cookingTime', cookingTime);
    formData.append('description', description);
    formData.append('ingredients', JSON.stringify(ingredients));
    formData.append('steps', JSON.stringify(steps));
    formData.append('category', category);
    formData.append('image', imageFile);

    if (isOnline) {
      try {
        const response = await fetch('/api/Addrecepie', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          setName('');
          setCookingTime('');
          setDescription('');
          setIngredients(['']);
          setSteps([{ description: '', time: 0 }]);
          setImageFile(null);
          setImageUrl('');
          setCategory('');

          localStorage.removeItem('recipeFormState');

          router.push('/addedrecepie');
        } else {
          const errorData = await response.json();
          alert(`Error: ${errorData.message}`);
        }
      } catch (error) {
        console.error('Error adding recipe:', error);
        alert('Error adding recipe.');
      }
    } else {
      try {
        await addRecipeToIndexedDB({
          name,
          cookingTime,
          description,
          ingredients,
          steps,
          imageUrl,
          category,
        });

        setName('');
        setCookingTime('');
        setDescription('');
        setIngredients(['']);
        setSteps([{ description: '', time: 0 }]);
        setImageFile(null);
        setImageUrl('');
        setCategory('');

        localStorage.removeItem('recipeFormState');

        alert('Recipe saved locally. It will be synced when back online.');
        router.push('/addedrecepie');
      } catch (error) {
        console.error('Error saving recipe locally:', error);
        alert('Error saving recipe locally.');
      }
    }
  };

  const handleIngredientChange = (index: number, value: string) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = value;
    setIngredients(newIngredients);
  };

  const handleStepChange = (index: number, value: string | number, field: 'description' | 'time') => {
    const newSteps = [...steps];
    newSteps[index] = { ...newSteps[index], [field]: field === 'time' ? Number(value) : value };
    setSteps(newSteps);
  };

  const addIngredientField = () => {
    setIngredients([...ingredients, '']);
  };

  const addStepField = () => {
    setSteps([...steps, { description: '', time: 0 }]);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div style={{ backgroundColor: '#DFC3C3', marginLeft: '-6.8px', marginTop: '-20px' }}>
      <Drawer />
      <div style={{ paddingTop: '60px', paddingLeft: '10px' }}>
        <h1 style={{ color: 'black' }}>Add Recipe</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAddRecipe();
          }}
        >
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Recipe Name"
            required
            style={{ padding: '10px', margin: '10px 0', width: '90%', borderRadius: '5px', color: 'black', border: '1px solid #ccc' }}
          />
          <input
            type="text"
            value={cookingTime}
            onChange={(e) => setCookingTime(e.target.value)}
            placeholder="Cooking Time"
            required
            style={{ padding: '10px', margin: '10px 0', width: '90%', borderRadius: '5px', border: '1px solid #ccc' }}
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            required
            style={{ color: 'black', padding: '10px', margin: '10px 0', width: '90%', borderRadius: '5px', border: '1px solid #ccc', height: '100px' }}
          />
          <h3 style={{ color: 'white' }}>Ingredients</h3>
          {ingredients.map((ingredient, index) => (
            <input
              key={index}
              type="text"
              value={ingredient}
              onChange={(e) => handleIngredientChange(index, e.target.value)}
              placeholder={`Ingredient ${index + 1}`}
              required
              style={{ color: 'black', padding: '10px', margin: '10px 0', width: '90%', borderRadius: '5px', border: '1px solid #ccc' }}
            />
          ))}
          <button type="button" onClick={addIngredientField} style={{ padding: '10px 20px', margin: '10px 0', backgroundColor: '#E9445C', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
            Add Ingredient
          </button>
          <h3 style={{ color: 'white' }}>Steps</h3>
          {steps.map((step, index) => (
            <div key={index} style={{ marginBottom: '10px' }}>
              <input
                type="text"
                value={step.description}
                onChange={(e) => handleStepChange(index, e.target.value, 'description')}
                placeholder={`Step ${index + 1} Description`}
                required
                style={{ padding: '10px', margin: '5px 0', width: '90%', borderRadius: '5px', border: '1px solid #ccc' }}
              />
              <input
                type="number"
                value={step.time}
                onChange={(e) => handleStepChange(index, e.target.value, 'time')}
                placeholder="Time (minutes)"
                required
                style={{ padding: '10px', margin: '5px 0', width: '90%', borderRadius: '5px', border: '1px solid #ccc' }}
              />
            </div>
          ))}
          <button type="button" onClick={addStepField} style={{ padding: '10px 20px', margin: '10px 0', backgroundColor: '#E9445C', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
            Add Step
          </button>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ padding: '10px', margin: '10px 0', width: '90%', borderRadius: '5px', border: '1px solid #ccc' }}
          />
          {imageUrl && <img src={imageUrl} alt="Recipe" style={{ maxWidth: '100%', margin: '10px 0' }} />}
          <button
            type="submit"
            style={{ padding: '10px 20px', backgroundColor: '#E9445C', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
          >
            Submit Recipe
          </button>
        </form>
      </div>
    </div>
  );
};

export default HomePage;
