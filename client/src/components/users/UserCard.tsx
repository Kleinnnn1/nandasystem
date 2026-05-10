import { Pencil, KeyRound } from "lucide-react";
import type { User } from "../../types/user.types";

interface Props {
  user: User;
  onEdit: (user: User) => void;
  onChangePassword: (user: User) => void;
}

export default function UserCard({ user, onEdit, onChangePassword }: Props) {
  const initial = user.name.charAt(0).toUpperCase();
  const isAdmin = user.role === "admin";

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 flex flex-col items-center gap-3 text-center hover:border-zinc-700 transition-colors">
      {/* Avatar */}
      <div
        className="w-14 h-14 rounded-full flex items-center justify-center text-white text-xl font-medium"
        style={{ background: isAdmin ? "#dc2626" : "#374151" }}
      >
        {initial}
      </div>

      {/* Info */}
      <div>
        <p className="text-sm text-white font-medium">{user.name}</p>
        <p className="text-xs text-zinc-500 mb-2">@{user.username}</p>
        <span
          className="text-xs px-3 py-0.5 rounded-full font-medium"
          style={{
            background: isAdmin ? "#1f1010" : "#1a1a2e",
            color: isAdmin ? "#dc2626" : "#6b7bff",
          }}
        >
          {isAdmin ? "Administrator" : "Cashier"}
        </span>
      </div>

      {/* Status */}
      <div className="flex items-center gap-1.5">
        <div
          className="w-1.5 h-1.5 rounded-full"
          style={{ background: user.isActive ? "#22c55e" : "#374151" }}
        />
        <p className="text-xs text-zinc-500">
          {user.isActive ? "Active" : "Inactive"} · Last login: {user.lastLogin}
        </p>
      </div>

      {/* Actions */}
      <div className="flex gap-2 w-full">
        <button
          onClick={() => onEdit(user)}
          className="flex-1 h-8 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center gap-1.5 text-xs text-zinc-400 hover:text-white hover:border-red-600 transition-all"
        >
          <Pencil size={12} /> Edit
        </button>
        <button
          onClick={() => onChangePassword(user)}
          className="flex-1 h-8 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center gap-1.5 text-xs text-zinc-400 hover:text-white hover:border-red-600 transition-all"
        >
          <KeyRound size={12} /> Password
        </button>
      </div>
    </div>
  );
}
