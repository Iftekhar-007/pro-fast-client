import { createBrowserRouter } from "react-router";
import RootLayout from "../Components/Layouts/RootLayout";
import Home from "../Components/Home/Home";
import AuthLayout from "../Components/AuthLayout";
import Login from "../Components/Login/Login";
import SignUp from "../Components/SignUp/SignUp";
import Coverage from "../Components/Coverage/Coverage";
import SendParcel from "../Components/SendParcel/SendParcel";
import PrivateRoutes from "./PrivateRoutes";
import DashBoard from "../Components/DashBoard/DashBoard";
import MyParcels from "../Components/MyParcels/MyParcels";
import BeARider from "../Components/Rider/BeARider";
import PendingRiders from "../Components/Rider/PendingRiders";
import ActiveRiders from "../Components/Rider/ActiveRiders";
import AdminManager from "../Components/Admin/AdminManager";
import AdminRoute from "./AdminRoute";
import AssignRider from "../Components/Rider/AssignRider";
import RiderRoute from "./RiderRoute";

import RiderTasks from "../Components/Rider/RiderTasks";
import CompletedDeliveries from "../Components/Rider/CompletedDeliveries";
import TotalEarnings from "../Components/Rider/TotalEarnings";
import Payment from "../Components/Pages/Payment";
import PaymentHistory from "../Components/Pages/PaymentHistory";

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

      {
        path: "/bearider",
        element: (
          <PrivateRoutes>
            <BeARider></BeARider>
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
  {
    path: "/dashboard",
    element: (
      <PrivateRoutes>
        <DashBoard></DashBoard>
      </PrivateRoutes>
    ),
    children: [
      {
        path: "myparcels",
        Component: MyParcels,
      },
      {
        path: "payment/:parcelId",
        Component: Payment,
      },
      {
        path: "paymenthistory",
        Component: PaymentHistory,
      },
      {
        path: "rider-tasks",
        element: (
          <RiderRoute>
            <RiderTasks></RiderTasks>
          </RiderRoute>
        ),
      },
      {
        path: "completed-deliveries",
        element: (
          <RiderRoute>
            <CompletedDeliveries></CompletedDeliveries>
          </RiderRoute>
        ),
      },
      {
        path: "total-earnings",
        element: (
          <RiderRoute>
            <TotalEarnings></TotalEarnings>
          </RiderRoute>
        ),
      },
      {
        path: "pendingriders",
        element: (
          <AdminRoute>
            <PendingRiders></PendingRiders>
          </AdminRoute>
        ),
      },
      {
        path: "activeriders",
        element: (
          <AdminRoute>
            <ActiveRiders></ActiveRiders>
          </AdminRoute>
        ),
      },
      {
        path: "admin-manager",
        element: (
          <AdminRoute>
            <AdminManager />
          </AdminRoute>
        ),
      },
      {
        path: "assign-rider",
        element: (
          <AdminRoute>
            <AssignRider></AssignRider>
          </AdminRoute>
        ),
      },
    ],
  },
]);
