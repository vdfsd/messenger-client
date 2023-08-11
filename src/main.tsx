import React from "react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import { store } from "./app/store"
import "./index.css"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Login } from "./pages/Login"
import { Registration } from "./pages/Registration"
import { Layout } from "./layout/Layout"
import { Chat } from "./components/chat/Chat"
import { App } from "./App"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Layout />,
        children: [
          {
            path: "/:chatId",
            element: <Chat />,
          },
        ],
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/registration",
        element: <Registration />,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
)

//

// import React from "react"
// import ReactDOM from "react-dom/client"
// import { Provider } from "react-redux"
// import { store } from "./app/store"
// import "./index.css"
// import { createBrowserRouter, RouterProvider } from "react-router-dom"
// import { Login } from "./pages/Login"
// import { Registration } from "./pages/Registration"
// import { Layout } from "./layout/Layout"
// import { Chat } from "./components/chat/Chat"

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Layout />,
//     children: [
//       {
//         path: "/:chatId",
//         element: <Chat />,
//       },
//     ],
//   },
//   {
//     path: "/login",
//     element: <Login />,
//   },
//   {
//     path: "/registration",
//     element: <Registration />,
//   },
// ])

// ReactDOM.createRoot(document.getElementById("root")!).render(
//   <Provider store={store}>
//     <RouterProvider router={router} />
//   </Provider>,
// )
