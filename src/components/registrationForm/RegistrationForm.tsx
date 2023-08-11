import { useForm, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useAppDispatch } from "../../app/hooks"
import { fetchRegistation } from "../../features/authSlice"
import { useState } from "react"
import { avatars } from "../../datas/avatars"
import { IAvatar } from "../../datas/avatars"
import { CustomRadioAvatar } from "../customRadioAvatar/CustomRadioAvatar"
import { motion, AnimatePresence } from "framer-motion"
import { useNavigate } from "react-router-dom"

interface IRegistration {
  email: string
  username: string
  fullname: string
  password: string
  avatar: string
}

const schema = yup
  .object({
    email: yup.string().required(),
    username: yup.string().required(),
    fullname: yup.string().required(),
    password: yup.string().required().min(8),
    avatar: yup.string().required(),
  })
  .required()

export const RegistrationForm = () => {
  const {
    reset,
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      username: "",
      fullname: "",
      password: "",
      avatar: "",
    },
  })
  const navigate = useNavigate()
  const [statusBoxAvatars, setStatusBoxAvatars] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const onSubmit = (data: IRegistration) => {
    reset()
    dispatch(fetchRegistation(data)).then(() => {
      reset()
      navigate("/login")
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-6">
        <label
          htmlFor="email"
          className="block mb-1 text-xs font-medium text-slate-200 "
        >
          Jedi Email address
        </label>
        <input
          {...register("email")}
          type="email"
          id="email"
          className="transition duration-200 focus:outline-none bg-indigo-950 focus:bg-indigo-900 border border-indigo-800 text-sm text-slate-200 rounded-lg focus:border-indigo-600 focus:shadow-md focus:shadow-indigo-600 block w-full p-2.5 placeholder:text-slate-400"
          placeholder="joda.doe@company.com"
          autoComplete="off"
        />
        <p className="text-xs text-red-500">{errors.email?.message}</p>
      </div>
      <div className="mb-6">
        <label
          htmlFor="username"
          className="block mb-1 text-xs font-medium text-slate-200 "
        >
          Jedi Username
        </label>
        <input
          {...register("username")}
          type="text"
          id="username"
          className="transition duration-200 focus:outline-none bg-indigo-950 focus:bg-indigo-900 border border-indigo-800 text-sm text-slate-200 rounded-lg focus:border-indigo-600 focus:shadow-md focus:shadow-indigo-600 block w-full p-2.5 placeholder:text-slate-400"
          placeholder="yoda"
          autoComplete="off"
        />
        <p className="text-xs text-red-500">{errors.username?.message}</p>
      </div>

      <div className="mb-6">
        <label
          htmlFor="full_name"
          className="block mb-1 text-xs font-medium text-slate-200 "
        >
          Jedi Full name
        </label>
        <input
          {...register("fullname")}
          type="text"
          id="full_name"
          className="transition duration-200 focus:outline-none bg-indigo-950 focus:bg-indigo-900 border border-indigo-800 text-sm text-slate-200 rounded-lg focus:border-indigo-600 focus:shadow-md focus:shadow-indigo-600 block w-full p-2.5 placeholder:text-slate-400"
          placeholder="Magister Yoda"
          autoComplete="off"
        />
        <p className="text-xs text-red-500">{errors.fullname?.message}</p>
      </div>
      <div className="mb-6">
        <label
          htmlFor="password"
          className="block mb-1 text-xs font-medium text-slate-200 "
        >
          Jedi Password
        </label>
        <input
          {...register("password")}
          type="password"
          id="password"
          className="transition duration-200 focus:outline-none bg-indigo-950 focus:bg-indigo-900 border border-indigo-800 text-sm text-slate-200 rounded-lg focus:border-indigo-600 focus:shadow-md focus:shadow-indigo-600 block w-full p-2.5 placeholder:text-slate-400"
          placeholder="•••••••••"
          autoComplete="off"
        />
        <p className="text-xs text-red-500">{errors.password?.message}</p>
      </div>
      <div className="mb-16">
        <label
          htmlFor="avatar"
          className="block mb-1 text-xs font-medium text-slate-200 "
        >
          Jedi Avatar
        </label>

        <button
          type="button"
          onClick={() => setStatusBoxAvatars(!statusBoxAvatars)}
          className="text-white bg-indigo-800 hover:bg-indigo-900 focus:outline-none  font-medium rounded-lg text-sm w-full  px-5 py-2.5 text-center transition duration-200 "
        >
          {statusBoxAvatars ? "Hide Box" : "Choose Avatar"}
        </button>
        <p className="text-xs text-red-500">{errors.avatar?.message}</p>
        <AnimatePresence>
          {statusBoxAvatars && (
            <motion.ul
              initial={{
                height: 0,
              }}
              animate={{
                height: "auto",
              }}
              exit={{ height: 0 }}
              transition={{ duration: 1 }}
              className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-4 overflow-hidden justify-center"
            >
              {avatars.map((avatar: IAvatar) => {
                return (
                  <Controller
                    key={avatar.value}
                    name="avatar"
                    control={control}
                    render={({ field }) => (
                      <CustomRadioAvatar
                        {...field}
                        avatar={avatar}
                        register={register}
                      />
                    )}
                  />
                )
              })}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>

      <button
        type="submit"
        className="text-slate-200 bg-indigo-800 hover:bg-indigo-900 focus:outline-none  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center transition duration-200"
      >
        Submit
      </button>
    </form>
  )
}
