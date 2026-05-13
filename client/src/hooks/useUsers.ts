import { useState, useEffect, useMemo } from "react";
import type { User, UserFormData, PasswordFormData } from "../types/user.types";
import { userService } from "../services/user.service";
import toast from "react-hot-toast";

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState("");
  const [showUserModal, setShowUserModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await userService.getAll();
      setUsers(data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoading(false);
    }
  };

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

  const saveUser = async (data: UserFormData) => {
    try {
      if (editingUser) {
        await userService.update(editingUser.id, data);
      } else {
        await userService.create({
          ...data,
          password: data.password || "password123",
        });
      }
      await fetchUsers();
      closeUserModal();
      toast.success(editingUser ? "User updated." : "User added.");
    } catch (error) {
      toast.error("Failed to save user.");
    }
  };

  const changePassword = async (data: PasswordFormData): Promise<boolean> => {
    if (!selectedUser) return false;
    if (data.newPassword !== data.confirmPassword) return false;
    try {
      await userService.changePassword(selectedUser.id, data);
      closePasswordModal();
      toast.success("Password changed successfully.");
      return true;
    } catch (error) {
      toast.error("Failed to change password.");
      return false;
    }
  };

  const toggleActive = async (id: number) => {
    try {
      await userService.toggleActive(id);
      await fetchUsers();
    } catch (error) {
      console.error("Failed to toggle user:", error);
    }
  };

  return {
    users: filtered,
    loading,
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
