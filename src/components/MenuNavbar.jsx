import {SidebarTrigger, useSidebar} from "@/components/ui/sidebar";
import { ShoppingBag } from "lucide-react";

function MenuNavbar() {
  const { toggleSidebar } = useSidebar();
  
  return (
    <div className="container mx-auto sticky top-0 z-50 bg-white p-4 flex justify-between items-center">
      <h1 className="text-nord-0 text-2xl">CAFE</h1>
      <ShoppingBag
        onClick={toggleSidebar}
        className="text-nord-0 w-5"
      />
    </div>
  );
}

export { MenuNavbar };
