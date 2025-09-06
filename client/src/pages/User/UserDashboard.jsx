import { useAuth } from "../../context/AuthContext"

export default function UserDashboard() {
  const { user, logout } = useAuth()

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Welcome, {user?.name || user?.email}</h1>
      <p>Email: {user?.email}</p>
      <p>Role: {user?.role}</p>
      <button
        onClick={logout}
        className="mt-4 px-4 py-2 bg-red-600 text-white rounded"
      >
        Logout
      </button>
    </div>
  )
}
