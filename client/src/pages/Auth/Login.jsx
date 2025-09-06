import { useState } from "react"
import { useAuth } from "../../context/AuthContext"
import { useNavigate, Link } from "react-router"

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: "", password: "" })
  const [error, setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const user = await login(form.email, form.password) // returns user from API
      if (user.role === "ADMIN") {
        navigate("/admin")
      } else {
        navigate("/dashboard")
      }
    } catch (err) {
      console.error(err)
      setError("Invalid credentials")
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="w-full border px-3 py-2 rounded"
        />
        <button className="w-full bg-teal-600 text-white py-2 rounded">
          Login
        </button>
      </form>

      {/* Register Link */}
      <p className="mt-4 text-sm text-gray-600 text-center">
        Don’t have an account?{" "}
        <Link to="/register" className="text-teal-600 font-medium hover:underline">
          Register now
        </Link>
      </p>
    </div>
  )
}
