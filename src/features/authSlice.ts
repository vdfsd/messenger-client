import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { instanceAxios } from "../utils/instance"
import toast from "react-hot-toast"

interface IUser {
  username: string
  email: string
  password: string
  fullname: string
  _id?: string
  avatar: string
}
interface ILoginUser {
  username: string
  password: string
}

interface IInitialState {
  user: IUser | null
  token: string
  loading: boolean
  error: string | null
}

const initialState: IInitialState = {
  user: null,
  token: "",
  loading: false,
  error: null,
}

export const fetchRegistation = createAsyncThunk(
  "auth/fetchRegistation",
  async (
    { username, email, fullname, password, avatar }: IUser,
    { dispatch, rejectWithValue },
  ) => {
    try {
      const { data } = await instanceAxios({
        method: "POST",
        url: "/auth/registration",

        data: {
          username,
          email,
          fullname,
          password,
          avatar,
        },
      })

      toast.success(data.message)

      return data
    } catch (error) {
      toast.error("Error")
    }
  },
)
export const fetchLogin = createAsyncThunk(
  "auth/fetchLogin",
  async (
    { username, password }: ILoginUser,
    { dispatch, rejectWithValue, getState },
  ) => {
    try {
      const { data, status } = await instanceAxios({
        method: "POST",
        url: "/auth/login",

        data: {
          username,
          password,
        },
      })

      localStorage.setItem("token", data.token)

      toast.success(data.message)
      return data
    } catch (error: any) {
      if (error.request.status === 404 || error.request.status === 402) {
        toast.error(error.response.data.message)
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.response.data.message)
      }
    }
  },
)

export const getMe = createAsyncThunk("auth/getme", async () => {
  try {
    const { data } = await instanceAxios({
      method: "POST",
      url: "/auth/getme",
    })

    return data
  } catch (error) {
    console.log(error)
  }
})

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null
      state.token = ""
      window.localStorage.removeItem("token")
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRegistation.fulfilled, (state, action) => {
      state.user = action.payload.user
      state.token = action.payload.token
      state.loading = false
      state.error = null
    })
    builder.addCase(fetchRegistation.pending, (state, action) => {
      state.loading = true
      state.error = null
    })
    builder.addCase(fetchRegistation.rejected, (state, action) => {
      state.loading = false
      state.error = "error"
    })
    builder.addCase(fetchLogin.fulfilled, (state, action) => {
      // state.user = action.payload.user
      // state.token = action.payload.token
      state.loading = false
      state.error = null
    })
    builder.addCase(fetchLogin.pending, (state, action) => {
      state.loading = true
      state.error = null
    })
    builder.addCase(fetchLogin.rejected, (state, action) => {
      state.loading = false
      state.error = "error"
    })
    builder.addCase(getMe.fulfilled, (state, action) => {
      state.user = action.payload.user
      state.token = action.payload.token
      state.loading = false
      state.error = null
    })
    builder.addCase(getMe.pending, (state, action) => {
      state.loading = true
      state.error = null
    })
    builder.addCase(getMe.rejected, (state, action) => {
      state.loading = false
      state.error = "error"
    })
  },
})

export const authReducer = authSlice.reducer
export const { logout } = authSlice.actions
