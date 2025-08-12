import React, { useEffect, useState, createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext({
  user: null,
  login: async () => {},
  logout: () => {},
  isAuthenticated: false,
  hasRole: () => false,
});

// Custom hook to use AuthContext
export const useAuth = () => useContext(AuthContext);

// Mock database for demo purposes
const mockUsers = [
  {
    id: "1",
    name: "John Staff",
    email: "staff@example.com",
    password: "password",
    role: "staff",
    hasCustomerCareAccess: false,
  },
  {
    id: "2",
    name: "Jane Manager",
    email: "manager@example.com",
    password: "password",
    role: "manager",
    hasCustomerCareAccess: true,
  },
  {
    id: "3",
    name: "Admin User",
    email: "admin@example.com",
    password: "password",
    role: "admin",
    hasCustomerCareAccess: true,
  },
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Load session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Login function
  const login = async (email, password) => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const foundUser = mockUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (!foundUser) {
      throw new Error("Invalid credentials");
    }

    const { password: _, ...userWithoutPassword } = foundUser;
    setUser(userWithoutPassword);
    localStorage.setItem("user", JSON.stringify(userWithoutPassword));

    // Redirect based on role
    if (userWithoutPassword.role === "admin") {
      navigate("/admin");
    } else if (userWithoutPassword.role === "manager") {
      navigate("/manager");
    } else {
      navigate("/staff");
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/login");
  };

  // Role checker
  const hasRole = (roles) => {
    return user ? roles.includes(user.role) : false;
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    hasRole,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;