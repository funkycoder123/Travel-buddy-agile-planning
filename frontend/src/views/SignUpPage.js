import React, { useState } from 'react';

const SignUpPage = () => {  // ✅ Use PascalCase for component name
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.status === 201) {
        alert('Registration successful!');
      } else {
        alert(data.message || 'Signup failed!');
      }
    } catch (err) {
      console.error('Signup error:', err);
      alert('Something went wrong. Try again later.');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        /><br /><br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br /><br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default SignUpPage;
