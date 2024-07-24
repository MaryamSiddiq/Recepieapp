/*import React, { useState } from 'react';

const SignupForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const signupData = { email, password };

    try {
      const response = await fetch('http://localhost:3000/api/sendverificationemail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signupData),
      });

      const data = await response.json();

      if (response.ok) {
        setVerificationSent(true);
      } else {
        console.error(data.message);
        alert(data.message);
      }
    } catch (error) {
      console.error('Error during signup:', error);
      alert('An unexpected error occurred.');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Sign Up</h3>
      <div>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="domain@gmail.com"
          required
        />
      </div>
      <div>
        <input
          type={showPassword ? 'text' : 'password'}
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter Password"
          required
        />
        <button type="button" onClick={togglePasswordVisibility}>
          {showPassword ? 'Hide' : 'Show'} Password
        </button>
      </div>
      <button type="submit">Sign Up</button>
      {verificationSent && <p>A verification email has been sent to your email address. Please check your inbox.</p>}
    </form>
  );
};

export default SignupForm;*/
import Link from 'next/link';
import React, { useState } from 'react';

const SignupForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const signupData = { email, password };

    try {
      const response = await fetch('http://localhost:3000/api/sendverificationemail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signupData),
      });

      const data = await response.json();

      if (response.ok) {
        setVerificationSent(true);
      } else {
        console.error(data.message);
        alert(data.message);
      }
    } catch (error) {
      console.error('Error during signup:', error);
      alert('An unexpected error occurred.');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginLeft: '-6.8px', marginTop: '-6px', padding: '0px' }}>
      <div>
        <img src="/Imges/profileimage.png" alt="Logo" style={{ marginBottom: '30px' }} />
      </div>
      <h3 style={{ textAlign: 'center', fontFamily: 'inherit' }}>Create an account</h3>
      <p style={{ textAlign: 'center', fontFamily: 'inherit' }}>Enter an email to signup for this</p>
      <div style={{ marginBottom: '20px', textAlign: 'center' }}>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="domain@gmail.com"
          required
          style={{ padding: '10px', marginTop: '0px', width: '80%', color: '#000', border: '1px solid #ccc', fontSize: '17px' }}
        />
      </div>
      <div style={{ marginBottom: '20px', textAlign: 'center' }}>
        <input
          type={showPassword ? 'text' : 'password'}
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter Password"
          required
          style={{ padding: '10px', marginTop: '0px', width: '80%', color: '#000', border: '1px solid #ccc', fontSize: '17px' }}
        />
        
      </div>
      <div style={{ marginBottom: '10px', textAlign: 'center' }}>
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
        Sign Up
      </button>
      
      </div>
      <div style={{ marginBottom: '10px', textAlign: 'center' }}>
      <Link href="/logincomponent" as="/logincomponent" passHref={true} legacyBehavior>
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
            Log In
          </button>
        </Link>
</div>
      {verificationSent && <p style={{ textAlign: 'center', color: 'green' }}>A verification email has been sent to your email address. Please check your inbox.</p>}
      <p style={{ textAlign: 'center', fontFamily: 'inherit', color: '#ccc', fontSize: '17px' }}>By clicking continue you agree to our terms of service and privacy policy.</p>
      <div>
        <img src="/Imges/Ellipse 1.png" alt="Logo" style={{ marginTop: '20px' }} />
      </div>
    </form>
  );
};

export default SignupForm;

