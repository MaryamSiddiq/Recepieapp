"use client";

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';


const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here (e.g., dispatching an action)
    console.log('Logging in with:', { email, password });

    // Redirect to homepage
    router.push('/HomePage'); // Assuming your homepage is at /HomePage
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
      <form onSubmit={handleSubmit} style={{
       marginLeft:'-6.8px',
       marginTop:'-6px',
       padding:'0px',
      }}>
        <div>
          <img src="/Imges/profileimage.png" alt="Logo" style={{ }} />
        </div>
        <h3 style={{textAlign: 'center',fontFamily:'inherit' }}>Create an account</h3>
        <p style={{textAlign: 'center',fontFamily:'inherit' }}>Enter an email to signup for this</p>

        <div style={{ marginBottom: '20px',textAlign:'center'}}>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="domain@gmail.com"
            className="em"
            required
            style={{ padding: '10px', marginTop: '10px', width: '80%',color:'#ccc', border: '1px solid #ccc' }}
          />
        </div>
        <div style={{ marginBottom: '20px',textAlign:'center'}}>
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
        </div>
        <p style={{textAlign: 'center',fontFamily:'inherit' ,color:'#ccc' }}>Or Continue With</p>
        <div style={{ marginBottom: '20px',textAlign:'center'}}>
        <button
          type="submit"
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: '#D9D9D9D9',
            color: 'black',
            border: 'none',
            borderRadius: '7px',
            cursor: 'pointer',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
            transition: 'background-color 0.3s ease',
            width: '86%',
            textAlign: 'center',
          }}
        >
          Google
        </button>
        </div>
        <p style={{textAlign: 'center',fontFamily:'inherit' ,color:'#ccc',fontSize:'17px' }}>By clicking continue you agree to our term<br/> services and policy</p>
        <div>
          <img src="/Imges/Ellipse 1.png" alt="Logo" style={{ }} />
        </div>
      </form>
  
  );
};

export default LoginForm;
