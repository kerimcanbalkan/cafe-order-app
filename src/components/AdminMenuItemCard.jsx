import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Trash, Pencil } from "lucide-react";

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
export default function AdminMenuItemCard({ menuItem }) {
  return (
    <>
      <Card
        className="rounded-lg overflow-hidden shadow-sm hover:shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1"
      >
        <CardContent className="p-4 flex flex-col ">
          <img
            src={`http://localhost:8000/api/v1/menu/images/${menuItem.image}`}
            alt="menuItem Image"

            className="w-full h-24 object-cover rounded-md object-center transition duration-300 ease-in-out mb-1"
          />
          <CardTitle className="text-sm font-semibold text-nord-0 truncate">
            {menuItem.name}
          </CardTitle>
          <CardDescription className="mb-1 text-xs text-nord-11 truncate">
            {menuItem.category}
          </CardDescription>
          <div className="flex justify-between items-center">
            <p className="text-nord-0 text-xs">${menuItem.price}</p>
            <div className="flex gap-2">
            <Pencil className="text-nord-14" size={15}/>
            <Trash className="text-nord-11"size={15}/>
          </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
