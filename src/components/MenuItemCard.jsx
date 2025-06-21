import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart";
import { useAlert } from "@/components/AlertProvider";

/**
 * Renders a clickable menuItem card that opens a details dialog.
 * @param {Object} props - The component props.
 * @param {Object} props.menuItem - The menuItem details.
 * @param {string} props.menuItem.name - The menuItem name.
 * @param {string} props.menuItem.description - The menuItem description.
 * @param {string} props.menuItem.category - The menuItem category.
 * @param {number} props.menuItem.price - The menuItem price.
 * @param {string} props.menuItem.currency - The menuItem currency.   
 * @param {string} props.menuItem.image - The menuItem image url .
 * @param {function(menuItem): void} props.setSelectedMenuItem - For sharing the seleted item state with the parent component.
 * @param {function(boolean): void} props.setOpenDetails - For sharing the open state of the MenuItemDetails card with the parent component.
 */
function MenuItemCard({ menuItem, setSelectedMenuItem, setOpenDetails }) {
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
          setOpenDetails(true);
          setSelectedMenuItem(menuItem);
        }}        
      >
        <CardContent className="p-4 flex flex-col ">
          <img
            src={`${import.meta.env.VITE_API_IMAGE_URL}/${menuItem.image}`}
            alt="menuItem Image"
            className="w-full h-24 md:h-36 lg:h-48 object-cover rounded-md object-center transition duration-300 ease-in-out mb-1"
          />
          <CardTitle className="text-md font-semibold text-nord-0 truncate">
            {menuItem.name}
          </CardTitle>
          <CardDescription className="mb-1 text-nord-11 truncate">
            {menuItem.category}
          </CardDescription>
          <div className="flex justify-between items-center">
            <p className="text-nord-0 font-bold">{formatPriceIntl((menuItem.price)/100, menuItem.currency)}</p>
            <Button className="text-white bg-nord-11 rounded-md hover:bg-nord-1 
             transition-transform duration-200 ease-in-out 
            active:scale-90 focus:scale-100 p-4 text-sm md:text-md lg:text-lg" onClick={(e) => {handlePlusButtonClick(e)}}>
              +
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

export { MenuItemCard };

function formatPriceIntl(amount, currencyCode, locale = 'en-US') {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currencyCode
  }).format(amount);
}
