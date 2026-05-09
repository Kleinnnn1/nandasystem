import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";

export function useAuth() {
  const { login, logout, user, isAuthenticated, isLoading, error } =
    useAuthContext();
  const [password, setPassword] = useState<string>("");

  const handleLogin = async () => {
    if (!password.trim()) return;
    await login(password);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleLogin();
  };

  return {
    password,
    setPassword,
    handleLogin,
    handleKeyDown,
    user,
    isAuthenticated,
    isLoading,
    error,
    logout,
  };
}
