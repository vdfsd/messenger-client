import { FC, useState, InputHTMLAttributes, forwardRef } from "react"
import { IAvatar } from "../../datas/avatars"
import { TbInfoSquareFilled } from "react-icons/tb"

interface CustomRadioAvatarProps extends InputHTMLAttributes<HTMLInputElement> {
  avatar: IAvatar
  register: Function
}

export const CustomRadioAvatar: FC<CustomRadioAvatarProps> = forwardRef<
  HTMLInputElement,
  CustomRadioAvatarProps
>(function InputComponent({ name, avatar, register, ...props }, ref) {
  return (
    <li
      key={avatar.value}
      className="relative flex items-center justify-center mt-4 mx-4"
    >
      <input
        {...register("avatar")}
        name="avatar"
        type="radio"
        value={avatar.value}
        className="hidden peer"
        id={avatar.value}
      />

      <label
        htmlFor={avatar.value}
        className="rounded-full inline w-auto p-1 border-slate-200 cursor-pointer border-2  peer-checked:bg-indigo-800 peer-checked:border-2 "
      >
        <div className="w-auto">
          <img
            src={avatar.image}
            alt={avatar.value}
            height={70}
            width={70}
            className="rounded-full"
          />
        </div>
      </label>
    </li>
  )
})

CustomRadioAvatar.displayName = "CustomRadioAvatar"
