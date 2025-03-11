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

export function CartSidebar() {
  const { toggleSidebar } = useSidebar();
  const { cart, removeFromCart, clearCart } = useCart();
  
  return (
    <Sidebar side="right" variant="inset">
      <SidebarHeader className="flex items-end">
        <X className="text-nord-11 hover:text-xl" onClick={toggleSidebar}/>
      </SidebarHeader>
      <SidebarContent className="p-3">
        <p className="border-b border-nord-4 text-nord-1 mb-2 text-lg">Cart</p>
        {cart.length === 0 ? (
          <p className="text-md text-nord-11 text-center">Nothing here!</p>
        ) : (
          cart.map((item) => (
            <CartMenuItemCard key={item.id} menuItem={item} />
          ))
        )}
      </SidebarContent>
      <SidebarFooter>
        <Button className="bg-nord-11 text-nord-6 hover:bg-nord-12">
          Place Order
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
