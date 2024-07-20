// components/HomePage.tsx
import React, { useState } from 'react';
import Category from './components/Category';
import Navbar from './navbar';
import Link from 'next/link';
import Footer from './footer';
import Drawer from './drawer';

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
  const [newCategoryImage, setNewCategoryImage] = useState<File | null>(null); // State to hold the uploaded image file
  const [categories, setCategories] = useState<Category[]>(initialCategories);

  const handleAddCategory = () => {
    if (newCategoryName.trim() !== '' && newCategoryImage) {
      const imageUrl = URL.createObjectURL(newCategoryImage); // Generate a URL for the uploaded image
      setCategories([
        ...categories,
        { name: newCategoryName.trim(), imageUrl: imageUrl },
      ]);
      setNewCategoryName(''); // Clear input fields after adding
      setNewCategoryImage(null);
    }
  };

  const handleNameInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewCategoryName(event.target.value);
  };

  const handleImageInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // Get the first file from the input
    if (file) {
      setNewCategoryImage(file);
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
      <h2 style={styles.text}>Trending Recepies</h2>
        <div style={{display:'flex'}}>
          <img style={{height:'300px',width:'174px'}} src='/Imges/download 4.png'/>
          <div>
          <img style={{marginLeft:'6px',height:'147px',width:'140px'}} src='/Imges/download 2.png'/>
          <img style={{marginLeft:'6px',marginTop:'4px',height:'147px',width:'140px'}} src='/Imges/download 3.png'/>

          </div>
        </div>
      <h2 style={styles.text}>All Categories</h2>
        <div style={styles.categoryGrid}>
          {categories.map((category) => (
            <Link href="/uicomponent" as="/uicomponent" passHref={true} legacyBehavior key={category.name}>
              <div style={styles.categoryItem}>
                <Category name={category.name} imageUrl={category.imageUrl} />
              </div>
            </Link>
          ))}
        </div>
        <div style={{ marginTop: '40px',
    textAlign: 'center',}}>
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
          <button onClick={handleAddCategory} style={styles.button}>
            Add Category
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#DFC3C3',
    minHeight: '100vh',
    paddingTop: '60px',
    marginLeft:'-6.8px',
    marginTop:'-7px',
    
  },
  searchBarContainer: {
    display: 'flex',
    justifyContent: 'center',
    padding: '10px 20px',
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
    borderRadius:'30px'
  },
  categoryItem: {
    cursor: 'pointer',
  },
  addCategoryContainer: {
    marginTop: '40px',
    textAlign: 'center',
  },
  text: {
    color: 'black',
marginTop:'0px',
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
