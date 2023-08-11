import { useEffect, useState, useRef } from "react"
import { useAppSelector } from "../../app/hooks"
import { v4 as uuidv4 } from "uuid"
import { IUser } from "../customSearch/CustomSearch"

export const Chat = () => {
  const scrollRef = useRef<HTMLLIElement>(null)
  const { messages } = useAppSelector((state) => state.messages)
  const { user } = useAppSelector((state) => state.auth)

  const { currentChat, chats } = useAppSelector((state) => state.chats)
  const [currentChatImg, setCurrentChatImg] = useState<IUser>({} as IUser)
  useEffect(() => {
    if (user !== null && chats.length > 0) {
      const chatImg = chats.find((c) => c._id === currentChat)
      if (chatImg !== undefined) {
        setCurrentChatImg(chatImg)
      }
    }
  }, [user, chats])

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  return (
    <div className=" overflow-y-scroll flex-auto w-full py-4 px-2">
      <ul className=" space-y-4">
        {messages !== null &&
          messages.map((m) => {
            return (
              <li
                ref={scrollRef}
                className={`grid grid-cols-[auto_auto] items-end ${
                  m.fromSelf ? "justify-end" : "justify-start"
                }`}
                key={uuidv4()}
              >
                <span
                  className={`text-indigo-950 text-base py-2 px-4 ${
                    m.fromSelf
                      ? "bg-green-400 rounded-l-2xl rounded-tr-2xl order-1 mr-1 ml-20"
                      : "bg-gray-300 rounded-r-2xl rounded-tl-2xl order-2 ml-1 mr-20"
                  }`}
                >
                  {m.message}
                </span>
                <div
                  className={`rounded-full bg-indigo-900 w-[35px] h-[35px] ${
                    m.fromSelf ? "order-2" : "order-1"
                  }`}
                >
                  {user?.avatar && currentChatImg.avatar && (
                    <img
                      src={`https://messenger-server-black.vercel.app/images/avatars/${
                        m.fromSelf ? user?.avatar : currentChatImg.avatar
                      }.jpg`}
                      alt="avatar"
                      className="w-[35px] h-[35px] rounded-full"
                    />
                  )}
                </div>
              </li>
            )
          })}
      </ul>
    </div>
  )
}
