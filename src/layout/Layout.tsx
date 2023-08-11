import { useEffect, useState, useRef, useContext, createContext } from "react"
import { Chats } from "../components/chats/Chats"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { getMe } from "../features/authSlice"
import { CurrentUserBoard } from "../components/currentUserBoard/CurrentUserBoard"
import { Outlet } from "react-router-dom"
import { InputChat } from "../components/inputChat/InputChat"
import { useNavigate, useParams } from "react-router-dom"
import { addChat, addCurrentChat } from "../features/chatsSlice"
import { socket } from "../socket"
import { BgChat } from "../components/bgChat/BgChat"
import { getMessages } from "../features/messagesSlice"
import { addMessage } from "../features/messagesSlice"
import { IUser } from "../components/customSearch/CustomSearch"

const socketData = {}
export const SocketContext = createContext(socketData)

interface IMessage {
  fromSelf: boolean
  message: string
}

export const Layout = () => {
  const dispatch = useAppDispatch()
  const params = useParams()
  const navigate = useNavigate()
  const [isConnected, setIsConnected] = useState(socket.connected)
  const { user } = useAppSelector((state) => state.auth)
  const { currentChat } = useAppSelector((state) => state.chats)
  const { activeChatPage } = useAppSelector((state) => state.page)
  const idUser = useAppSelector((state) => state.auth.user?._id)
  const [arrivalMessage, setArrivalMessage] = useState<IMessage | null>(null)
  const [arrivalMessageUser, setArrivalMessageUSer] = useState<IUser | null>(
    null,
  )
  const socketContext = useContext(SocketContext)

  useEffect(() => {
    if (user !== null && user !== undefined) {
      socket.connect()
      socket.emit("add-user", user._id)
      setIsConnected(true)
    }

    return () => {
      socket.disconnect()
      setIsConnected(false)
    }
  }, [user])

  useEffect(() => {
    const token = window.localStorage.getItem("token")
    if (token) {
      dispatch(getMe())
    }
  }, [dispatch])

  useEffect(() => {
    if (params.chatId) {
      dispatch(addCurrentChat(params.chatId))
    }
  }, [])
  // useEffect(() => {
  //   const token = window.localStorage.getItem("token")
  //   if (!token) {
  //     navigate("/login")
  //   }
  // }, [])

  useEffect(() => {
    if (idUser !== undefined && params.chatId !== undefined) {
      dispatch(getMessages({ from: idUser, to: params.chatId }))
    }
  }, [idUser, params])

  useEffect(() => {
    if (socketContext) {
      socket.on("msg-recieve", ({ data, user }) => {
        if (user !== null) {
          dispatch(addChat(user))
          setArrivalMessageUSer(user)
        }

        setArrivalMessage({ fromSelf: false, message: data })
      })
    }
  }, [socketContext, socket])

  useEffect(() => {
    if (arrivalMessageUser !== null) {
      if (
        currentChat !== null &&
        arrivalMessage !== null &&
        arrivalMessageUser._id === currentChat
      ) {
        dispatch(addMessage(arrivalMessage))
        setArrivalMessageUSer(null)
      }
    } else {
      if (currentChat !== null && arrivalMessage !== null) {
        dispatch(addMessage(arrivalMessage))
      }
    }
  }, [arrivalMessage])

  return (
    <SocketContext.Provider value={isConnected}>
      <div className="grid grid-cols-1 md:grid-cols-[minmax(auto,_300px)_1fr] max-h-screen h-screen min-h-screen">
        <Chats />
        <div
          className={`${
            activeChatPage ? "flex" : "hidden"
          } relative h-screen max-w-full w-full min-h-screen overflow-y-hidden md:flex flex-col items-center ${
            currentChat ? "justify-between " : " justify-start"
          } `}
        >
          <CurrentUserBoard />
          {currentChat ? <Outlet /> : <BgChat />}
          {currentChat ? <InputChat /> : null}
        </div>
      </div>
    </SocketContext.Provider>
  )
}
