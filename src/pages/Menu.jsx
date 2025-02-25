import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { useQuery } from "@tanstack/react-query";
import { fetchMenu } from "../api/menu";
import Loading from "../components/Loading";
import { MenuNavbar } from "../components/MenuNavbar";
import { ProductCard } from "../components/ProductCard";

export default function Menu() {
  const {
    data: menu,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["menu"],
    queryFn: fetchMenu,
  });

  if (isLoading) return <Loading />;
  if (error) return <p>Error fetching menu: {error.message}</p>;

  const products = menu?.data || [];
  const categories = [...new Set(products.map((product) => product.category))];
  return (
    <div className="container mx-auto">
      <MenuNavbar />
      <Tabs defaultValue={categories[0]}>
        <TabsList className="flex overflow-x-auto border-b border-gray-300 whitespace-nowrap no-scrollbar">
          {categories.map((category) => (
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
                    imgSrc={`http://localhost:8000/api/v1/menu/images/${product.image}`}
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
