import { Navigate } from "react-router"
import { useAuth } from "../context/AuthContext"

export default function ProtectedRoute({ children, role }) {
  const { user } = useAuth()

  if (!user) {
    return <Navigate to="/login" />
  }

  if (role && user.role !== role) {
    return <Navigate to="/dashboard" /> // non-admins redirected
  }

  return children
}
