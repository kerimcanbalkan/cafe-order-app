import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProductDetailsCard } from "@/components/ProductDetailsCard";
import { useState } from "react";
import { Plus } from "lucide-react";

/**
 * Renders a clickable product card that opens a details dialog.
 * @param {Object} props - The component props.
 * @param {Object} props.product - The product details.
 * @param {string} props.product.name - The product name.
 * @param {string} props.product.description - The product description.
 * @param {string} props.product.category - The product caregory.
 * @param {number} props.product.price - The product price.
 * @param {string} props.product.image - The product image url .
 */
function ProductCard({ product }) {
  const [open, setOpen] = useState(false);
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
            src={`http://localhost:8000/api/v1/menu/images/${product.image}`}
            alt="Product Image"
            className="w-full h-48 object-cover rounded-md object-center transition duration-300 ease-in-out mb-1"
          />
          <CardTitle className="text-xl font-semibold text-nord-0">
            {product.name}
          </CardTitle>
          <CardDescription className="mb-1 text-nord-11">
            {product.category}
          </CardDescription>
          <div className="flex justify-between items-center">
            <p className="text-nord-0">${product.price}</p>
            <Button className="text-white bg-nord-11 rounded-md hover:bg-nord-12">
              <Plus />
            </Button>
          </div>
        </CardContent>
      </Card>
      <ProductDetailsCard open={open} setOpen={setOpen} product={product} />
    </>
  );
}

export { ProductCard };
