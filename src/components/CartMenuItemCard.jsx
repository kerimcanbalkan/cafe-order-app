import {
  Card,
  CardHeader,
} from "@/components/ui/card"
import {LucideChevronLeft, LucideChevronRight} from "lucide-react"
import {useCart} from "@/context/cart";
/**
 * Renders an order item card for the sidebar, showing the ordered menu item details and allowing users to edit the order.
 * @param {Object} props - The component props.
 * @param {Object} props.orderItem - The order item details.
 * @param {Object} props.orderItem.menuItem - The menu item details.
 * @param {string} props.orderItem.menuItem.name - The menu item name.
 * @param {string} props.orderItem.menuItem.description - The menu item description.
 * @param {string} props.orderItem.menuItem.category - The menu item category.
 * @param {number} props.orderItem.menuItem.price - The menu item price.
 * @param {string} props.orderItem.menuItem.image - The menu item image URL.
 * @param {number} props.orderItem.quantity - The quantity of the ordered menu item.
 */
export default function CartMenuItemCard({orderItem, className}){
  const { addToCart, removeFromCart } = useCart();

  const handleAddClick = () => {
      addToCart(orderItem);
  }

  const handleRemoveClick = () => {
    removeFromCart(orderItem);
  }

  const calculatePrice = (price, quantity) => {
    const total = price * quantity;
    return Math.trunc(total * 100)/100;
}
    
  return (
    <>
      <Card className={className}>
        <CardHeader className="p-2">
          <div className="flex items-center justify-between">
            <img
              src={`http://localhost:8000/api/v1/menu/images/${orderItem.menuItem.image}`}
              alt="menuItem Image"
              className="w-10 h-10 object-cover rounded-md object-center"
            />
            <h3 className="truncate p-2">{orderItem.menuItem.name}</h3>
            <p className="font-bold">{calculatePrice(orderItem.menuItem.price, orderItem.quantity)}$</p>
            <div className="flex">
              <LucideChevronLeft className="text-nord-11 cursor-pointer active:scale-50 transition" onClick={handleRemoveClick}/>
              <p>{orderItem.quantity}</p>
              <LucideChevronRight className="text-nord-14 cursor-pointer active:scale-50 transition" onClick={handleAddClick}/>
            </div>
          </div>
        </CardHeader>
      </Card>
    </>
  )
}
