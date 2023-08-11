import { createSlice } from "@reduxjs/toolkit"

interface IInitialState {
  activeChatPage: boolean
}
const initialState = {
  activeChatPage: false,
}

const pageSlice = createSlice({
  name: "page",
  initialState,
  reducers: {
    setActiveChatPage: (state, action) => {
      state.activeChatPage = action.payload
    },
  },
})

export const pageReducer = pageSlice.reducer
export const { setActiveChatPage } = pageSlice.actions
