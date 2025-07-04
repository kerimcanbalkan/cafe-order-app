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
 * @param {string} props.orderItem.menuItem.currency - The menu item currency.
 * @param {string} props.orderItem.menuItem.image - The menu item image URL.
 * @param {number} props.orderItem.quantity - The quantity of the ordered menu item.
 * @param {string} props.className - The tailwind classes for the styling
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
    const total = (price * quantity) / 100;
    return formatPriceIntl(total, orderItem.menuItem.currency);
}
    
  return (
      <Card className={className}>
        <CardHeader className="p-2">
          <div className="flex items-center justify-between">
            <img
              src={`${import.meta.env.VITE_API_IMAGE_URL}/${orderItem.menuItem.image}`}
              alt="menuItem Image"
              className="w-10 h-10 object-cover rounded-md object-center"
            />
            <h3 className="truncate p-2">{orderItem.menuItem.name}</h3>
            <p className="font-bold">{calculatePrice(orderItem.menuItem.price, orderItem.quantity)}</p>
            <div className="flex">
              <LucideChevronLeft className="text-nord-11 cursor-pointer transition-transform duration-200 ease-in-out active:scale-50 focus:scale-100" onClick={handleRemoveClick}/>
              <p>{orderItem.quantity}</p>
              <LucideChevronRight className="text-nord-14 cursor-pointer transition-transform duration-200 ease-in-out active:scale-50 focus:scale-100" onClick={handleAddClick}/>
            </div>
          </div>
        </CardHeader>
      </Card>
  )
}

function formatPriceIntl(amount, currencyCode, locale = 'en-US') {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currencyCode
  }).format(amount);
}
