import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { QuantitySelector } from "@/components/QuantitySelector";
import { useState } from "react";
import { Button } from "./ui/button";
/**
 * Displays the product details inside a dialog.
 * @param {Object} props - The component props.
 * @param {boolean} props.open - Controls whether the dialog is open.
 * @param {function(boolean):void} props.setOpen - Function to toggle the dialog open state.
 * @param {Object} props.product - The product details.
 * @param {string} props.product.name - The name of the product.
 * @param {string} props.product.description - The product description.
 * @param {string} props.product.category - The product category.
 * @param {number} props.product.price - The product price.
 * @param {string} props.product.image - The product image url.
 */
function ProductDetailsCard({ className, open, setOpen, product }) {
  const [quantity, setQuantity] = useState(1);
  return (
    <Dialog open={open} onOpenChange={setOpen} className={className}>
      <DialogContent className="p-8">
        <div className="relative">
          <img
            src={`http://localhost:8000/api/v1/menu/images/${product.image}`}
            alt="Product Image"
            className="w-full h-60 object-cover rounded-md object-center"
          />
          <QuantitySelector
            className="absolute bottom-2 left-1/2 transform -translate-x-1/2"
            value={1}
            onChange={(val) => setQuantity(val)}
          />
        </div>
        <DialogTitle className="text-nord-0">{product.name}</DialogTitle>
        <DialogDescription className="text-nord-2 text-sm">
          {product.description}
        </DialogDescription>
        <Button className="bg-nord-11 text-nord-6 hover:bg-nord-12">
          Add to cart for <span className="font-bold">${product.price}</span>
        </Button>
      </DialogContent>
    </Dialog>
  );
}

export { ProductDetailsCard };
