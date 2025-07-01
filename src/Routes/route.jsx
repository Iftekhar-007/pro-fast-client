import { createBrowserRouter } from "react-router";
import RootLayout from "../Components/Layouts/RootLayout";
import Home from "../Components/Home/Home";
import AuthLayout from "../Components/AuthLayout";
import Login from "../Components/Login/Login";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "/login",
        Component: Login,
      },
    ],
  },
]);
