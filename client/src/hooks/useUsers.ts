import { useState, useMemo } from "react";
import type { User, UserFormData, PasswordFormData } from "../types/user.types";
import { FAKE_USERS } from "../constants/user.fake";

export function useUsers() {
  const [users, setUsers] = useState<User[]>(FAKE_USERS);
  const [search, setSearch] = useState("");
  const [showUserModal, setShowUserModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const filtered = useMemo(() => {
    return users.filter(
      (u) =>
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.username.toLowerCase().includes(search.toLowerCase()),
    );
  }, [users, search]);

  const openAdd = () => {
    setEditingUser(null);
    setShowUserModal(true);
  };

  const openEdit = (user: User) => {
    setEditingUser(user);
    setShowUserModal(true);
  };

  const openChangePassword = (user: User) => {
    setSelectedUser(user);
    setShowPasswordModal(true);
  };

  const closeUserModal = () => {
    setShowUserModal(false);
    setEditingUser(null);
  };

  const closePasswordModal = () => {
    setShowPasswordModal(false);
    setSelectedUser(null);
  };

  const saveUser = (data: UserFormData) => {
    if (editingUser) {
      setUsers((prev) =>
        prev.map((u) => (u.id === editingUser.id ? { ...u, ...data } : u)),
      );
    } else {
      setUsers((prev) => [
        ...prev,
        {
          id: Date.now(),
          ...data,
          isActive: true,
          lastLogin: "Never",
        },
      ]);
    }
    closeUserModal();
  };

  const changePassword = (data: PasswordFormData) => {
    if (data.newPassword !== data.confirmPassword) {
      return false;
    }
    closePasswordModal();
    return true;
  };

  const toggleActive = (id: number) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, isActive: !u.isActive } : u)),
    );
  };

  return {
    users: filtered,
    search,
    setSearch,
    showUserModal,
    showPasswordModal,
    editingUser,
    selectedUser,
    openAdd,
    openEdit,
    openChangePassword,
    closeUserModal,
    closePasswordModal,
    saveUser,
    changePassword,
    toggleActive,
  };
}
