import { ProductCard } from "@/components/ProductCard";
import { MenuNavbar } from "@/components/MenuNavbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";

const products = [
  {
    imgSrc:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Margherita Pizza",
    category: "Pizza",
    price: 12.99,
  },
  {
    imgSrc:
      "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Cheeseburger",
    category: "Burger",
    price: 9.99,
  },
  {
    imgSrc:
      "https://images.unsplash.com/photo-1622973536968-3ead9e780960?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Spaghetti Bolognese",
    category: "Pasta",
    price: 10.99,
  },
  {
    imgSrc:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Salad",
    category: "Salads",
    price: 7.99,
  },
  {
    imgSrc:
      "https://images.unsplash.com/photo-1610889556528-9a770e32642f?q=80&w=1915&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Espresso",
    category: "Beverages",
    price: 3.99,
  },
];

const categories = [...new Set(products.map((product) => product.category))];

export default function Menu() {
  return (
    <div className="container mx-auto">
      <MenuNavbar />
      <Tabs defaultValue={categories[0]}>
        <TabsList className="flex overflow-x-auto border-b border-gray-300 whitespace-nowrap no-scrollbar">
          {categories.map((category, index) => (
            <TabsTrigger
              key={category}
              value={category}
              className="px-4 py-2 text-nord-0 hover:text-nord-3 transition-colors font-medium border-b-2 border-transparent data-[state=active]:text-nord- data-[state=active]:border-nord-0"
            >
              {category}
            </TabsTrigger>
          ))}
        </TabsList>
        {categories.map((category) => (
          <TabsContent key={category} value={category}>
            <div className="container mx-auto my-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-8">
              {products
                .filter((product) => product.category === category)
                .map((product, index) => (
                  <ProductCard
                    key={index}
                    imgSrc={product.imgSrc}
                    title={product.title}
                    description={product.description}
                    price={product.price}
                    category={product.category}
                  />
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
