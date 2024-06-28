import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, updateProfile } from 'firebase/auth';
import { auth } from '../firebase';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          await updateProfile(user, { displayName: user.displayName });
          setCurrentUser(user);
        } catch (error) {
          console.error('Ошибка при обновлении профиля пользователя:', error);
        }
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const updateUserProfile = async (newProfile) => {
    if (currentUser) {
      await updateProfile(auth.currentUser, newProfile);
      setCurrentUser({ ...auth.currentUser });
    }
  };

  return (
    <AuthContext.Provider value={{ currentUser, loading, updateUserProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
