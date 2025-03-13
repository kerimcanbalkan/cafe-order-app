import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Menu from "./pages/Menu";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import Waiter from "./pages/Waiter";
import Cashier from "./pages/Cashier";
import NotFound from "./pages/NotFound";
import MenuLayout from "./components/MenuLayout";
import Error from "./pages/Error";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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
    element: <Admin />,
    errorElement: <Error/>,
  },
  {
    path: "/waiter",
    element: <Waiter />,
    errorElement: <Error/>,
  },
  {
    path: "/cashier",
    element: <Cashier />,
    errorElement: <Error/>,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
);
