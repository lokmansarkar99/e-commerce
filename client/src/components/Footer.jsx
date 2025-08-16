import { Facebook, Twitter, Instagram, Mail } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 py-10 mt-16">
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-8 text-center md:text-left">
        
        {/* Column 1: About */}
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-4">XStore</h2>
          <p className="text-gray-600">
            Your trusted online shopping destination for quality, affordability, and fast delivery.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Links</h2>
          <ul className="text-gray-600 space-y-2">
            <li><a href="/" className="hover:text-teal-600 transition">Home</a></li>
            <li><a href="/about" className="hover:text-teal-600 transition">About</a></li>
            <li><a href="/contact" className="hover:text-teal-600 transition">Contact</a></li>
            <li><a href="/shop" className="hover:text-teal-600 transition">Shop</a></li>
          </ul>
        </div>

        {/* Column 3: Contact + Socials */}
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-4">Get in Touch</h2>
          <p className="text-gray-600 mb-2 flex items-center justify-center md:justify-start gap-2">
            <Mail className="w-5 h-5 text-teal-600" /> support@xstore.com
          </p>
          <div className="flex justify-center md:justify-start gap-4 mt-4">
            <a href="#" className="text-gray-600 hover:text-teal-600 transition">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-600 hover:text-teal-600 transition">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-600 hover:text-teal-600 transition">
              <Instagram className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="mt-10 text-center text-gray-500 text-sm border-t pt-6 border-gray-200">
        &copy; {new Date().getFullYear()} XStore. All rights reserved.
      </div>
    </footer>
  )
}
