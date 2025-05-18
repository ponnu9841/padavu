export const getToken = () => localStorage.getItem("token");
export const setToken = (token: string) => localStorage.setItem("token", token);
export const clearToken = () => localStorage.clear();

export const setUser = (user: string) => localStorage.setItem("user", user);
export const getUser = () => JSON.parse(localStorage.getItem("user") || "");
