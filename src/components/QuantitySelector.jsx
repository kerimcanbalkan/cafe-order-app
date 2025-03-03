import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";

export function QuantitySelector({ value = 1, onChange, className }) {
  const [quantity, setQuantity] = useState(value);

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity((prev) => {
        const newValue = prev - 1;
        onChange?.(newValue);
        return newValue;
      });
    }
  };

  const handleIncrease = () => {
    setQuantity((prev) => {
      const newValue = prev + 1;
      onChange?.(newValue);
      return newValue;
    });
  };

  return (
    <div
      className={`flex items-center bg-white rounded-full p-1 w-fit text-nord-0 ${className}`}
    >
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full text-xs text-nord-11"
        onClick={handleDecrease}
      >
        <Minus />
      </Button>
      <span className="px-2 text-xs font-medium">{quantity}</span>
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full text-xs text-nord-14"
        onClick={handleIncrease}
      >
        <Plus />
      </Button>
    </div>
  );
}
