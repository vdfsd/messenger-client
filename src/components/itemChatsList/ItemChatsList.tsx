import { FC } from "react"
import { Link } from "react-router-dom"
import { IUser } from "../customSearch/CustomSearch"
import { useParams } from "react-router-dom"
import { useAppDispatch } from "../../app/hooks"
import { addCurrentChat } from "../../features/chatsSlice"
import { setActiveChatPage } from "../../features/pageSlice"

interface IItemChatsListProps {
  chat: IUser
}
export const ItemChatsList: FC<IItemChatsListProps> = ({ chat }) => {
  const params = useParams()
  const dispatch = useAppDispatch()

  const handleCurrentChat = () => {
    dispatch(addCurrentChat(chat._id))
    dispatch(setActiveChatPage(true))
  }

  return (
    <div
      className={`transition duration-300 py-2 bg-indigo-950 hover:bg-indigo-900 cursor-pointer px-2 ${
        params.chatId === chat._id ? "bg-indigo-900" : ""
      }`}
    >
      <Link
        to={`/${chat._id}`}
        className="block w-full h-full"
        onClick={handleCurrentChat}
      >
        <div className="flex justify-start items-center">
          <div className="min-w-[50px] h-[50px] bg-indigo-950 rounded-full mr-2 flex items-center justify-center">
            <img
              src={`https://messenger-server-black.vercel.app/images/avatars/${chat?.avatar}.jpg`}
              alt="avatar"
              className="min-w-[50px] h-[50px] rounded-full"
            />
          </div>

          <div className="flex items-center justify-between w-full">
            <p className="text-base text-slate-200">{chat.username}</p>
          </div>
        </div>
      </Link>
    </div>
  )
}
