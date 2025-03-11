import {
  Card,
  CardHeader,
} from "@/components/ui/card"
import {X} from "lucide-react"
import {useCart} from "@/context/cart";
/**
 * Renders a menuItem card for the sidebar that users can see what they are orderings and edit the order.
 * @param {Object} props - The component props.
 * @param {Object} props.menuItem - The menuItem details.
 * @param {string} props.menuItem.name - The menuItem name.
 * @param {string} props.menuItem.description - The menuItem description.
 * @param {string} props.menuItem.category - The menuItem caregory.
 * @param {number} props.menuItem.price - The menuItem price.
 * @param {string} props.menuItem.image - The menuItem image url .
 */
export default function CarMenuItemCard({menuItem, className}){
  const { removeFromCart } = useCart();
  return (
    <>
      <Card className={className}>
        <CardHeader className="p-2">
          <div className="flex items-center justify-between">
            <img
              src={`http://localhost:8000/api/v1/menu/images/${menuItem.image}`}
              alt="menuItem Image"
              className="w-10 h-10 object-cover rounded-md object-center"
            />
            <h3>{menuItem.name}</h3>
            <p className="font-bold">{menuItem.price}$</p>
            <X className="w-4 text-nord-11 flex justify-self-end" onClick={() => {removeFromCart(menuItem.id)}
            }/>
          </div>
        </CardHeader>
      </Card>
    </>
  )
}





