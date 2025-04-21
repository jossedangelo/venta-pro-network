
import { createClient } from '@supabase/supabase-js';

export interface User {
  email: string;
  name?: string;
}

// Verificamos que las variables de entorno existan
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Verificamos si las variables están definidas antes de crear el cliente
if (!supabaseUrl || !supabaseKey) {
  console.error('Las variables de entorno de Supabase no están definidas correctamente. Asegúrate de tener VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY en tu proyecto.');
}

// Creamos el cliente solo si tenemos las credenciales
export const supabase = (supabaseUrl && supabaseKey) 
  ? createClient(supabaseUrl, supabaseKey)
  : null;

// Modificamos las funciones para manejar el caso cuando supabase es null
export async function isAuthenticated(): Promise<boolean> {
  if (!supabase) return false;
  const { data } = await supabase.auth.getSession();
  return !!data.session;
}

export async function login(email: string, password: string) {
  if (!supabase) throw new Error('Supabase no está configurado correctamente');
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });
  if (error) throw error;
  return data.user;
}

export async function register(email: string, password: string, name: string) {
  if (!supabase) throw new Error('Supabase no está configurado correctamente');
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
  if (!supabase) return;
  await supabase.auth.signOut();
}

export async function getUser(): Promise<User | null> {
  if (!supabase) return null;
  const { data } = await supabase.auth.getUser();
  if (!data.user) return null;
  return {
    email: data.user.email!,
    name: data.user.user_metadata?.name
  };
}
