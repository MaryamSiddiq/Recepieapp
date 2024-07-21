


// components/HomePage.tsx
import Link from 'next/link';
import router from 'next/router';
import { relative } from 'path';
import React, { useState } from 'react';


const Frontpage: React.FC = () => {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle login logic here (e.g., dispatching an action)
    
        // Redirect to homepage
        router.push('/HomePage'); // Assuming your homepage is at /HomePage
      };

    return (
        <div style={styles.container}>
            <img src={"/Imges/logo2.png"} style={{
                marginTop: '16px',
                width: '55%',
                height: '180px',

            }} />

            <img src={"/Imges/sideimage.png"} style={{
                width: '112px',
                height: '106px',
                position: 'relative',
                top: -72,
                right: 0,
            }} />
            <img src={"/Imges/labelimage.png"} style={{ width: '564.48px.48px', transform: 'rotate(-20.3deg) translatex(-100px)', height: '226.96px' }} />
          
            <Link href="/logincomponent" as="/logincomponent" passHref={true} legacyBehavior>
            <button
                style={{
                    position: 'relative',
                    top: 160,
                    left: 20,
                    padding: '5px 12px',
                    fontSize: '14px',
                    backgroundColor: '#575151',
                    color: 'white',
                    border: 'none',
                    borderRadius: '7px',
                    cursor: 'pointer',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                    transition: 'background-color 0.3s ease',
                    width: '70%',
                    textAlign: 'center',
                }}
            >
                Go
            </button>
            </Link>
        </div>
    );
};

const styles = {

    container: {
        backgroundColor: 'white',
        margin: '0px',
        innerHeight:'200px'
    },

};

export default Frontpage;
