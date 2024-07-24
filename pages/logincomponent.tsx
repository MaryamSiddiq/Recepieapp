"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Prepare data to send to the backend
    const loginData = {
      email,
      password,
    };

    try {
      // Send a POST request to the login API endpoint
      const response = await fetch('http://localhost:3000/api/Login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (response.ok) {
        // Redirect to homepage on successful login
        router.push('/HomePage'); // Adjust the path if necessary
      } else {
        // Handle error (show message or alert)
        console.error(data.message);
        alert(data.message); // Show error message to the user
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('An unexpected error occurred.'); // Show generic error message
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <form onSubmit={handleSubmit} style={{
      marginLeft: '-6.8px',
      marginTop: '-6px',
      padding: '0px',
    }}>
      <div>
        <img src="/Imges/profileimage.png" alt="Logo" style={{ marginBottom: '40px' }} />
      </div>
      <h3 style={{ textAlign: 'center', fontFamily: 'inherit' }}>Login</h3>
      <p style={{ textAlign: 'center', fontFamily: 'inherit' }}>Enter an email to signup for this</p>
      <div style={{ marginBottom: '20px', textAlign: 'center' }}>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="domain@gmail.com"
          className="em"
          required
          style={{ padding: '10px', marginTop: '10px', width: '80%', color: '#000', border: '1px solid #ccc',fontSize:'16px' }}
        />
      </div>
      <div style={{ marginBottom: '20px', textAlign: 'center' }}>
        <input
          type={showPassword ? 'text' : 'password'}
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter Password"
          className="em"
          required
          style={{ padding: '10px', marginTop: '0px', width: '80%', color: '#000', border: '1px solid #ccc' ,fontSize:'16px'}}
        />

      </div>
      <div style={{ marginBottom: '20px', textAlign: 'center' }}>
        <button
          type="submit"
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: '#000',
            color: 'white',
            border: 'none',
            borderRadius: '7px',
            cursor: 'pointer',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
            transition: 'background-color 0.3s ease',
            width: '86%',
            textAlign: 'center',
          }}
        >
          Login
        </button>
        <Link href="/loginverification" as="/loginverification" passHref={true} legacyBehavior>
          <button
            style={{
             marginTop:'16px',
              padding: '10px 20px',
              fontSize: '16px',
              backgroundColor: '#000',
              color: 'white',
              border: 'none',
              borderRadius: '7px',
              cursor: 'pointer',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
              transition: 'background-color 0.3s ease',
              width: '86%',
              textAlign: 'center',
            }}
          >
            SignUp
          </button>
        </Link>

      </div>
      <p style={{ textAlign: 'center', fontFamily: 'inherit', color: '#ccc', fontSize: '17px' }}>By clicking continue you agree to our term<br /> services and policy</p>
      <div>
        <img src="/Imges/Ellipse 1.png" alt="Logo" style={{ marginTop: '20px' }} />
      </div>
    </form>
  );
};

export default LoginForm;
