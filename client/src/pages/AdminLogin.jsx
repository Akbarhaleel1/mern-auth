import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';

export default function AdminLogin() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    console.log("Form data is",formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      dispatch(signInStart());
      const res = await fetch('/api/admin/admin-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (!res.ok || data.success === false) {
        setError(data.message || 'An error occurred');
        dispatch(signInFailure(data));
        return;
      }

      dispatch(signInSuccess(data));
      localStorage.setItem('token', data.token);
      navigate('/user-managment'); // Redirect to admin dashboard
    } catch (error) {
      setError('An error occurred. Please try again.');
      dispatch(signInFailure(error));
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-500 to-indigo-600 min-h-screen flex flex-col justify-center items-center">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Admin Login</h2>
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 font-semibold" htmlFor="username">Username</label>
            <input
              className="mt-1 block w-full px-4 py-2 rounded-lg bg-gray-200 border-transparent focus:outline-none focus:bg-white focus:border-blue-500"
              type="text"
              id="username"
              name="username"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold" htmlFor="password">Password</label>
            <input
              className="mt-1 block w-full px-4 py-2 rounded-lg bg-gray-200 border-transparent focus:outline-none focus:bg-white focus:border-blue-500"
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button className="block w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition duration-300">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
