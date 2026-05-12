import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Modal from "../ui/Modal";
import Button from "../ui/Button";
import type { User, PasswordFormData } from "../../types/user.types";

interface Props {
  user: User;
  onSave: (data: PasswordFormData) => Promise<boolean>;
  onClose: () => void;
}

export default function PasswordModal({ user, onSave, onClose }: Props) {
  const [form, setForm] = useState<PasswordFormData>({
    newPassword: "",
    confirmPassword: "",
  });
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    if (!form.newPassword) return setError("Password is required");
    if (form.newPassword.length < 6)
      return setError("Password must be at least 6 characters");
    if (form.newPassword !== form.confirmPassword)
      return setError("Passwords do not match");

    const result = await onSave(form);
    if (result) setSuccess(true);
  };

  return (
    <Modal title="Change Password" onClose={onClose}>
      <div className="flex flex-col gap-4">
        <div className="bg-zinc-800 rounded-xl px-4 py-3 flex items-center gap-3">
          <div
            className={`w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-medium shrink-0 ${user.role === "admin" ? "bg-red-600" : "bg-zinc-600"}`}
          >
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="text-sm text-white font-medium">{user.name}</p>
            <p className="text-xs text-zinc-500 capitalize">{user.role}</p>
          </div>
        </div>

        {success ? (
          <div className="bg-green-950 border border-green-800 rounded-xl px-4 py-3 text-center">
            <p className="text-sm text-green-400 font-medium">
              Password changed successfully!
            </p>
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-zinc-500 uppercase tracking-widest">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showNew ? "text" : "password"}
                  value={form.newPassword}
                  onChange={(e) => {
                    setForm((p) => ({ ...p, newPassword: e.target.value }));
                    setError("");
                  }}
                  placeholder="Min. 6 characters"
                  className="w-full h-12 px-4 pr-10 text-sm bg-zinc-900 text-white border border-zinc-800 rounded-lg outline-none focus:border-red-600 transition-colors"
                />
                <button
                  onClick={() => setShowNew((p) => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
                >
                  {showNew ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs text-zinc-500 uppercase tracking-widest">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirm ? "text" : "password"}
                  value={form.confirmPassword}
                  onChange={(e) => {
                    setForm((p) => ({ ...p, confirmPassword: e.target.value }));
                    setError("");
                  }}
                  placeholder="Repeat new password"
                  className="w-full h-12 px-4 pr-10 text-sm bg-zinc-900 text-white border border-zinc-800 rounded-lg outline-none focus:border-red-600 transition-colors"
                />
                <button
                  onClick={() => setShowConfirm((p) => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
                >
                  {showConfirm ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {error && <p className="text-xs text-red-500">{error}</p>}
          </>
        )}

        <div className="flex gap-3">
          <Button variant="secondary" fullWidth onClick={onClose}>
            {success ? "Close" : "Cancel"}
          </Button>
          {!success && (
            <Button fullWidth onClick={handleSubmit}>
              Change Password
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
}
