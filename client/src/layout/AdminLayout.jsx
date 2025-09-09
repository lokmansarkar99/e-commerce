import { Outlet } from "react-router"

const AdminLayout = () => {
  return (
    <div>
      
<h1>Admin Header</h1>

        <Outlet />

        <footer>
          <p>Admin Footer</p>
        </footer>

    </div>
  )
}

export default AdminLayout
