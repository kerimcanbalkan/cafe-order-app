import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import {Button} from "@/components/ui/button";

export default function ProductCard({imgSrc, title, price, category}) {
  return (
    <Card className="rounded-lg overflow-hidden shadow-sm hover:shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1">
      <CardContent className="p-4 flex flex-col ">
        <img
          src={imgSrc}
          alt="Product Image"
          className="w-full h-48 object-cover rounded-md object-center transition duration-300 ease-in-out mb-1"
        />
        <CardTitle className="text-xl font-semibold text-nord-0">
            {title}
          </CardTitle>
        <CardDescription className="mb-1 text-nord-11">
          {category}
        </CardDescription>
        <div className="flex justify-between items-center">
          <p className="text-nord-0">${price}</p>
          <Button className="text-white bg-nord-11 rounded-md">
            +
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
