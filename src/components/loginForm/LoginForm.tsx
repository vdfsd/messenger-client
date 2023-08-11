import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useAppDispatch } from "../../app/hooks"
import { fetchLogin } from "../../features/authSlice"
import { useNavigate } from "react-router-dom"

interface ILogin {
  username: string
  password: string
}
const schema = yup
  .object({
    username: yup.string().required(),
    password: yup.string().required().min(8),
  })
  .required()

export const LoginForm = () => {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const onSubmit = (data: ILogin) => {
    dispatch(fetchLogin(data)).then((a) => {
      reset()
      navigate("/")
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="">
      <div className="mb-6">
        <label
          htmlFor="username"
          className="block mb-1 text-xs font-medium text-slate-200 "
        >
          Jedi Username
        </label>
        <input
          {...register("username")}
          autoComplete="off"
          type="text"
          id="username"
          className="transition duration-200 focus:outline-none bg-indigo-950 focus:bg-indigo-900 border border-indigo-800 text-sm text-slate-200 rounded-lg focus:border-indigo-600 focus:shadow-md focus:shadow-indigo-600 block w-full p-2.5 placeholder:text-slate-400"
          placeholder="yoda"
        />
        <p className="text-xs text-red-500">{errors.username?.message}</p>
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
          className="transition duration-200 focus:outline-none bg-indigo-950  focus:bg-indigo-900 border border-indigo-800 text-sm text-slate-200 rounded-lg focus:border-indigo-600 focus:shadow-md focus:shadow-indigo-600 block w-full p-2.5 placeholder:text-slate-400"
          placeholder="•••••••••"
          autoComplete="off"
        />
        <p className="text-xs text-red-500">{errors.password?.message}</p>
      </div>

      <button
        type="submit"
        className="text-white bg-indigo-800 hover:bg-indigo-900 focus:ring-4 focus:outline-none focus:ring-indigo-900 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center transition duration-200"
      >
        Submit
      </button>
    </form>
  )
}
