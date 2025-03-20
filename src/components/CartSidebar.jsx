import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  useSidebar
} from "@/components/ui/sidebar";
import { X } from "lucide-react";
import CartMenuItemCard from "@/components/CartMenuItemCard";
import { Button } from "./ui/button";
import { useCart } from "@/context/cart";
import {useOrder} from "@/context/order";
import PlaceOrderButton from "./PlaceOrderButton";


export function CartSidebar() {
  const { toggleSidebar } = useSidebar();
  const { cart, getCartTotal, clearCart } = useCart();
  const { order, getOrderTotal } = useOrder();
  const transformedOrder = order.length > 0
        ? order.reduce((acc, order) => {
            order.items.forEach((item) => {
              const existingItem = acc.find((i) => i.menuItem.id === item.menuItem.id);
              if (existingItem) {
                existingItem.quantity += item.quantity;
              } else {
                acc.push({ ...item });
              }
            });
            return acc;
          }, [])
    : [];
  
  return (
    <Sidebar side="right" variant="inset">
      <SidebarHeader className="flex items-end">
        <X className="text-nord-11" onClick={toggleSidebar}/>
      </SidebarHeader>
      <SidebarContent className="p-3">
        {transformedOrder.length === 0 ? (
          ""
        ) : (
          <div>
            <h2 className="border-b border-nord-10 mb-2 text-xl font-bold text-nord-10">
              Active Order
            </h2>
            {transformedOrder.map((item) => (
              <div key={item.menuItem.id} className="flex justify-between mb-2">
                <p className="text-nord-1">{`${item.menuItem.name} x${item.quantity}`}</p>
                <p className="font-bold text-nord-1">{`${item.menuItem.price * item.quantity}$`}</p>
              </div>
            ))}
            <div className="border-t border-nord-4 pt-2 mt-2">
              <p className="text-lg flex justify-between">
                <span>Total Order Price</span>
                <span className="font-bold">{getOrderTotal()}$</span>
              </p>
            </div>
          </div>
        )}
        <h2 className="border-b border-nord-14 my-2 text-xl text-nord-14 font-bold">Cart</h2>
        <div className="overflow-y-scroll no-scrollbar">
        {cart.length === 0 ? (
          <p className="text-md text-nord-11">Nothing in Cart!</p>
        ) : (
          cart.map((item) => (
            <CartMenuItemCard key={item.menuItem.id} orderItem={item} className="mb-2" />
          ))
        )}
        </div>
                {cart.length === 0 ? (""): (
          <div>
                        <p className="text-lg border-t border-nord-4 pt-3 text-nord-1 mt-2 flex justify-between">Total Price <span className="font-bold">{getCartTotal()}$</span></p>
            <Button className="bg-nord-11 hover:bg-nord-1 w-full mt-4 text-lg transition-transform duration-200 ease-in-out active:scale-90 focus:scale-100"onClick={clearCart}>Clear Cart</Button>
          </div>
        )}
      </SidebarContent>
      <SidebarFooter>
        {cart.length ? (<PlaceOrderButton/>) : ("") } 
      </SidebarFooter>
    </Sidebar>
  );
}
