import {MenuNavbar} from "@/components/MenuNavbar";
import {CartSidebar} from "@/components/CartSidebar";
import { Outlet } from "react-router-dom";
import {SidebarProvider} from "@/components/ui/sidebar";

export default function MenuLayout(){
  return (
    <SidebarProvider defaultOpen={false}>
      <main className="container mx-auto">
          <MenuNavbar/>
          <Outlet/>
          <CartSidebar/>
      </main>
    </SidebarProvider>
  )
}
