'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth, db } from '@/lib/firebase';
import { ref, onValue, off } from 'firebase/database';

interface UserData {
  name: string;
  email: string;
  role: 'user' | 'admin';
  createdAt: string;
  updatedAt: string;
}

type AuthContextType = {
  user: User | null;
  userData: UserData | null;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType>({ user: null, userData: null, loading: true });

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let dbUnsubscribe = () => {};

    const authUnsubscribe = onAuthStateChanged(auth, (currentUser) => {
      dbUnsubscribe(); // Clean up previous listener

      if (currentUser) {
        setUser(currentUser);
        const userRef = ref(db, 'users/' + currentUser.uid);

        const listener = onValue(userRef, (snapshot) => {
          setUserData(snapshot.val() as UserData);
          setLoading(false);
        }, () => {
          setUserData(null);
          setLoading(false);
        });

        dbUnsubscribe = () => off(userRef, 'value', listener);
      } else {
        setUser(null);
        setUserData(null);
        setLoading(false);
      }
    });

    return () => {
      authUnsubscribe();
      dbUnsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, userData, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
