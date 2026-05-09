import { AuthProvider } from "./context/AuthContext";
import LoginPage from "./pages/auth/LoginPage";

export default function App() {
  return (
    <AuthProvider>
      <LoginPage />
    </AuthProvider>
  );
}
