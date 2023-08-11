import { Outlet } from "react-router-dom"
import toast, { Toaster } from "react-hot-toast"
export const App = () => {
  return (
    <div>
      <Outlet />
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  )
}
