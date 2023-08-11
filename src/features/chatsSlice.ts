import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { instanceAxios } from "../utils/instance"
import toast from "react-hot-toast"
import { IUser } from "../components/customSearch/CustomSearch"

export const getChats = createAsyncThunk(
  "chats/getChats",
  async ({ from }: { from: string }) => {
    try {
      const { data } = await instanceAxios({
        method: "POST",
        url: "/messages/getchats",

        data: {
          from,
        },
      })

      return data
    } catch (error) {
      console.log("error")
    }
  },
)

interface IInitialState {
  chats: [] | IUser[]
  loading: boolean
  error: null | string
  currentChat: string | null
}

const initialState: IInitialState = {
  chats: [],
  loading: false,
  error: null,
  currentChat: null,
}
const chatsSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    addChat: (state, action) => {
      const chatIndex = state.chats.findIndex(
        (chat) => chat._id === action.payload._id,
      )
      if (chatIndex === -1) {
        state.chats = [action.payload, ...state.chats]
      }
    },
    addCurrentChat: (state, action) => {
      state.currentChat = action.payload
    },
    removeChats: (state) => {
      state.currentChat = null
      state.chats = []
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getChats.fulfilled, (state, action) => {
      // console.log(action.payload)

      state.chats = action.payload
      state.loading = false
      state.error = null
    })
    builder.addCase(getChats.pending, (state, action) => {
      state.loading = true
      state.error = null
    })
    builder.addCase(getChats.rejected, (state, action) => {
      state.loading = false
      state.error = "error"
    })
  },
})
export const chatsReducer = chatsSlice.reducer
export const { addChat, addCurrentChat, removeChats } = chatsSlice.actions
