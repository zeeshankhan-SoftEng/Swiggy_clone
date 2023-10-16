import React, { Suspense,lazy } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import AppLayout from "./App";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import About from "./component/About";
import Error from "./component/Error";
import RestaurantMenu from "./component/RestaurantMenu";
// import Body from "./component/Body";
import Cart from "./component/Cart"
import Login from "./component/Login";
import SignUp from "./component/SignUp";
const Body = lazy(()=> import("./component/Body"))

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/about",
        element: <About />,
        
        children: [
          // {
          //   path: "/cart",
          //   element: <Cart />,
          // },
        ],
      },
      {
        path: "/",
        element:(
          <Suspense fallback={"Loading................"}>
            <Body />
          </Suspense>

        ) 
      },

      {
        path: "/restaurant/:resId",
        element: <RestaurantMenu />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
    ],
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <RouterProvider router={appRouter}>
      <AppLayout />
    </RouterProvider>
);

