import { ChangeEvent, useState } from "react"
import { instanceAxios } from "../../utils/instance"
import { FoundUsers } from "../foundUsers/FoundUsers"
import { useAppSelector } from "../../app/hooks"

export interface IUser {
  username: string
  _id: string
  fullname: string
  email: string
  avatar: string
}

export const CustomSearch = () => {
  const { user } = useAppSelector((state) => state.auth)
  const [value, setValue] = useState<string>("")
  const [users, setUsers] = useState<IUser[]>([] as IUser[])

  const setDefaultInputValue = () => {
    setValue("")
    setUsers([])
  }
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)

    const getUser = async (value: string) => {
      try {
        if (user !== null) {
          const res = await instanceAxios({
            method: "POST",
            url: "/users",

            data: { value, userId: user._id },
          })

          setUsers(res.data.listUsers)
          return res.data.listUsers
        }
      } catch (error) {
        console.log("Error")
      }
    }
    getUser(e.target.value)
  }

  return (
    <div className="px-2 py-4 relative bg-indigo-950  border-b-[2px] border-indigo-900">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          value={value}
          onChange={handleInput}
          type="search"
          id="search"
          className="focus:outline-none block w-full p-2 pl-10 text-sm text-slate-200 border border-gray-300 rounded-lg bg-indigo-950"
          placeholder="Search a Jedi"
          autoComplete="off"
        />
      </div>
      {users.length > 0 && (
        <FoundUsers users={users} setDefaultInputValue={setDefaultInputValue} />
      )}
    </div>
  )
}
