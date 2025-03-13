import {useSidebar} from "@/components/ui/sidebar";
import { ShoppingBag } from "lucide-react";

function MenuNavbar() {
  const { toggleSidebar } = useSidebar();
  
  return (
    <div className="sticky top-0 z-50 bg-white p-4 flex justify-between items-center">
      <h1 className="text-nord-0 text-2xl">CAFE</h1>
      <ShoppingBag
        onClick={toggleSidebar}
        className="text-nord-0 w-5 transition-transform duration-200 ease-in-out 
        active:scale-90 focus:scale-100"
      />
    </div>
  );
}

export { MenuNavbar };
