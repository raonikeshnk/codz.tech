// src/components/Login.js
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from 'context/AuthContext';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const history = useHistory();
  const auth = getAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      login();
      console.log("Login Success!");
      history.push('/add-blog');
    } catch (error) {
      console.error('Error signing in: ', error);
      alert('Invalid credentials');
    }
  };

  return (
    <div className="container" style={{ height: '90vh' }}>
      <div className="row justify-content-center pt-5">
        <div className="col-md-6 mt-5">
          <div className="card mt-5">
            <div className="card-body text-left my-3">
              <h2 className="card-title text-center">Login</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    id="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password:</label>
                  <input
                    type="password"
                    id="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-block mt-3">
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
