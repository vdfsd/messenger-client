import { useEffect } from "react"
import { ItemChatsList } from "../itemChatsList/ItemChatsList"
import { useAppSelector, useAppDispatch } from "../../app/hooks"
import { getChats } from "../../features/chatsSlice"
export const ChatList = () => {
  const { chats } = useAppSelector((state) => state.chats)
  const { user } = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (user !== null && user?._id !== undefined) {
      dispatch(getChats({ from: user?._id }))
    }
  }, [user])

  return (
    <div className=" bg-indigo-900">
      {chats.length > 0 ? (
        chats.map((chat) => {
          return <ItemChatsList key={chat.username} chat={chat} />
        })
      ) : (
        <h6>There are no chats</h6>
      )}
    </div>
  )
}
