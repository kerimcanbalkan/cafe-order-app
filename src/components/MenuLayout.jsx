import {MenuNavbar} from "@/components/MenuNavbar";
import {CartSidebar} from "@/components/CartSidebar";
import { Outlet } from "react-router-dom";
import {SidebarProvider} from "@/components/ui/sidebar";

export default function MenuLayout(){
  return (
    <SidebarProvider>
      <main>
        <MenuNavbar/>
        <div className="container mx-auto">
          <Outlet/>
        </div>
        <CartSidebar/>
      </main>
    </SidebarProvider>
  )
}
