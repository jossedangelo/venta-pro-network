
export function isAuthenticated() {
  return Boolean(localStorage.getItem("is_authenticated"));
}

export function login() {
  localStorage.setItem("is_authenticated", "true");
}

export function logout() {
  localStorage.removeItem("is_authenticated");
}
