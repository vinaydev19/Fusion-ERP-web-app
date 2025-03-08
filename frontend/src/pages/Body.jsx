import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Home";
import Dashboard from "../components/dashboard/Dashboard";
import Products from "../components/dashboard/Products";
import Sales from "../components/dashboard/Sales";
import FinancialTransactions from "../components/dashboard/FinancialTransactions";
import Customer from "../components/dashboard/Customer";
import Deliveries from "../components/dashboard/Deliveries";
import Invoices from "../components/dashboard/Invoices";
import PurchaseOrders from "../components/dashboard/PurchaseOrders";
import Employees from "../components/dashboard/Employees";
import Login from "./Login";
import Register from "./Register";
import ChangePassword from "../components/dashboard/ChangePassword";
import Profile from "../components/dashboard/Profile";
import ChangeEmail from "../components/dashboard/ChangeEmail";
import LandingPage from "./LandingPage";
import EmailVerification from "./EmailVerification";
import ResetPassVerification from "./ResetPassVerification";
import ResetPassword from "./ResetPassword";
import UserVerification from "./UserVerification";
import ChangeEmailVerification from "@/components/dashboard/ChangeEmailVerification";

function Body() {
  const router = createBrowserRouter([
    {
      path: "",
      element: <LandingPage />, // Show LandingPage by default
    },
    {
      path: "register",
      element: <Register />,
    },
    {
      path: "register/user-verification",
      element: <UserVerification />,
    },
    {
      path: "login",
      element: <Login />,
    },
    { path: "login/email-verification", element: <EmailVerification /> },
    {
      path: "login/reset-password-verification",
      element: <ResetPassVerification />,
    },
    {
      path: "login/reset-password-verification/reset-password",
      element: <ResetPassword />,
    },
    {
      path: "/dashboard",
      element: <Home />, // Home page contains the dashboard
      children: [
        { path: "", element: <Dashboard /> }, // Default to Dashboard
        { path: "product-inventory", element: <Products /> },
        { path: "sales", element: <Sales /> },
        { path: "financial-transactions", element: <FinancialTransactions /> },
        { path: "invoice-generator", element: <Invoices /> },
        { path: "employees-management", element: <Employees /> },
        { path: "deliveries", element: <Deliveries /> },
        { path: "customer-management", element: <Customer /> },
        { path: "purchase-orders", element: <PurchaseOrders /> },
        { path: "change-password", element: <ChangePassword /> },
        { path: "change-email", element: <ChangeEmail /> },
        { path: "change-email/change-email-verification", element: <ChangeEmailVerification /> },
        { path: "profile", element: <Profile /> },
      ],
    },
  ]);

  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default Body;
