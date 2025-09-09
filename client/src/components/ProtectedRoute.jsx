import { Navigate } from "react-router"
import { useAuth } from "../context/AuthContext"

export default function ProtectedRoute({ children, role }) {
  const { user, loading } = useAuth()

  // While fetching user, don’t redirect yet
  if (loading) {
    return <div>Loading...</div>  // You can replace with a spinner
  }

  // If not logged in → redirect to login
  if (!user) {
    return <Navigate to="/login" replace />
  }

  // If route requires role and user role mismatch
  if (role && user.role !== role) {
    return <Navigate to="/dashboard" replace />
  }

  return children
}
