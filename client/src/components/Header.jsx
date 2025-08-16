import { Link } from "react-router"
import { Search, Phone, User, BarChart3, Heart, ShoppingCart, Menu, X, ChevronDown } from "lucide-react"
import { useState } from "react"

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isAllCategoriesOpen, setIsAllCategoriesOpen] = useState(false)

  const toggleMobileMenu = () => setIsMobileMenuOpen(prev => !prev)
  const toggleAllCategories = () => setIsAllCategoriesOpen(prev => !prev)

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      {/* Main Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center">
              <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-teal-600 rounded-full"></div>
              </div>
            </div>
            <span className="text-xl font-bold text-gray-800">XStore</span>
          </Link>

          {/* Desktop Search */}
          <div className="hidden md:flex flex-1 mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search in XStore"
                className="w-full px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <button className="absolute right-0 top-0 h-full px-4 bg-teal-600 text-white rounded-r-md hover:bg-teal-700">
                <Search className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Desktop Right */}
          <div className="hidden lg:flex items-center space-x-6">
            <Link to="/account" className="flex items-center space-x-1 text-gray-600 hover:text-teal-600">
              <User className="h-5 w-5" />
              <span className="text-sm">My account</span>
            </Link>
            <Link to="/comparison" className="flex items-center space-x-1 text-gray-600 hover:text-teal-600 relative">
              <BarChart3 className="h-5 w-5" />
              <span className="text-sm">Comparison</span>
              <span className="absolute -top-2 -right-2 bg-gray-400 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
            </Link>
            <Link to="/favorites" className="flex items-center space-x-1 text-gray-600 hover:text-teal-600 relative">
              <Heart className="h-5 w-5" />
              <span className="text-sm">Favorites</span>
              <span className="absolute -top-2 -right-2 bg-gray-400 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
            </Link>
            <Link to="/cart" className="flex items-center space-x-1 text-gray-600 hover:text-teal-600 relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="text-sm">My Cart</span>
              <span className="absolute -top-2 -right-2 bg-gray-400 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
            </Link>
          </div>

          {/* Mobile Right */}
          <div className="flex lg:hidden items-center space-x-3">
            <Link to="/comparison" className="relative">
              <BarChart3 className="h-6 w-6 text-gray-600" />
              <span className="absolute -top-2 -right-2 bg-gray-400 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
            </Link>
            <Link to="/favorites" className="relative">
              <Heart className="h-6 w-6 text-gray-600" />
              <span className="absolute -top-2 -right-2 bg-gray-400 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
            </Link>
            <Link to="/cart" className="relative">
              <ShoppingCart className="h-6 w-6 text-gray-600" />
              <span className="absolute -top-2 -right-2 bg-gray-400 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
            </Link>
            <button onClick={toggleMobileMenu} className="text-gray-700 focus:outline-none z-50 relative">
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden mt-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search in XStore"
              className="w-full px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <button className="absolute right-0 top-0 h-full px-4 bg-teal-600 text-white rounded-r-md">
              <Search className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu - Fullscreen */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-white z-40 h-screen w-screen overflow-y-auto">
          <div className="container mx-auto px-4 py-8">
            <div className="space-y-4">
              <Link to="/" onClick={toggleMobileMenu} className="block py-2 text-lg text-gray-700 hover:text-teal-600">
                Home
              </Link>
              <Link to="/elements" onClick={toggleMobileMenu} className="block py-2 text-lg text-gray-700 hover:text-teal-600">
                Elements
              </Link>
              <Link to="/shop" onClick={toggleMobileMenu} className="block py-2 text-lg text-gray-700 hover:text-teal-600">
                Shop
              </Link>
              <Link to="/our-story" onClick={toggleMobileMenu} className="block py-2 text-lg text-gray-700 hover:text-teal-600">
                Our Story
              </Link>
              <Link to="/hot-news" onClick={toggleMobileMenu} className="block py-2 text-lg text-gray-700 hover:text-teal-600">
                Hot News
              </Link>
              <Link to="/contacts" onClick={toggleMobileMenu} className="block py-2 text-lg text-gray-700 hover:text-teal-600">
                Contacts
              </Link>
              <div className="border-t pt-4 space-y-2">
                <Link to="/account" onClick={toggleMobileMenu} className="flex items-center space-x-2 py-2 text-gray-700 hover:text-teal-600">
                  <User className="h-5 w-5" />
                  <span>My Account</span>
                </Link>
                <div className="text-sm text-gray-500">Need help? Call us: +1 1800 212 3434</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
