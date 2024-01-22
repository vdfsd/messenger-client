import { io } from "socket.io-client"

// const API_URL = "http://localhost:4000/"
const API_URL = "https://messenger-server-black.vercel.app/"
export const socket = io(API_URL, {
  autoConnect: false,
})
