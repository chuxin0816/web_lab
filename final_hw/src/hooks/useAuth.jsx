import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState({
    id: '1',
    username: 'test',
    role: 'STUDENT'
  });
  const [loading, setLoading] = useState(false);

  const login = async (username, password) => {
    setUser({
      id: '1',
      username,
      role: 'STUDENT'
    });
  };

  const logout = () => {
    setUser(null);
  };

  const value = {
    user,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
} 