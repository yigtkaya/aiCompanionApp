import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import { Alert } from 'react-native';
import { useTranslation } from 'react-i18next';

export interface AuthContextData {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signInWithOAuth: (provider: 'apple' | 'google') => Promise<boolean>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { t } = useTranslation();
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);


  const signInWithOAuth = async (provider: 'apple' | 'google'): Promise<boolean> => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: 'aicompanionapp://auth/callback'
        }
      });

      if (error) {
        Alert.alert(t('auth.errors.signInError'), error.message);
        return false;
      }

      return true;
    } catch (error) {
      Alert.alert(t('auth.errors.signInError'), t('auth.errors.unexpectedError'));
      return false;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async (): Promise<void> => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) {
        Alert.alert(t('auth.errors.signOutError'), error.message);
      }
    } catch (error) {
      Alert.alert(t('auth.errors.signOutError'), t('auth.errors.unexpectedError'));
    } finally {
      setLoading(false);
    }
  };


  const value: AuthContextData = {
    user,
    session,
    loading,
    signInWithOAuth,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}