// src/components/AuthPage.tsx
import { useEffect, useState } from 'react';
import { FaUser, FaEnvelope, FaLock, FaSun, FaMoon } from 'react-icons/fa';
import { useSettings } from '../context/SettingContext';
import { dbUserType, useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FirebaseError } from 'firebase/app';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db } from '../services/Firebase';
import { addDoc, collection, getDocs } from 'firebase/firestore';

interface FormData {
  username: string;
  email: string;
  password: string;
}

interface Errors {
  username?: string;
  email?: string;
  password?: string;
  login?: string;
}

export default function Login() {
  const { theme, toggleTheme } = useSettings();
  const { currentUser, loading } = useAuth();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState<FormData>({
    username: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState<Errors>({});
  const[isUsernameExist,setIsUsernameExist] = useState<boolean | null>(null)

  useEffect(() => {
    if (currentUser) {
      navigate('/');
    }
  }, [currentUser, navigate]);

  const handleError = (error: unknown) => {
    if (error instanceof FirebaseError) {
      switch (error.code) {
        case 'auth/email-already-in-use':
          return 'Email already in use.';
        case 'auth/network-request-failed':
          return 'Network error. Please check your connection.';
        case 'auth/wrong-password':
          return 'Invalid password.';
        case 'auth/user-not-found':
          return 'User not found.';
        case 'auth/invalid-credential':
          return 'Invalid email or password'
        case 'auth/too-many-requests':
          return 'Too many attempts. Try again later.';
        case 'auth/weak-password':
          return 'Password must be at least 6 characters.';
        case 'auth/invalid-email':
          return 'Invalid email address.';
        default:
          // console.error('Firebase error:', error);
          return 'Authentication failed. Please try again.';
      }
    }
    // console.error('Unexpected error:', error);
    return 'An unexpected error occurred.';
  };

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm() || isUsernameExist ) return;

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth,formData.email, formData.password)
      } else {
        const credentials =await createUserWithEmailAndPassword(auth,formData.email,formData.password)
        await addDoc(collection(db,'users'),{
          email:formData.email,
          userName:formData.username,

        })
        await updateProfile(credentials.user,{displayName:formData.username})
      }
    } catch (error) {
      setErrors(prev => ({ ...prev, login: handleError(error) }));
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

  const checkUserName = async()=>{
    try{
          const querrySnapshot = await getDocs(collection(db,'users'));
          const fetchData = querrySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(), 
            })as dbUserType)
            const allUserNames =fetchData.map((nam)=>nam.userName)
            console.log(allUserNames)
            if(allUserNames && allUserNames.includes(formData.username.toLowerCase())){
              setIsUsernameExist(true)
            }else{
              setIsUsernameExist(false)

            }
            
      }catch(er){
          // console.log(er)
      
      }


}
useEffect(()=>{
  const fetchUserNamesData=async()=>{
   await checkUserName()

  }
  fetchUserNamesData()


},[formData.username])

  if (loading) return <h1>Loading...</h1>;

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
          {errors.login && <p className='p-2 bg-red-400'>{errors.login}</p>}
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
              {isUsernameExist && <p className="text-red-500 text-sm mt-1">Username exists</p>}
              
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
            className={`w-full py-2 rounded-lg transition duration-200 cursor-pointer ${
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
            className={`hover:underline focus:outline-none cursor-pointer ${
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
