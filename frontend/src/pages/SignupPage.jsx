import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Mail, User } from 'lucide-react';

const API_URL = 'http://localhost:8000'

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setErrors({});
    setIsLoading(true);

    if (formData.password !== formData.password2) {
      setErrors({ password2: ['Passwords do not match'] });
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message || 'Registration successful');
        // Clear the form
        setFormData({
          name: '',
          email: '',
          password: '',
          password2: ''
        });
      } else {
        if (data.errors) {
          setErrors(data.errors);
        } else {
          setMessage(data.error || 'Registration failed');
        }
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
      console.error('Registration error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-animation">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="overflow-hidden bg-white rounded-lg shadow-xl">
          <div className="p-8">
            <h2 className="mb-2 text-2xl font-bold text-center text-gray-800">Welcome!</h2>
            <p className="mb-8 text-center text-gray-600">Create a new account</p>
            {message && <p className={`mb-4 text-center ${message.includes('successful') ? 'text-green-500' : 'text-red-500'}`}>{message}</p>}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-gray-700">Name</label>
                <div className="relative">
                  <User className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" size={18} />
                  <input
                    id="name"
                    type="text"
                    placeholder="Enter your name"
                    className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name[0]}</p>}
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
                <div className="relative">
                  <Mail className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" size={18} />
                  <input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email[0]}</p>}
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
                <div className="relative">
                  <Lock className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" size={18} />
                  <input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password[0]}</p>}
              </div>
              
              <div className="space-y-2">
                <label htmlFor="password2" className="text-sm font-medium text-gray-700">Retype password</label>
                <div className="relative">
                  <Lock className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" size={18} />
                  <input
                    id="password2"
                    type="password"
                    placeholder="Retype password"
                    className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={formData.password2}
                    onChange={handleChange}
                    required
                  />
                </div>
                {errors.password2 && <p className="mt-1 text-xs text-red-500">{errors.password2[0]}</p>}
              </div>

              <motion.button
                type="submit"
                className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={isLoading}
              >
                {isLoading ? 'Signing Up...' : 'Sign Up'}
              </motion.button>
            </form>
          </div>
        </div>
      </motion.div>
      <style jsx global>{`
        @keyframes gradientAnimation {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .bg-gradient-animation {
          background: linear-gradient(-45deg, #ffffff, #e6f2ff, #b3d9ff, #ffffff);
          background-size: 400% 400%;
          animation: gradientAnimation 15s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default Signup;