import { useState, MouseEvent, FormEvent, useEffect, useContext } from "react"
import { BsFillEmojiSunglassesFill } from "react-icons/bs"
import { sendMessage } from "../../features/messagesSlice"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { SocketContext } from "../../layout/Layout"
import { socket } from "../../socket"
import { addMessage } from "../../features/messagesSlice"

import data from "@emoji-mart/data"
import Picker from "@emoji-mart/react"

interface IEmoji {
  emotions: string[]
  id: string
  keywords: string[]
  native: string
  shortcodes: string
  unified: string
}

export const InputChat = () => {
  const [openEmoji, setOpenEmoji] = useState<boolean>(false)
  const [messageValue, setMessageValue] = useState<string>("")
  const dispatch = useAppDispatch()
  const { currentChat } = useAppSelector((state) => state.chats)
  const { user } = useAppSelector((state) => state.auth)
  const socketContext = useContext(SocketContext)

  const addEmoji = (e: IEmoji) => {
    setMessageValue((prevState) => prevState + e?.native)
  }

  const handleNessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (messageValue === "") {
      return
    }
    if (socketContext && user !== null) {
      socket.emit("send-msg", {
        to: currentChat,
        from: user._id,
        message: messageValue,
      })
    }

    if (user !== null && currentChat !== null && user._id !== undefined) {
      dispatch(sendMessage({ to: currentChat, from: user._id, messageValue }))
      dispatch(addMessage({ fromSelf: true, message: messageValue }))
      setMessageValue("")
    }
  }

  return (
    <div className="bg-indigo-950 py-2 px-2 block w-full">
      <form onSubmit={handleNessage}>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
            <BsFillEmojiSunglassesFill
              size={20}
              color={"#fcd34d"}
              className="cursor-pointer"
              onClick={() => setOpenEmoji(!openEmoji)}
            />
            {openEmoji && (
              <div className="z-50 absolute bottom-16">
                <Picker
                  data={data}
                  onEmojiSelect={(e: IEmoji) => {
                    addEmoji(e)
                  }}
                />
              </div>
            )}
          </div>
          <input
            value={messageValue}
            onChange={(e) => setMessageValue(e.target.value)}
            type="text"
            className="focus:outline-none block w-full bg-indigo-950 p-3 pl-10 text-sm text-slate-200 border border-slate-200 rounded-lg placeholder:text-slate-400"
            placeholder="Write a message..."
          />
          <button
            type="submit"
            className="text-slate-200 absolute right-2.5 bottom-[5px] bg-indigo-800 hover:bg-indigo-900 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 transition duration-300"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  )
}
