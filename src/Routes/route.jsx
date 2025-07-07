import { createBrowserRouter } from "react-router";
import RootLayout from "../Components/Layouts/RootLayout";
import Home from "../Components/Home/Home";
import AuthLayout from "../Components/AuthLayout";
import Login from "../Components/Login/Login";
import SignUp from "../Components/SignUp/SignUp";
import Coverage from "../Components/Coverage/Coverage";
import SendParcel from "../Components/SendParcel/SendParcel";
import PrivateRoutes from "./PrivateRoutes";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/coverage",
        Component: Coverage,
      },
      {
        path: "/sendparcel",
        // Component: SendParcel,
        element: (
          <PrivateRoutes>
            <SendParcel></SendParcel>
          </PrivateRoutes>
        ),
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
      {
        path: "/signup",
        Component: SignUp,
      },
    ],
  },
]);
