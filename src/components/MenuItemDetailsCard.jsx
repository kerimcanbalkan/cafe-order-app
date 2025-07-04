import { Dialog, DialogContent } from "@/components/ui/dialog";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { QuantitySelector } from "@/components/QuantitySelector";
import { useState } from "react";
import { Button } from "./ui/button";
import { useCart } from "@/context/cart"
import { useAlert } from "@/components/AlertProvider";

/**
 * Displays the menuItem details inside a dialog.
 * @param {Object} props - The component props.
 * @param {string} props.className - Tailwind classes for styling of the component
 * @param {boolean} props.open - Controls whether the dialog is open.
 * @param {function(boolean):void} props.setOpen - Function to toggle the dialog open state.
 * @param {Object} props.menuItem - The product details.
 * @param {string} props.menuItem.name - The name of the product.
 * @param {string} props.menuItem.description - The product description.
 * @param {string} props.menuItem.category - The product category.
 * @param {number} props.menuItem.price - The product price.
 * @param {string} props.menuItem.currency - The product price.
 * @param {string} props.menuItem.image - The product image url.
 */
function MenuItemDetailsCard({ className, open, setOpen, menuItem }) {
  const [quantity, setQuantity] = useState(1);
  const {addToCart} = useCart();
  const showAlert = useAlert();

  const  priceStr = formatPriceIntl((menuItem.price * quantity)/100, menuItem.currency);

  const handleAddToCart = () => {
    addToCart({menuItem, quantity});
    showAlert("success", "Success!", `${menuItem.name} added to cart!`);
    setOpen(false);
  }
  return (
    <Dialog open={open} onOpenChange={setOpen} className={className}>
      <DialogContent className="p-8">
        <div className="relative">
          <img
            src={`${import.meta.env.VITE_API_IMAGE_URL}/${menuItem.image}`}
            alt="menuItem Image"
            className="w-full h-60 object-cover rounded-md object-center"
          />
          <QuantitySelector
            className="absolute bottom-2 left-1/2 transform -translate-x-1/2"
            quantity={quantity}
            setQuantity={setQuantity}
            value={1}
          />
        </div>
        <DialogTitle className="text-nord-0 truncate">{menuItem.name}</DialogTitle>
        <DialogDescription className="text-nord-2 text-sm">
          {menuItem.description}
        </DialogDescription>
        <Button className="bg-nord-11 text-nord-6 hover:bg-nord-12 active:scale-95 transition truncate" onClick={handleAddToCart}>
                                                 Add to cart for <span className="font-bold">{priceStr}</span>
        </Button>
      </DialogContent>
    </Dialog>
  );
}

export { MenuItemDetailsCard };

function formatPriceIntl(amount, currencyCode, locale = 'en-US') {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currencyCode
  }).format(amount);
}
