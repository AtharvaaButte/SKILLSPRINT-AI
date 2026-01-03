import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { signupWithEmail, handleGoogleLogin, loginWithEmail, logoutUser, subscribeToAuthChanges } from '../auth/auth.service'
import { AppUser } from '@/types/roadmap';
import { mapFirebaseAuthError } from '@/components/auth/auth.error';
interface AuthResult {
  success: boolean;
  error?: string;
}

export interface SignupData {
  name: string;
  email: string;
  password: string;
}

interface AuthContextType {
  user: AppUser | null;
  login: (email: string, password: string) => Promise<AuthResult>;
  signup: (data: SignupData) => Promise<AuthResult>;
  loginWithGoogle: () => Promise<AuthResult>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);


export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null);

  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges((firebaseUser) => {
      if (firebaseUser) {
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName
        })
      } else{
        setUser(null);
      }
    })
    return unsubscribe;
  }, [])

  const login = async (email: string, password: string) => {
    try {
      const firebaseUser = await loginWithEmail(email, password);
      setUser({
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        displayName: firebaseUser.displayName
      })
      return { success: true };
    } catch (err) {
      return { success: false, error: mapFirebaseAuthError(err) };
    }
  };

  const signup = async (data: SignupData) => {
    try {
      const firebaseUser = await signupWithEmail(data.name, data.email, data.password)
      setUser({
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        displayName: data.name
      })
      return { success: true };
    } catch (err) {
      return { success: false, error: mapFirebaseAuthError(err)};
    }
  }
  const loginWithGoogle = async () => {
    try {
      const firebaseUser = await handleGoogleLogin();
      setUser({
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        displayName: firebaseUser.displayName
      })
      return { success: true };
    } catch (err) {
      return { success: false, error: mapFirebaseAuthError(err) };
    }
  };

  const logout = () => {
    logoutUser();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, loginWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
