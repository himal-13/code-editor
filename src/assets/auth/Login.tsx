// src/components/AuthPage.tsx
import { useState } from 'react';
import { FaUser, FaEnvelope, FaLock,  FaSun, FaMoon } from 'react-icons/fa';
import { useSettings } from '../../context/SettingContext';
import { auth, } from '../services/Firebase';
import { createUserWithEmailAndPassword, } from 'firebase/auth';


interface FormData {
  username: string;
  email: string;
  password: string;
}

interface Errors {
  username?: string;
  email?: string;
  password?: string;
}

export default function AuthPage() {
  const { theme, toggleTheme } = useSettings();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState<FormData>({
    username: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState<Errors>({});

  const validateForm = (): boolean => {
    const newErrors: Errors = {};
    
    if (!isLogin && !formData.username.trim()) {
      newErrors.username = 'Username is required';
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Valid email is required';
    }

    if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit =async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form submitted:', formData);
     try{
        await createUserWithEmailAndPassword(auth,formData.email,formData.password)

     }catch(e){
        

     }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: undefined }));
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setFormData({ username: '', email: '', password: '' });
    setErrors({});
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 ${
      theme === 'light' ? 'bg-gray-100' : 'bg-gray-900'
    }`}>
      <div className={`rounded-lg shadow-lg p-8 w-full max-w-md relative ${
        theme === 'light' ? 'bg-white' : 'bg-gray-800'
      }`}>
        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className={`absolute top-4 right-4 p-2 rounded-full transition-colors ${
            theme === 'light' ? 'bg-gray-100 hover:bg-gray-200' : 'bg-gray-700 hover:bg-gray-600'
          }`}
        >
          {theme === 'light' ? (
            <FaMoon className="text-gray-600" />
          ) : (
            <FaSun className="text-gray-300" />
          )}
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className={`text-3xl font-bold ${
            theme === 'light' ? 'text-gray-800' : 'text-white'
          }`}>
            {isLogin ? 'Login' : 'Sign Up'}
          </h1>
          <p className={`mt-2 ${
            theme === 'light' ? 'text-gray-500' : 'text-gray-300'
          }`}>
            {isLogin 
              ? 'Welcome back! Please sign in to continue'
              : 'Create a new account to get started'}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Username Field */}
          {!isLogin && (
            <div>
              <label className={`block mb-2 ${
                theme === 'light' ? 'text-gray-700' : 'text-gray-300'
              }`}>
                Username
              </label>
              <div className="relative">
                <FaUser className={`absolute top-3 left-3 ${
                  theme === 'light' ? 'text-gray-400' : 'text-gray-500'
                }`} />
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none ${
                    theme === 'light'
                      ? 'bg-white text-gray-800 border-gray-300 focus:border-blue-500'
                      : 'bg-gray-700 text-white border-gray-600 focus:border-blue-400'
                  }`}
                  placeholder="jhonDoe123"
                />
              </div>
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">{errors.username}</p>
              )}
            </div>
          )}

          {/* Email Field */}
          <div>
            <label className={`block mb-2 ${
              theme === 'light' ? 'text-gray-700' : 'text-gray-300'
            }`}>
              Email
            </label>
            <div className="relative">
              <FaEnvelope className={`absolute top-3 left-3 ${
                theme === 'light' ? 'text-gray-400' : 'text-gray-500'
              }`} />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none ${
                  theme === 'light'
                    ? 'bg-white text-gray-800 border-gray-300 focus:border-blue-500'
                    : 'bg-gray-700 text-white border-gray-600 focus:border-blue-400'
                }`}
                placeholder="email"
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label className={`block mb-2 ${
              theme === 'light' ? 'text-gray-700' : 'text-gray-300'
            }`}>
              Password
            </label>
            <div className="relative">
              <FaLock className={`absolute top-3 left-3 ${
                theme === 'light' ? 'text-gray-400' : 'text-gray-500'
              }`} />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none ${
                  theme === 'light'
                    ? 'bg-white text-gray-800 border-gray-300 focus:border-blue-500'
                    : 'bg-gray-700 text-white border-gray-600 focus:border-blue-400'
                }`}
                placeholder="Password"
              />
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            className={`w-full py-2 rounded-lg transition duration-200 ${
              theme === 'light'
                ? 'bg-blue-500 hover:bg-blue-600 text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>

        {/* Social Login Section */}
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className={`w-full border-t ${
                theme === 'light' ? 'border-gray-300' : 'border-gray-600'
              }`}></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className={`px-2 ${
                theme === 'light' ? 'bg-white text-gray-500' : 'bg-gray-800 text-gray-400'
              }`}>
                Or 
              </span>
            </div>
          </div>
        </div>

        <p className={`text-center mt-6 ${
          theme === 'light' ? 'text-gray-600' : 'text-gray-400'
        }`}>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            onClick={toggleAuthMode}
            className={`hover:underline focus:outline-none ${
              theme === 'light' ? 'text-blue-500' : 'text-blue-400'
            }`}
          >
            {isLogin ? 'Sign up here' : 'Login here'}
          </button>
        </p>
      </div>
    </div>
  );
}
