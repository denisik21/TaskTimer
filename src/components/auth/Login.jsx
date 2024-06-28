import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('User logged in successfully');
      navigate('/');
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    }
  };

  return (
    <div className='mx-auto my-auto'>
      <div className="w-full max-w-md p-8 bg-zinc-800 rounded-lg shadow-xl">
        <h2 className="text-2xl font-bold mb-6 text-pink-400 text-center">Login</h2>
        {error && <p className="mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="Email" 
            className="w-full p-2 border border-gray-700 rounded focus:outline-none focus:border-pink-500"
          />
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Password"
            className="w-full p-2 border border-gray-700 rounded focus:outline-none focus:border-pink-500"
          />
          <div className="flex justify-end mt-4">
            <button type="submit" className="py-2 px-5 bg-pink-500 text-white rounded hover:bg-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-opacity-50">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
