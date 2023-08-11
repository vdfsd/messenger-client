import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { instanceAxios } from "../utils/instance"
import toast from "react-hot-toast"
import { IUser } from "../components/customSearch/CustomSearch"

interface ISendMessageProps {
  to: string
  from: string
  messageValue: string
}

interface IMessage {
  fromSelf: boolean
  message: string
}

export const sendMessage = createAsyncThunk(
  "message/sendMessage",
  async ({ to, from, messageValue }: ISendMessageProps) => {
    try {
      const { data } = await instanceAxios({
        method: "POST",
        url: "/messages/addmsg",

        data: {
          message: messageValue,
          to,
          from,
        },
      })

      return data
    } catch (error) {
      toast.error("Error")
    }
  },
)
export const getMessages = createAsyncThunk(
  "messages/getMessages",
  async ({ to, from }: { from: string; to: string }) => {
    try {
      const { data } = await instanceAxios({
        method: "POST",
        url: "/messages/getmsg",

        data: {
          from,
          to,
        },
      })

      return data
    } catch (error) {
      toast.error("Error")
    }
  },
)

interface IInitialState {
  messages: null | IMessage[]
  loading: boolean
  error: null | string
}

const initialState: IInitialState = {
  messages: null,
  loading: false,
  error: null,
}
const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    addMessage: (state, action) => {
      if (state.messages !== null) {
        state.messages = [...state.messages, action.payload]
      } else {
        state.messages = [action.payload]
      }
    },
    removeMessages: (state) => {
      state.messages = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.loading = false
        state.error = null
      })
      .addCase(sendMessage.pending, (state, action) => {
        state.loading = true
        state.error = null
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.loading = false
        state.error = "error"
      })
      .addCase(getMessages.fulfilled, (state, action) => {
        state.messages = action.payload
        state.loading = false
        state.error = null
      })
      .addCase(getMessages.pending, (state, action) => {
        state.loading = true
        state.error = null
      })
      .addCase(getMessages.rejected, (state, action) => {
        state.loading = false
        state.error = "error"
      })
  },
})
export const messagesReducer = messagesSlice.reducer
export const { addMessage, removeMessages } = messagesSlice.actions
