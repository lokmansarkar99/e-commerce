
import { createContext, useContext, useEffect, useState } from "react"
import {
  loginApi,
  signupApi,
  logoutApi,
  fetchMeApi,
} from "../api/authApi.js"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Fetch logged-in user
  const fetchUser = async () => {
    try {
      const res = await fetchMeApi()
      setUser(res.data.user)
      return res.data.user
    } catch (err) {
      console.error("Fetch user failed:", err.response?.data || err.message)
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUser()
  }, [])

  const login = async (email, password) => {
    const res = await loginApi(email, password)
    setUser(res.data.user)
    return res.data.user
  }

  const signup = async (data) => {
    const res = await signupApi(data)
    setUser(res.data.user)
    return res.data.user
  }

  const logout = async () => {
    await logoutApi()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, setUser, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
