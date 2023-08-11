import { Outlet } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
export const App = () => {
  const navigate = useNavigate()
  useEffect(() => {
    const token = window.localStorage.getItem("token")
    if (!token) {
      navigate("/login")
    }
  }, [])
  return (
    <div>
      <Outlet />
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  )
}
