"use client"
import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, getAuth, User } from 'firebase/auth';
import {auth} from '../../../../firebase.config';
import Loader from '../Constants/Loader';


interface AuthContextType {
  user: User | null;
}

export const AuthContext = createContext<AuthContextType>({ user: null });

export const useAuthContext = (): AuthContextType => useContext(AuthContext);

export const AuthContextProvider: React.FC<any> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {loading ? <Loader/> : children}
    </AuthContext.Provider>
  );
};
