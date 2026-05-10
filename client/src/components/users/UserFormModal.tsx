import { useState, useEffect } from "react";
import Modal from "../ui/Modal";
import Input from "../ui/Input";
import Button from "../ui/Button";
import type { User, UserFormData } from "../../types/user.types";

interface Props {
  user: User | null;
  onSave: (data: UserFormData) => void;
  onClose: () => void;
}

export default function UserFormModal({ user, onSave, onClose }: Props) {
  const [form, setForm] = useState<UserFormData>({
    name: user?.name ?? "",
    username: user?.username ?? "",
    role: user?.role ?? "cashier",
  });
  const [errors, setErrors] = useState<Partial<UserFormData>>({});

  useEffect(() => {
    setForm({
      name: user?.name ?? "",
      username: user?.username ?? "",
      role: user?.role ?? "cashier",
    });
    setErrors({});
  }, [user]);

  const validate = (): boolean => {
    const newErrors: Partial<UserFormData> = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.username.trim()) newErrors.username = "Username is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) onSave(form);
  };

  return (
    <Modal title={user ? "Edit User" : "Add User"} onClose={onClose}>
      <div className="flex flex-col gap-4">
        <Input
          label="Full Name"
          value={form.name}
          onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
          placeholder="e.g. Maria Santos"
          error={errors.name}
        />
        <Input
          label="Username"
          value={form.username}
          onChange={(e) => setForm((p) => ({ ...p, username: e.target.value }))}
          placeholder="e.g. maria"
          error={errors.username}
        />
        <div className="flex flex-col gap-1">
          <label className="text-xs text-zinc-500 uppercase tracking-widest">
            Role
          </label>
          <select
            value={form.role}
            onChange={(e) =>
              setForm((p) => ({
                ...p,
                role: e.target.value as "admin" | "cashier",
              }))
            }
            className="h-12 px-4 text-sm bg-zinc-900 text-white border border-zinc-800 rounded-lg outline-none focus:border-red-600 transition-colors"
          >
            <option value="cashier">Cashier</option>
            <option value="admin">Administrator</option>
          </select>
        </div>
        <div className="flex gap-3 mt-2">
          <Button variant="secondary" fullWidth onClick={onClose}>
            Cancel
          </Button>
          <Button fullWidth onClick={handleSubmit}>
            {user ? "Save Changes" : "Add User"}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
