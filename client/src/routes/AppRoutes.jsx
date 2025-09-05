import {createBrowserRouter} from 'react-router'
import Layout from '../layout/Layout'
import Home from '../pages/Home'
import About from '../pages/About'
import Products from '../pages/Products/Products'
import ProductDetails from '../pages/Products/ProductDetails'
import Register from '../pages/Auth/Register'
import Login from '../pages/Auth/Login'

// User Pages
import Cart from '../pages/Cart/Cart'
import Checkout from '../pages/Checkout/Checkout'
import MyOrders from '../pages/Orders/MyOrders'
import OrderDetails from '../pages/Orders/OrderDetails'
import UserDashboard from '../pages/User/UserDashboard'


// Admin Pages
import AdminHome from '../pages/Admin/AdminHome'
import ManageProducts from '../pages/Admin/ManageProducts'
import ManageOrders   from '../pages/Admin/ManageOrders'
import ManageUsers from '../pages/Admin/ManageUsers'

const router = createBrowserRouter([
    {
        path: '/', 
        element: <Layout />,
        children: [
            { index: true, element: <Home /> },
            { path: "about", element: <About />},
            {path: "products", element: <Products/>  },
            {path: "product/:id", element: <ProductDetails/>  },
            {path: "register", element: <Register/>  },
            {path: "login", element: <Login/>  },

            // User Routes
            {path: "cart", element: <Cart />},
            {path: "checkout", element: <Checkout />},
            {path: "orders", element: <MyOrders />},
            {path: "orders/:id", element: <OrderDetails />},
            {path: "dashboard", element: <UserDashboard />},

            // Admin Routes
            {path: "admin", element: <AdminHome />},
            {path: "admin/products", element: <ManageProducts />},
            {path: "admin/orders", element: <ManageOrders />},
            {path: "admin/users", element: <ManageUsers />}
        ]
    }
])

export default router