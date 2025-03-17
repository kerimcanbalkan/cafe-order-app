import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Menu from "./pages/Menu";
import Login from "./pages/Login";
import Waiter from "./pages/Waiter";
import Cashier from "./pages/Cashier";
import NotFound from "./pages/NotFound";
import MenuLayout from "./components/layout/MenuLayout";
import Error from "./pages/Error";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/context/auth";
import RequireAuth from "@/components/RequireAuth";
import DashboardLayout from "@/components/layout/DashboardLayout";
import AdminEmployees from "@/pages/AdminEmployees";
import AdminOverview from "@/pages/AdminOverview";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/order/:tableNumber",
    element: <MenuLayout />,
    children: [
      {
      index: true,
        element: <Menu/>,
        errorElement: <Error/>,
      }
    ]
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <Error/>,
  },
  {
    path: "/admin",
    element: <DashboardLayout/>,
    children : [
      {
        index:true,
        element:   (
          <RequireAuth allowedRole="admin">
            <AdminOverview />
          </RequireAuth>
        ),
        errorElement: <Error/>,
      },
      {
        path: "employees",
        element: (
          <RequireAuth allowedRole="admin">
            <AdminEmployees/>
          </RequireAuth>                                   
        )
      }
    ]
  },
  {
    path: "/waiter",
    element: (
      <RequireAuth allowedRole="waiter">
        <Waiter />
      </RequireAuth>
    ),
    errorElement: <Error/>,
  },
  {
    path: "/cashier",
    element: (
      <RequireAuth allowedRole="cashier">
        <Cashier />
      </RequireAuth>
    )
    ,
    errorElement: <Error/>,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
          </AuthProvider>
  </StrictMode>,
);
