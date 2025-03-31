import { Plus } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { useQuery } from "@tanstack/react-query";
import { fetchMenu } from "../api/menu";
import Loading from "../components/Loading";
import AdminMenuItemCard from "../components/AdminMenuItemCard";
import { Button } from "../components/ui/button";

export default function AdminMenu() {
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
      <div className="flex justify-end items-center border-b-1 border-nord-4 p-2">
        <Button className="text-sm ftext-white bg-nord-10"><Plus/></Button>
      </div>
            <div className="container mx-auto my-10 grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-6 gap-1">
              {menuItems
                .map((menuItem, index) => (
                  <AdminMenuItemCard key={index} menuItem={menuItem} />
                ))}
            </div>
    </>
  );
}
