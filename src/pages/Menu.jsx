import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { useQuery } from "@tanstack/react-query";
import { fetchMenu } from "../api/menu";
import Loading from "../components/Loading";
import { MenuItemCard } from "../components/MenuItemCard";
import { MenuItemDetailsCard } from "../components/MenuItemDetailsCard";
import { Button } from "../components/ui/button";
import { useState } from "react";

export default function Menu() {
const  [openDetails, setOpenDetails] = useState(false);
const  [selectedMenuItem, setSelectedMenuItem] = useState(null);
  
  const {
    data: menu,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["menu"],
    queryFn: fetchMenu,
  });

  if (isLoading)
    return (
      <div>
        <Loading />
      </div>
    );
  if (error)
    return (
      <div className="container mx-auto h-svh">
        <div className="w-full h-full flex flex-col gap-3 items-center justify-center">
          <h3 className="text-nord-11 text-lg">Could not load the menu!</h3>
          <Button
            className="bg-nord-11 hover:bg-nord-1 text-white rounded-lg active:scale-95 transition"
            onClick={() => {
              refetch();
            }}
          >
            Retry
          </Button>
        </div>
      </div>
    );

  const menuItems = menu?.data || [];
  const categories = [...new Set(menuItems.map((menuItem) => menuItem.category))];

  
  // Sort categories alphabetically, but for two-word categories, sort based on the second word
  const sortedCategories = categories.sort((a, b) => {
    const wordsA = a.split(' ');
    const wordsB = b.split(' ');

    // If both have two words, compare by the second word
    if (wordsA.length === 2 && wordsB.length === 2) {
      return wordsA[1].localeCompare(wordsB[1]);
    }

    // Otherwise, compare alphabetically
    return a.localeCompare(b);
  });
  
  return (
    <>
      <Tabs defaultValue={categories[0]}>
        <TabsList className="flex overflow-x-auto border-b border-gray-300 whitespace-nowrap no-scrollbar">
          {sortedCategories.map((category) => (
            <TabsTrigger
              key={category}
              value={category}
              className="px-4 py-2 text-nord-0 hover:text-nord-3 transition-colors font-medium border-b-2 border-transparent data-[state=active]:text-nord- data-[state=active]:border-nord-0 truncate"
            >
              {category}
            </TabsTrigger>
          ))}
        </TabsList>
        {categories.map((category) => (
          <TabsContent key={category} value={category}>
            <div className="container mx-auto my-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-8">
              {menuItems
                .filter((menuItem) => menuItem.category === category)
                .map((menuItem, index) => (
                  <MenuItemCard key={index} menuItem={menuItem} setOpenDetails={setOpenDetails} setSelectedMenuItem={setSelectedMenuItem} />
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
      {selectedMenuItem && (
        <MenuItemDetailsCard
          open={openDetails}
          setOpen={setOpenDetails}
          menuItem={selectedMenuItem}
        />
      )}
    </>
  );
}
