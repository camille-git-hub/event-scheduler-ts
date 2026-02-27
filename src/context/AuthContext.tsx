import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext<ReactProviderProps | null>(null);

type ReactProviderProps = {
    token: string | null;
    isAuthenticated: boolean;
    loading: boolean;
    loginUser: (token: string) => void;
    logoutUser: () => void;
};

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    setToken(savedToken); 
    setLoading(false); 
  }, []);

  function loginUser(newToken: string) {
    setToken(newToken);
    localStorage.setItem("token", newToken);
  }

  function logoutUser() {
    setToken(null);
    localStorage.removeItem("token");
  }

  const isAuthenticated = Boolean(token);

  const value = {
    token,
    isAuthenticated,
    loading,
    loginUser,
    logoutUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
