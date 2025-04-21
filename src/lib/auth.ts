
import { supabase } from "@/integrations/supabase/client";

export interface User {
  email: string;
  name?: string;
}

export async function isAuthenticated(): Promise<boolean> {
  const { data } = await supabase.auth.getSession();
  return !!data.session;
}

export async function login(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });
  if (error) throw error;
  return data.user;
}

export async function register(email: string, password: string, name: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { name }
    }
  });
  if (error) throw error;
  return data.user;
}

export async function logout(): Promise<void> {
  await supabase.auth.signOut();
}

export async function getUser(): Promise<User | null> {
  const { data } = await supabase.auth.getUser();
  if (!data.user) return null;
  return {
    email: data.user.email!,
    name: data.user.user_metadata?.name
  };
}
