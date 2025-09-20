import { createBrowserRouter } from "react-router"
import Layout from "../layout/Layout"
import AdminLayout from "../layout/AdminLayout"

import Home from "../pages/Home"
import About from "../pages/About"
import Products from "../pages/Products/Products"
import ProductDetails from "../pages/Products/ProductDetails"
import Register from "../pages/Auth/Register"
import Login from "../pages/Auth/Login"

// User Pages
import Cart from "../pages/Cart/Cart"
import Checkout from "../pages/Checkout/Checkout"
import MyOrders from "../pages/Orders/MyOrders"
import OrderDetails from "../pages/Orders/OrderDetails"
import UserDashboard from "../pages/User/UserDashboard"

// Admin Pages
import AdminDashboard from "../pages/Admin/AdminDashboard"
import ManageProducts from "../pages/Admin/ManageProducts"
import ManageOrders from "../pages/Admin/ManageOrders"
import ManageUsers from "../pages/Admin/ManageUsers"

import ProtectedRoute from "../components/ProtectedRoute"

const router = createBrowserRouter([
  // Public + User routes
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "products", element: <Products /> },
      { path: "product/:productId", element: <ProductDetails /> },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },

      // User routes
      { path: "cart", element: <Cart /> },
      { path: "checkout", element: <Checkout /> },
      { path: "orders", element: <MyOrders /> },
      { path: "orders/:id", element: <OrderDetails /> },
      {
        path: "dashboard",
        element: (
          <ProtectedRoute>
            <UserDashboard />
          </ProtectedRoute>
        ),
      },
    ],
  },

  // Admin routes (separate layout)
  {
    path: "/admin",
    element: (
      <ProtectedRoute role="ADMIN">
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: "products", element: <ManageProducts /> },
      { path: "orders", element: <ManageOrders /> },
      { path: "users", element: <ManageUsers /> },
    ],
  },
])

export default router
