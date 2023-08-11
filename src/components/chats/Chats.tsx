import { ChatList } from "../chatList/ChatList"
import { CustomSearch } from "../customSearch/CustomSearch"
import { useAppDispatch, useAppSelector } from "../../app/hooks"

export const Chats = () => {
  const { activeChatPage } = useAppSelector((state) => state.page)
  return (
    <div
      className={`border-r-[1px] border-slate-400 h-screen overflow-y-scroll 
      ${!activeChatPage ? "block" : "hidden"} md:block`}
    >
      <CustomSearch />
      <ChatList />
    </div>
  )
}
