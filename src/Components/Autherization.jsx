import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Authorization() {
  const [CurrentPage, setCurrentPage] = useState('signup')
  const navigate = useNavigate();

  async function handleSignup(e) {
    e.preventDefault();
    const data = {
      name: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value
    }
    console.log(data)
    try {
      const res = await axios.post('http://localhost:5500/auth/signup', data);
      console.log(res.data);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      alert("Signup successful!");
      navigate('/profile');
    } catch (error) {
      console.error("Error during signup:", error);
      alert("Signup failed. Please try again.");
    }
  }

  async function handleLogin(e) {
    e.preventDefault();
    const data = {
      email: e.target.email.value,
      password: e.target.password.value
    }
    try {
      const res = await axios.post('http://localhost:5500/auth/login', data);
      console.log(res.data);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      alert("Login successful!");
      navigate('/profile');
    } catch (error) {
      console.error("Error during login:", error);
      alert("Login failed. Please try again.");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white rounded-3xl shadow-lg max-w-md w-full p-10
                      animate-fadeIn
                      transition-transform transform
                      duration-500
                      ease-in-out">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center tracking-tight">
          {CurrentPage === 'signup' ? 'Create an Account' : 'Welcome Back'}
        </h2>

        {CurrentPage === 'signup' && (
          <form onSubmit={handleSignup} className="space-y-6">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              required
              className="w-full px-5 py-3 rounded-lg border border-gray-300 
                         focus:outline-none focus:ring-2 focus:ring-indigo-500
                         focus:border-transparent transition"
            />
            <input
              type="email"
              name="email"
              placeholder="Email address"
              required
              className="w-full px-5 py-3 rounded-lg border border-gray-300 
                         focus:outline-none focus:ring-2 focus:ring-indigo-500
                         focus:border-transparent transition"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              className="w-full px-5 py-3 rounded-lg border border-gray-300 
                         focus:outline-none focus:ring-2 focus:ring-indigo-500
                         focus:border-transparent transition"
              autoComplete='password'
            />
            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700
                         text-white font-semibold text-lg transition"
            >
              Sign Up
            </button>
          </form>
        )}

        {/* Login Section */}
        {CurrentPage === 'login' && (
          <form onSubmit={handleLogin} className="space-y-6">
            <input
              type="email"
              name="email"
              placeholder="Email address"
              required
              className="w-full px-5 py-3 rounded-lg border border-gray-300 
                         focus:outline-none focus:ring-2 focus:ring-indigo-500
                         focus:border-transparent transition"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              className="w-full px-5 py-3 rounded-lg border border-gray-300 
                         focus:outline-none focus:ring-2 focus:ring-indigo-500
                         focus:border-transparent transition"
            />
            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700
                         text-white font-semibold text-lg transition"
            >
              Log In
            </button>
          </form>
        )}

        {/* Switch between login and signup */}
        <div className="mt-8 text-center text-gray-600 text-sm">
          {CurrentPage === 'signup' ? (
            <>
              Already have an account?{' '}
              <button
                onClick={() => setCurrentPage('login')}
                className="text-indigo-600 font-semibold hover:underline focus:outline-none"
              >
                Log in
              </button>
            </>
          ) : (
            <>
              Don't have an account?{' '}
              <button
                onClick={() => setCurrentPage('signup')}
                className="text-indigo-600 font-semibold hover:underline focus:outline-none"
              >
                Sign up
              </button>
            </>
          )}
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          0% {opacity: 0; transform: translateY(15px);}
          100% {opacity: 1; transform: translateY(0);}
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s ease forwards;
        }
      `}</style>
    </div>
  )
}
