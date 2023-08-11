import axios from "axios"

export const instanceAxios = axios.create({
  baseURL: "http://localhost:4000/api/",
  headers: { "Content-Type": "application/json" },
})
instanceAxios.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem("token")

  return config
}) //добавление в каждый запрос токена в хедерс
