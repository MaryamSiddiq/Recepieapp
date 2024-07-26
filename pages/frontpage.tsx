


// components/HomePage.tsx
/*import Link from 'next/link';
import router from 'next/router';
import { relative } from 'path';
import React, { useState } from 'react';


const Frontpage: React.FC = () => {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle login logic here (e.g., dispatching an action)
    
        // Redirect to homepage
        router.push('/loginverification'); // Assuming your homepage is at /HomePage
      };

    return (
        <div style={styles.container}>
            <img src={"/Imges/logo2.png"} style={{
                marginTop: '16px',
                width: '70%',
                height: '180px',

            }} />

            <img src={"/Imges/sideimage.png"} style={{
                width: '112px',
                height: '106px',
                position: 'relative',
                top: -72,
                right: 0,
            }} />
            <img src={"/Imges/labelimage.png"} style={{ width: '564.48px.48px', transform: 'rotate(-20.3deg) translatex(-100px)', height: '340.96px' }} />
          
            <Link href="/loginverification" as="/loginverification" passHref={true} legacyBehavior>
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
                    width: '90%',
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

export default Frontpage;*/

import Link from 'next/link';
import router from 'next/router';
import React from 'react';
import { useNetwork } from './context/networkcontext';

const Frontpage: React.FC = () => {
  const { isOnline } = useNetwork();

  return (
    <div style={styles.container}>
      <img src={"/Imges/logo2.png"} style={styles.logo} />
      <img src={"/Imges/sideimage.png"} style={{width: '112px',
    height: '106px',
    position: 'relative',
    top: -72,
    right: 0,}} />
      <img src={"/Imges/labelimage.png"} style={styles.labelImage} />

        <Link href="/loginverification" passHref legacyBehavior>
          <button style={{position: 'relative',
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
    width: '90%',
    textAlign: 'center',}}>Go</button>
        </Link>
      
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: 'white',
    margin: '0px',
  },
  logo: {
    marginTop: '16px',
    width: '70%',
    height: '180px',
  },
  sideImage: {
    width: '112px',
    height: '106px',
    position: 'relative',
    top: -72,
    right: 0,
  },
  labelImage: {
    width: '564.48px',
    transform: 'rotate(-20.3deg) translatex(-100px)',
    height: '340.96px',
  },
  button: {
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
    width: '90%',
    textAlign: 'center',
  },
  offlineMessage: {
    color: 'red',
    textAlign: 'center',
    marginTop: '20px',
  },
};

export default Frontpage;
