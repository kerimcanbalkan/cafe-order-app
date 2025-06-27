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
import { UserProvider } from "@/context/user";
import RequireAuth from "@/components/RequireAuth";
import DashboardLayout from "@/components/layout/DashboardLayout";
import ValidateTable from "@/components/ValidateTable";
import AdminNavMenu from "@/components/AdminNavMenu";
import AdminStatistics from "@/pages/AdminStatistics";
import AdminMenu from "@/pages/AdminMenu";
import AdminTables from "@/pages/AdminTables";
import AdminOrders from "@/pages/AdminOrders";
import AdminEmployees from "@/pages/AdminEmployees";
import LandingPage from "@/pages/LandingPage";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path:"/",
    element: <LandingPage/>,
    errorElement: <Error/>,
  },
  {
    path: "/order/:tableID",
    element:
      (
        <ValidateTable>
          <MenuLayout />                  
        </ValidateTable>
      ),
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
    element: (
      <RequireAuth allowedRole="admin">
        <DashboardLayout navMenu={<AdminNavMenu />} />
      </RequireAuth>
    ),
    children : [
      {
        index:true,
        element:<AdminStatistics/>,
        errorElement: <Error/>,
      },
      {
        path: "menu",
        element:<AdminMenu/>,
      },
      {
        path: "tables",
        element:<AdminTables/>,
      },
      {
        path: "orders",
        element:<AdminOrders/>,
      },
      {
        path: "employees",
        element:<AdminEmployees/>,
      }
    ]
  },
  {
    path: "/waiter",
    element: (
      <RequireAuth allowedRole="waiter">
        <DashboardLayout/>
      </RequireAuth>
    ),
    children : [
      {
        index:true,
        element:   (

          <Waiter />

        ),
        errorElement: <Error/>,
      },
    ]
  },
  {
    path: "/cashier",
    element: (
      <RequireAuth allowedRole="cashier">
        <DashboardLayout/>
      </RequireAuth>
    ),
    children : [
      {
        index:true,
        element:<Cashier />,
        errorElement: <Error/>,
      },
    ]
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserProvider>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </AuthProvider>
    </UserProvider>
  </StrictMode>,
);
