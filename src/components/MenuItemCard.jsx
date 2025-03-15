import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MenuItemDetailsCard } from "@/components/MenuItemDetailsCard";
import { useState } from "react";
import { Plus } from "lucide-react";
import { useCart } from "@/context/cart";
import { useAlert } from "@/components/AlertProvider";

/**
 * Renders a clickable menuItem card that opens a details dialog.
 * @param {Object} props - The component props.
 * @param {Object} props.menuItem - The menuItem details.
 * @param {string} props.menuItem.name - The menuItem name.
 * @param {string} props.menuItem.description - The menuItem description.
 * @param {string} props.menuItem.category - The menuItem caregory.
 * @param {number} props.menuItem.price - The menuItem price.
 * @param {string} props.menuItem.image - The menuItem image url .
 */
function MenuItemCard({ menuItem }) {
  const [open, setOpen] = useState(false);
  const {addToCart} = useCart();
  const showAlert = useAlert();


  const handlePlusButtonClick = (e) =>  {
    e.stopPropagation();
    addToCart({menuItem: menuItem, quantity: 1});
    showAlert("success", "Success!", `${menuItem.name} added to cart!`);
  }
  
  return (
    <>
      <Card
        className="rounded-lg overflow-hidden shadow-sm hover:shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1"
        onClick={() => {
          setOpen(true);
        }}        
      >
        <CardContent className="p-4 flex flex-col ">
          <img
            src={`http://localhost:8000/api/v1/menu/images/${menuItem.image}`}
            alt="menuItem Image"

            className="w-full h-48 object-cover rounded-md object-center transition duration-300 ease-in-out mb-1"
          />
          <CardTitle className="text-xl font-semibold text-nord-0 truncate">
            {menuItem.name}
          </CardTitle>
          <CardDescription className="mb-1 text-nord-11 truncate">
            {menuItem.category}
          </CardDescription>
          <div className="flex justify-between items-center">
            <p className="text-nord-0">${menuItem.price}</p>
            <Button className="text-white bg-nord-11 rounded-md hover:bg-nord-1 
             transition-transform duration-200 ease-in-out 
             active:scale-90 focus:scale-100" onClick={(e) => {handlePlusButtonClick(e)}}>
              <Plus />
            </Button>
          </div>
        </CardContent>
      </Card>
      <MenuItemDetailsCard open={open} setOpen={setOpen} menuItem={menuItem} />
    </>
  );
}

export { MenuItemCard };
