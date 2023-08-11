import React from "react"
import yoda from "../../assets/yoda_render.webp"
import { useAppSelector } from "../../app/hooks"

export const BgChat = () => {
  const { user } = useAppSelector((state) => state.auth)

  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="flex items-center justify-center flex-col">
        <div>
          <img
            src={yoda}
            alt="yoda"
            className="w-full h-full max-h-[200px] yoda"
          />
        </div>
        <div>
          <p className="text-slate-200 text-sm my-1">
            Welcome,{" "}
            <span className="text-indigo-800 font-semibold text-lg">
              {user?.username}!
            </span>
          </p>
          <p className="text-slate-200 text-sm my-1">
            A chat to start messaging, please select.{" "}
          </p>
          <p className="text-slate-200 text-sm">Hmm, yes.</p>
        </div>
      </div>
    </div>
  )
}
