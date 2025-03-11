import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  useSidebar
} from "@/components/ui/sidebar"
import { X } from "lucide-react";
import CartMenuItemCard from "@/components/CartMenuItemCard"
import { Button } from "./ui/button";
import { useCart } from "@/context/cart"
import { useAlert } from "@/components/AlertProvider";

export function CartSidebar() {
  const { toggleSidebar } = useSidebar();
  const { cart, getCartTotal, clearCart } = useCart();
  
  return (
    <Sidebar side="right" variant="inset">
      <SidebarHeader className="flex items-end">
        <X className="text-nord-11 active:scale-50 transition" onClick={toggleSidebar}/>
      </SidebarHeader>
      <SidebarContent className="p-3">
        <div className="border-b border-nord-4  mb-2"></div>
        {cart.length === 0 ? (
          <p className="text-md text-nord-11 text-center">Nothing here!</p>
        ) : (
          cart.map((item) => (
            <CartMenuItemCard key={item.id} orderItem={item} />
          ))
        )}
        <p class="text-lg border-t border-nord-4 pt-1 text-nord-1 mt-2 flex justify-around">Total Price <span className="font-bold">{getCartTotal()}$</span></p>
        <Button className="bg-nord-10 text-lg active:scale-50 transition"onClick={clearCart}>Clear Cart</Button>
      </SidebarContent>
      <SidebarFooter>
        <Button className="bg-nord-11 text-nord-6 text-lg hover:bg-nord-12 active:scale-50 transition">
          Place Order
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
