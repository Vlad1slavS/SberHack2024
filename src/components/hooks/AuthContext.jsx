import React, { createContext, useContext, useState } from "react";

// Создаем контекст
const AuthContext = createContext();

// Создаем провайдер для контекста
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

// Создаем хук для использования контекста
export const useAuth = () => useContext(AuthContext);
