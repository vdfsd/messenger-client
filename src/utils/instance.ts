import axios from "axios"

export const instanceAxios = axios.create({
  baseURL: "https://messenger-server-black.vercel.app/api/",
  headers: { "Content-Type": "application/json" },
})
instanceAxios.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem("token")

  return config
})
