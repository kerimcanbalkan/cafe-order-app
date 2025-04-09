import { Plus } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchMenu } from "@/api/menu";
import Loading from "@/components/Loading";
import AdminMenuItemCard from "@/components/AdminMenuItemCard";
import { Button } from "@/components/ui/button";
import MenuItemDeleteDialog from "@/components/MenuItemDeleteDialog";
import { useState } from "react";

export default function AdminMenu() {
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleDelete = (item) => {
    setSelectedItem(item);
    setDeleteOpen(true);
  }
  
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
  
  return (
    <>
      <div className="flex justify-end items-center border-b-1 border-nord-4 p-2">
        <Button className="text-sm ftext-white bg-nord-10 hover:bg-nord-9"><Plus/></Button>
      </div>
      <div className="container mx-auto my-10 grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-6 gap-1">
        {menuItems
          .map((menuItem, index) => (
            <AdminMenuItemCard key={index} menuItem={menuItem} onDeleteClick={handleDelete}/>
          ))}
      </div>
      <MenuItemDeleteDialog menuItem={selectedItem} refetch={refetch} open={deleteOpen} setOpen={setDeleteOpen}/>
    </>
  );
}
