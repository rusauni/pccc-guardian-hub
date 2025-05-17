
import { createClient } from '@supabase/supabase-js';

// Supabase configuration
// These should be set as environment variables in production
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Check if the Supabase URL and key are provided
if (!supabaseUrl || !supabaseKey) {
  console.warn('Supabase URL or key is missing. Make sure to set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your environment variables.');
}

// Create and export the Supabase client
export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
  }
});

// Authentication helpers
export const auth = {
  // Sign up a new user
  signUp: async (email: string, password: string) => {
    return await supabase.auth.signUp({ email, password });
  },
  
  // Sign in an existing user
  signIn: async (email: string, password: string) => {
    return await supabase.auth.signInWithPassword({ email, password });
  },
  
  // Sign out the current user
  signOut: async () => {
    return await supabase.auth.signOut();
  },
  
  // Get the current user
  getCurrentUser: async () => {
    const { data } = await supabase.auth.getUser();
    return data?.user;
  },
  
  // Get the current session
  getSession: async () => {
    const { data } = await supabase.auth.getSession();
    return data?.session;
  }
};

// Database helpers
export const db = {
  // Generic fetch function with optional filters
  fetch: async <T>(
    tableName: string,
    options?: {
      columns?: string;
      filters?: { column: string; operator: string; value: any }[];
      limit?: number;
      orderBy?: { column: string; ascending?: boolean };
    }
  ): Promise<T[]> => {
    let query = supabase.from(tableName).select(options?.columns || '*');

    // Apply filters if provided
    if (options?.filters) {
      options.filters.forEach(filter => {
        query = query.filter(filter.column, filter.operator, filter.value);
      });
    }

    // Apply order if provided
    if (options?.orderBy) {
      query = query.order(options.orderBy.column, {
        ascending: options.orderBy.ascending !== false
      });
    }

    // Apply limit if provided
    if (options?.limit) {
      query = query.limit(options.limit);
    }

    const { data, error } = await query;

    if (error) {
      console.error(`Error fetching data from ${tableName}:`, error);
      throw error;
    }

    return data as T[];
  },

  // Create a new record
  create: async <T>(
    tableName: string,
    data: Partial<T>
  ): Promise<T> => {
    const { data: insertedData, error } = await supabase
      .from(tableName)
      .insert(data)
      .select()
      .single();

    if (error) {
      console.error(`Error creating record in ${tableName}:`, error);
      throw error;
    }

    return insertedData as T;
  },

  // Update an existing record
  update: async <T>(
    tableName: string,
    id: number | string,
    data: Partial<T>,
    idColumn: string = 'id'
  ): Promise<T> => {
    const { data: updatedData, error } = await supabase
      .from(tableName)
      .update(data)
      .eq(idColumn, id)
      .select()
      .single();

    if (error) {
      console.error(`Error updating record in ${tableName}:`, error);
      throw error;
    }

    return updatedData as T;
  },

  // Delete a record
  delete: async (
    tableName: string,
    id: number | string,
    idColumn: string = 'id'
  ): Promise<void> => {
    const { error } = await supabase
      .from(tableName)
      .delete()
      .eq(idColumn, id);

    if (error) {
      console.error(`Error deleting record from ${tableName}:`, error);
      throw error;
    }
  }
};

// Storage helpers
export const storage = {
  // Upload a file
  upload: async (
    bucketName: string,
    path: string,
    file: File
  ): Promise<string> => {
    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(path, file, {
        cacheControl: '3600',
        upsert: true,
      });

    if (error) {
      console.error(`Error uploading file to ${bucketName}:`, error);
      throw error;
    }

    return data.path;
  },

  // Get a public URL for a file
  getPublicUrl: (bucketName: string, path: string): string => {
    const { data } = supabase.storage.from(bucketName).getPublicUrl(path);
    return data.publicUrl;
  },

  // Delete a file
  delete: async (bucketName: string, paths: string[]): Promise<void> => {
    const { error } = await supabase.storage.from(bucketName).remove(paths);
    
    if (error) {
      console.error(`Error deleting files from ${bucketName}:`, error);
      throw error;
    }
  }
};
