
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase, auth } from '@/lib/supabase';
import { toast } from '@/components/ui/use-toast';

// Define the context type
interface SupabaseContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

// Create the context
const SupabaseContext = createContext<SupabaseContextType | undefined>(undefined);

// Provider component
export const SupabaseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  // Initialize user and session
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Get current session
        const { data: { session: currentSession } } = await supabase.auth.getSession();
        setSession(currentSession);
        
        if (currentSession) {
          const { data: { user: currentUser } } = await supabase.auth.getUser();
          setUser(currentUser);
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        toast({
          variant: "destructive",
          title: "Authentication Error",
          description: "Failed to initialize authentication."
        });
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        setSession(currentSession);
        
        if (event === 'SIGNED_IN' && currentSession) {
          const { data: { user: currentUser } } = await supabase.auth.getUser();
          setUser(currentUser);
          toast({
            title: "Signed in successfully",
            description: "Welcome back!"
          });
        }
        
        if (event === 'SIGNED_OUT') {
          setUser(null);
          setSession(null);
          toast({
            title: "Signed out",
            description: "You have been signed out."
          });
        }
      }
    );

    // Cleanup subscription
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Sign in function
  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      const { error } = await auth.signIn(email, password);
      if (error) throw error;
    } catch (error: any) {
      console.error('Error signing in:', error);
      toast({
        variant: "destructive",
        title: "Sign In Failed",
        description: error.message || "Failed to sign in. Please check your credentials."
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Sign up function
  const signUp = async (email: string, password: string) => {
    setLoading(true);
    try {
      const { error } = await auth.signUp(email, password);
      if (error) throw error;
      toast({
        title: "Account created",
        description: "Your account has been created successfully. Please check your email for verification."
      });
    } catch (error: any) {
      console.error('Error signing up:', error);
      toast({
        variant: "destructive",
        title: "Sign Up Failed",
        description: error.message || "Failed to create account."
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Sign out function
  const signOut = async () => {
    try {
      await auth.signOut();
    } catch (error: any) {
      console.error('Error signing out:', error);
      toast({
        variant: "destructive",
        title: "Sign Out Failed",
        description: error.message || "Failed to sign out."
      });
      throw error;
    }
  };

  // Context value
  const value = {
    user,
    session,
    loading,
    signIn,
    signUp,
    signOut
  };

  return (
    <SupabaseContext.Provider value={value}>
      {children}
    </SupabaseContext.Provider>
  );
};

// Custom hook to use the Supabase context
export const useSupabase = () => {
  const context = useContext(SupabaseContext);
  if (context === undefined) {
    throw new Error('useSupabase must be used within a SupabaseProvider');
  }
  return context;
};
