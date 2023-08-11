import { useAppSelector, useAppDispatch } from "../../app/hooks"
import { HiOutlineLogout } from "react-icons/hi"
import { logout } from "../../features/authSlice"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { removeChats } from "../../features/chatsSlice"
import { removeMessages } from "../../features/messagesSlice"
import { IoArrowBackOutline } from "react-icons/io5"
import { setActiveChatPage } from "../../features/pageSlice"
import img1 from "../../assets/avatars/i1.jpg"

export const CurrentUserBoard = () => {
  const { user } = useAppSelector((state) => state.auth)
  // const [src, setSrc] = useState<string>("")

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout())
    dispatch(removeChats())
    dispatch(removeMessages())
    navigate("/login")
  }
  // useEffect(() => {
  //   if (user !== null && user?.avatar !== undefined) {
  //     setSrc(`/assets/${user?.avatar}.jpg`)
  //   }
  // }, [user])

  return (
    <div className="w-full flex items-center justify-between py-[10px] px-4 bg-indigo-950 shadow-md shadow-indigo-600 hover:shadow-indigo-600 hover:shadow-lg sticky top-0 trasition duration-200">
      <div className="flex md:hidden items-center justify-center">
        <button onClick={() => dispatch(setActiveChatPage(false))}>
          <IoArrowBackOutline size={25} color={"#e2e8f0"} />
        </button>
      </div>
      <div className="flex items-center justify-start">
        <div className="min-w-[50px] h-[50px] rounded-full mr-2 flex items-center justify-center">
          {user !== null && user?.avatar !== undefined && (
            <img
              src={`https://messenger-server-black.vercel.app/images/avatars/${user?.avatar}.jpg`}
              alt="avatar"
              className="min-w-[50px] h-[50px] rounded-full"
            />
          )}
        </div>
        <div>
          <p className="text-base font-semibold text-slate-200">
            <span className="text-indigo-950">@</span>
            {user !== null && user !== undefined ? user.username : ""}
          </p>
        </div>
      </div>
      <div>
        <button
          onClick={handleLogout}
          className="flex bg-indigo-800 hover:bg-indigo-900  px-4 py-2 rounded-md shadow-md shadow-indigo-900 hover:shadow-lg  hover:shadow-indigo-950 transition duration-300"
        >
          <HiOutlineLogout size={25} color="white" />
        </button>
      </div>
    </div>
  )
}
