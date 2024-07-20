// components/Category.tsx
import React from 'react';
import Link from 'next/link';

interface CategoryProps {
    name: string;
    imageUrl: string;
}

const Category: React.FC<CategoryProps> = ({ name, imageUrl}) => {
    return (
            <a style={styles.categoryCard}>
                <img src={imageUrl} alt={name} style={{
                    width: '100%',
                    height: '200px',
                    objectFit: 'cover',
                }} />
                <h3 style={{
                    textAlign: 'center',
                    padding: '10px',
                    backgroundColor: '#E9445C',
                    color: 'white',
                    fontSize: '1.2em',
                }}>{name}</h3>
            </a>
    );
};

const styles = {
    categoryCard: {
        border: '1px solid #ccc',
        borderRadius: '10px',
        overflow: 'hidden',
        transition: 'transform 0.3s ease',
        cursor: 'pointer',
        textDecoration: 'none',
        display: 'block',
        marginBottom: '20px',
    },
    categoryCardHover: {
        transform: 'scale(1.05)',
    },
    categoryImage: {

    },
    categoryName: {

    },
};

export default Category;
