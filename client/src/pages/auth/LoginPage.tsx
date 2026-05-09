import { APP_NAME, APP_SUBTITLE } from "../../constants";
import { useAuth } from "../../hooks/useAuth";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

export default function LoginPage() {
  const {
    password,
    setPassword,
    handleLogin,
    handleKeyDown,
    isLoading,
    error,
  } = useAuth();

  return (
    <div className="min-h-screen bg-zinc-900 flex items-center justify-center px-4">
      <div className="flex flex-col items-center w-full max-w-sm">
        {/* Logo */}
        <div className="w-20 h-20 rounded-full bg-red-600 flex items-center justify-center mb-5">
          <span className="text-white font-medium text-xl">N&A</span>
        </div>

        {/* Store name */}
        <h1 className="text-white text-2xl font-medium mb-1">{APP_NAME}</h1>
        <p className="text-zinc-500 text-xs tracking-widest uppercase mb-10">
          {APP_SUBTITLE}
        </p>

        {/* Password input */}
        <div className="w-full flex gap-0">
          <div className="flex-1">
            <Input
              type="password"
              placeholder="Enter password to continue..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyDown}
              error={error ?? undefined}
              className="rounded-r-none"
            />
          </div>
          <Button
            onClick={handleLogin}
            loading={isLoading}
            size="lg"
            className="rounded-l-none h-12 shrink-0"
          >
            Login
          </Button>
        </div>
      </div>
    </div>
  );
}
