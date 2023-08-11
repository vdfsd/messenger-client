import { IUser } from "../customSearch/CustomSearch"
import { useAppDispatch } from "../../app/hooks"
import { addChat } from "../../features/chatsSlice"

export const FoundUsers = ({
  users,
  setDefaultInputValue,
}: {
  users: IUser[]
  setDefaultInputValue: () => void
}) => {
  const dispatch = useAppDispatch()

  const addUserChat = (u: IUser) => {
    dispatch(addChat(u))
  }

  return (
    <div className="absolute w-full bg-indigo-950 border-[1px] rounded-md border-slate-300 max-w-[80%] shadow-md overflow-hidden">
      <ul>
        {users.length > 0
          ? users.map((user) => {
              return (
                <li
                  onClick={() => {
                    addUserChat(user)
                    setDefaultInputValue()
                  }}
                  key={user.username}
                  className="py-1 px-2 text-sm cursor-pointer hover:bg-indigo-900 text-slate-200"
                >
                  @{user.username}
                </li>
              )
            })
          : null}
      </ul>
    </div>
  )
}
