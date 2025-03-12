import { MenuNavbar } from "@/components/MenuNavbar";
import { CartSidebar } from "@/components/CartSidebar";
import { Outlet } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { CartProvider } from "@/context/cart";
import { OrderProvider } from "@/context/order";
import { AlertProvider } from "@/components/AlertProvider";

export default function MenuLayout() {
  return (
    <CartProvider>
      <OrderProvider>
        <SidebarProvider defaultOpen={false}>
        <AlertProvider>
        <main className="relative container mx-auto bg-white">
          <MenuNavbar />
          <Outlet />
          <CartSidebar />
        </main>
        </AlertProvider>
      </SidebarProvider>
      </OrderProvider>
    </CartProvider>
  );
}
