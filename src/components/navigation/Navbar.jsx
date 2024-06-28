import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { GoChevronDown } from "react-icons/go";

const Navbar = () => {
    const [user, setUser] = useState(null);
    const [showMenu, setShowMenu] = useState(false);
    const navigate = useNavigate();
  
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
      });
      return () => unsubscribe();
    }, []);
  
    const handleLogout = async () => {
      await signOut(auth);
      setUser(null);
      navigate('/login');
    };

    const toggleMenu = () => {
      setShowMenu(!showMenu);
    };

    const closeMenu = () => {
      setShowMenu(false);
    };
  
    return (
      <nav className="bg-zinc-800 pt-5 w-60 overflow-auto h-screen">
        <ul className="space-y-3 text-white">
          {!user ? (
            <>
              <li>
                <Link to="/login" className="block py-2 px-5 rounded hover:bg-zinc-700 transition duration-300">Login</Link>
              </li>
              <li>
                <Link to="/register" className="block py-2 px-5 rounded hover:bg-zinc-700 transition duration-300">Register</Link>
              </li>
            </>
          ) : (
            <>
              <li className="text-center relative">
                <span>Здравствуйте, {user.displayName}!</span>
                <button 
                  onClick={toggleMenu} 
                  className="ml-4 shadow-sm text-sm font-medium text-white"
                >
                  <GoChevronDown />
                </button>
                {showMenu && (
                  <div className="absolute right-0 mt-2 w-35 bg-white shadow-lg rounded-md overflow-hidden z-10">
                    <Link to="/edit-profile" onClick={(e) => { e.preventDefault(); navigate('/edit-profile'); closeMenu(); }} className="block px-4 py-2 text-sm text-gray-700 hover:bg-pink-400 hover:text-white">
                      Редактировать
                    </Link>
                    <Link to="/" onClick={(e) => { e.preventDefault(); handleLogout(); closeMenu(); }} className="block px-4 py-2 text-sm text-gray-700 hover:bg-pink-400 hover:text-white">
                      Выйти
                    </Link>
                  </div>
                )}
              </li>
              <li>
                <Link to="/" className="block py-2 px-5 rounded hover:bg-zinc-700 transition duration-300">Home</Link>
              </li>
              <li>
                <Link to="/list" className="block py-2 px-5 rounded hover:bg-zinc-700 transition duration-300">Todo List</Link>
              </li>
              <li>
                <Link to="/grap" className="block py-2 px-5 rounded hover:bg-zinc-700 transition duration-300">Calendar</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    );
};

export default Navbar;
