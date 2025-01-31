import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, googleSignIn } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    try {
      await login(email, password);
      // Redirect or handle successful login
    } catch (err) {
      setError('Failed to log in: ' + err.message);
    }
  }

  async function handleGoogleSignIn(e) {
    e.preventDefault();
    setError('');

    try {
      await googleSignIn();
      // Redirect or handle successful login
    } catch (err) {
      setError('Failed to sign in with Google: ' + err.message);
    }
  }

  return (
    <div>
      <h2>Login</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Log In</button>
        <button onClick={handleGoogleSignIn}>Sign in with Google</button>
      </form>
    </div>
  );
}
