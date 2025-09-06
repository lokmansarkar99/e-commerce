import { createContext, useContext, useEffect, useState } from "react"
import axios from "axios"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Configure axios to send cookies
  axios.defaults.withCredentials = true

  // Fetch user if already logged in (via refresh token)
  const fetchUser = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/auth/me") // backend should return req.user
      setUser(res.data.user)
      return res.data.user
    } catch (err) {
      console.error("Fetch user failed:", err)
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUser()
  }, [])

  const login = async (email, password) => {
    const res = await axios.post("http://localhost:3000/api/auth/login", { email, password })
    setUser(res.data.user) // backend sends user info
    return res.data.user
  }

  const signup = async (data) => {
    const res = await axios.post("http://localhost:3000/api/auth/signup", data)
    setUser(res.data.user)
    return res.data.user
  }

  const logout = async () => {
    await axios.post("http://localhost:3000/api/auth/logout")
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
