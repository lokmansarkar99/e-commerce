import { Link, useNavigate } from "react-router"
import { Search, User, Heart, ShoppingCart, Menu, X, LogOut } from "lucide-react"
import { useState } from "react"
import { useAuth } from "../context/AuthContext"
import { useSearch } from "../context/SearchContext" // import search context

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false)
  const { user, logout } = useAuth()
  const { search, setSearch } = useSearch() // get search state
  const navigate = useNavigate()

  const toggleMobileMenu = () => setIsMobileMenuOpen(prev => !prev)
  const toggleAccountMenu = () => setIsAccountMenuOpen(prev => !prev)

  const handleLogout = async () => {
    await logout()
    setIsAccountMenuOpen(false)
    navigate("/login")
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    navigate("/products") // redirect to products page
  }

  // Account redirect route
  const accountLink = !user
    ? "/login"
    : user.role === "ADMIN"
    ? "/admin"
    : "/dashboard"

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center">
            <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-teal-600 rounded-full"></div>
            </div>
          </div>
          <span className="text-xl font-bold text-gray-800">XStore</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center space-x-6 pl-6">
          <Link to="/" className="text-lg font-semibold text-gray-600 hover:text-teal-600">
            Home
          </Link>
          <Link to="/products" className="text-lg font-semibold text-gray-600 hover:text-teal-600">
            Products
          </Link>
        </div>

        {/* Desktop Search */}
        <div className="hidden md:flex flex-1 mx-8">
          <form onSubmit={handleSearchSubmit} className="relative w-full">
            <input
              type="text"
              placeholder="Search in XStore"
              className="w-full px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              value={search} // controlled by context
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="absolute right-0 top-0 h-full px-4 bg-teal-600 text-white rounded-r-md hover:bg-teal-700">
              <Search className="h-5 w-5" />
            </button>
          </form>
        </div>

        {/* Desktop Right */}
        <div className="hidden lg:flex items-center space-x-6 relative">
          {!user ? (
            <Link to="/login" className="flex items-center space-x-1 text-gray-600 hover:text-teal-600">
              <User className="h-6 w-6" />
              <span className="text-sm">Login</span>
            </Link>
          ) : (
            <div className="relative">
              <button
                onClick={toggleAccountMenu}
                className="flex items-center space-x-1 text-gray-600 hover:text-teal-600 focus:outline-none"
              >
                <User className="h-6 w-6" />
                <span className="text-sm">My Account</span>
              </button>

              {isAccountMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-50">
                  <Link
                    to={accountLink}
                    onClick={() => setIsAccountMenuOpen(false)}
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    {user.role === "ADMIN" ? "Admin Panel" : "Dashboard"}
                  </Link>
                  <Link
                    to="/profile"
                    onClick={() => setIsAccountMenuOpen(false)}
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    <LogOut className="h-4 w-4 mr-2" /> Logout
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Favorites */}
          <Link to="/favorites" className="flex items-center space-x-1 text-gray-600 hover:text-teal-600 relative">
            <Heart className="h-6 w-6" />
            <span className="absolute -top-2 -right-2 bg-gray-400 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              0
            </span>
          </Link>

          {/* Cart */}
          <Link to="/cart" className="flex items-center space-x-1 text-gray-600 hover:text-teal-600 relative">
            <ShoppingCart className="h-6 w-6" />
            <span className="absolute -top-2 -right-2 bg-gray-400 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              0
            </span>
          </Link>
        </div>

        {/* Mobile Right */}
        <div className="flex lg:hidden items-center space-x-3">
          <button onClick={toggleMobileMenu} className="text-gray-700 focus:outline-none z-50 relative">
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-white z-40 h-screen w-screen overflow-y-auto">
          <div className="container mx-auto px-4 py-8 space-y-6 text-lg font-medium">
            <Link to="/" onClick={toggleMobileMenu} className="block text-gray-700 hover:text-teal-600">
              Home
            </Link>
            <Link to="/products" onClick={toggleMobileMenu} className="block text-gray-700 hover:text-teal-600">
              Products
            </Link>

            {/* Account Mobile */}
            {!user ? (
              <Link to="/login" onClick={toggleMobileMenu} className="flex items-center space-x-2 text-gray-700 hover:text-teal-600">
                <User className="h-5 w-5" />
                <span>Login</span>
              </Link>
            ) : (
              <>
                <Link to={accountLink} onClick={toggleMobileMenu} className="flex items-center space-x-2 text-gray-700 hover:text-teal-600">
                  <User className="h-5 w-5" />
                  <span>{user.role === "ADMIN" ? "Admin Panel" : "Dashboard"}</span>
                </Link>
                <Link to="/profile" onClick={toggleMobileMenu} className="block text-gray-700 hover:text-teal-600">
                  Profile
                </Link>
                <button onClick={handleLogout} className="block text-left text-gray-700 hover:text-teal-600 w-full">
                  Logout
                </button>
              </>
            )}

            <Link to="/favorites" onClick={toggleMobileMenu} className="flex items-center space-x-2 text-gray-700 hover:text-teal-600">
              <Heart className="h-5 w-5" />
              <span>Favorites</span>
            </Link>
            <Link to="/cart" onClick={toggleMobileMenu} className="flex items-center space-x-2 text-gray-700 hover:text-teal-600">
              <ShoppingCart className="h-5 w-5" />
              <span>Cart</span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
