


import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Drawer from './drawer';
import Category from './components/Category';

interface Category {
  name: string;
  imageUrl: string;
}
const initialCategories: Category[] = [
  { name: 'Lunch', imageUrl: '/Imges/lunch.jfif' },
  { name: 'Dinner', imageUrl: '/Imges/dinner.jfif' },
  { name: 'Dessert', imageUrl: '/Imges/dessert.jfif' },
  { name: 'Drinks', imageUrl: '/Imges/breakfast.jfif' },
];
const HomePage: React.FC = () => {
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryImage, setNewCategoryImage] = useState<File | null>(null);
  const [categories, setCategories] = useState<Category[]>(initialCategories);

  useEffect(() => {
    // Fetch categories when the component mounts
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/addcategory');
        const data = await response.json();
        if (response.ok) {
          setCategories(data);
        } else {
          console.error('Failed to fetch categories:', data.error);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleNameInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewCategoryName(event.target.value);
  };

  const handleImageInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setNewCategoryImage(file);
    }
  };

  const handleAddCategory = async () => {
    if (!newCategoryName || !newCategoryImage) {
      alert('Please provide both name and image');
      return;
    }

    const formData = new FormData();
    formData.append('name', newCategoryName);
    formData.append('image', newCategoryImage);

    try {
      const response = await fetch('http://localhost:3000/api/addcategory', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        // Fetch the updated list of categories
        const updatedResponse = await fetch('http://localhost:3000/api/addcategory');
        const updatedData = await updatedResponse.json();
        if (updatedResponse.ok) {
          setCategories(updatedData);
          setNewCategoryName('');
          setNewCategoryImage(null);
        } else {
          alert(updatedData.error || 'Failed to fetch updated categories');
        }
      } else {
        alert(data.error || 'Failed to add category');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to add category');
    }
  };

  return (
    <div style={styles.container}>
      <Drawer />
      <div style={styles.searchBarContainer}>
        <input
          type="text"
          placeholder="Search your recipe"
          style={styles.searchBar}
        />
      </div>
      <div style={styles.homePage}>
        <h2 style={styles.text}>Trending Recipes</h2>
        <Link href="/uicomponent" as="/uicomponent" passHref={true} legacyBehavior>
          <div style={{ display: 'flex' }}>
            <img
              style={{
                height: '300px',
                width: '174px',
                objectFit: 'cover',
              }}
              src='/Imges/download 4.png'
              alt='Description'
            />

            <div>
              <img style={{ marginLeft: '6px', height: '147px', width: '140px', }} src='/Imges/download 2.png' />
              <img style={{ marginLeft: '6px', marginTop: '4px', height: '147px', width: '140px' }} src='/Imges/download 3.png' />
            </div>
          </div>
        </Link>
        <h2 style={styles.text}>All Categories</h2>
        <div style={styles.categoryGrid}>
          {categories.map((category) => (
            <Link href={`/uicomponent?category=${category.name}`} key={category.name} passHref={true} legacyBehavior>
              <div style={styles.categoryItem}>
                <Category name={category.name} imageUrl={category.imageUrl} />
              </div>
            </Link>
          ))}
        </div>
        <div style={{ marginTop: '40px', textAlign: 'center' }}>
          <h1 style={styles.text}>You can add new Categories</h1>
          <input
            type="text"
            value={newCategoryName}
            onChange={handleNameInputChange}
            placeholder="Enter new category name"
            style={styles.input}
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageInputChange}
            style={styles.input}
          />
          <button style={styles.button} onClick={handleAddCategory}>
            Add Category
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#DFC3C3',
    minHeight: '100vh',
    paddingTop: '60px',
    marginLeft: '-6.8px',
    marginTop: '-7px',
  },
  searchBarContainer: {
    display: 'flex',
    justifyContent: 'center',
    padding: '10px 20px',
    marginTop: '20px'
  },
  searchBar: {
    width: '90%',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '20px',
    border: '1px solid #ccc',
  },
  homePage: {
    padding: '20px',
  },
  categoryGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 2fr))',
    gap: '20px',
    color: 'black',
    borderRadius: '30px'
  },
  categoryItem: {
    cursor: 'pointer',
  },
  text: {
    color: 'black',
    marginTop: '0px',
  },
  input: {
    display: 'block',
    width: '80%',
    margin: '10px auto',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '10px 20px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#333',
    color: 'white',
    cursor: 'pointer',
  },
};

export default HomePage;
