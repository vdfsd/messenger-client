import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import { authReducer } from "../features/authSlice"
import { chatsReducer } from "../features/chatsSlice"
import { messagesReducer } from "../features/messagesSlice"
import { pageReducer } from "../features/pageSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    chats: chatsReducer,
    messages: messagesReducer,
    page: pageReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
