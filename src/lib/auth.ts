
export interface User {
  email: string;
  name?: string;
}

const USER_KEY = "backxy_user";
const AUTH_KEY = "backxy_authenticated";

export function isAuthenticated(): boolean {
  return Boolean(localStorage.getItem(AUTH_KEY));
}

export function login(email: string): void {
  localStorage.setItem(AUTH_KEY, "true");
  // Store minimal user info
  const user: User = { email };
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function logout(): void {
  localStorage.removeItem(AUTH_KEY);
  localStorage.removeItem(USER_KEY);
}

export function getUser(): User | null {
  const userData = localStorage.getItem(USER_KEY);
  if (!userData) return null;
  
  try {
    return JSON.parse(userData) as User;
  } catch (error) {
    console.error("Error parsing user data:", error);
    return null;
  }
}
