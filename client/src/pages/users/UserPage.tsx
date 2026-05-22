import { Search, Plus } from "lucide-react";
import { useUsers } from "../../hooks/useUsers";
import UserCard from "../../components/users/UserCard";
import UserFormModal from "../../components/users/UserFormModal";
import PasswordModal from "../../components/users/PasswordModal";
import Button from "../../components/ui/Button";

export default function UsersPage() {
  const {
    users,
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
  } = useUsers();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <div className="relative flex-1">
          <Search
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search users..."
            className="w-full h-10 bg-zinc-900 border border-zinc-800 rounded-xl pl-9 pr-4 text-sm text-white placeholder-zinc-600 outline-none focus:border-red-600 transition-colors"
          />
        </div>
        <Button onClick={openAdd} size="md" className="w-full sm:w-auto">
          <Plus size={15} className="mr-1.5" /> Add User
        </Button>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 h-52 animate-pulse"
            />
          ))}
        </div>
      ) : users.length === 0 ? (
        <div className="flex items-center justify-center h-48 text-zinc-700 text-sm">
          No users found
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {users.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              onEdit={openEdit}
              onChangePassword={openChangePassword}
            />
          ))}
        </div>
      )}

      {showUserModal && (
        <UserFormModal
          user={editingUser}
          onSave={saveUser}
          onClose={closeUserModal}
        />
      )}
      {showPasswordModal && selectedUser && (
        <PasswordModal
          user={selectedUser}
          onSave={changePassword}
          onClose={closePasswordModal}
        />
      )}
    </div>
  );
}
