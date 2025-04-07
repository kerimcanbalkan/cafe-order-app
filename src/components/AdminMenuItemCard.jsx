import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Trash, Pencil } from "lucide-react";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { deleteMenuItem } from "@/api/menu";
import Loading from "@/components/Loading";
import { useAlert } from "@/components/AlertProvider";

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
export default function AdminMenuItemCard({ menuItem, refetch }) {
  const [open, setOpen] = useState(false);
  
  return (
    <>
      <Card
        className="rounded-lg overflow-hidden shadow-sm hover:shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1"
      >
        <CardContent className="p-4 flex flex-col ">
          <img
            src={`${import.meta.env.VITE_API_IMAGE_URL}/${menuItem.image}`}
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
              <Pencil className="text-nord-14 cursor-pointer transition-transform duration-200 ease-in-out active:scale-50 focus:scale-100"size={15}/>
              <Trash className="text-nord-11 cursor-pointer transition-transform duration-200 ease-in-out active:scale-50 focus:scale-100"size={15} onClick={() => {
                setOpen(true);
              }}/>
          </div>
          </div>
        </CardContent>
      </Card>
      <DeleteModal open={open} setOpen={setOpen} menuItem={menuItem} refetch={refetch}/>
    </>
  );
}


const DeleteModal = ({open, setOpen, menuItem, refetch}) => {
  const showAlert = useAlert();
  const token = localStorage.getItem("authToken");
  
  const mutation = useMutation({
    mutationFn: ({token, id}) => {
      return deleteMenuItem({token, id});
    },
    onError: (error) => {
      console.error("Error deleting item:", error);
      showAlert("error", "Error!", "Could delete the item");
    },
    onSuccess: () => {
      refetch();
      showAlert("success", "Success!", "Item deleted succesfully");
    },
  });

  const handleDeleteClick = () => {
    mutation.mutate({token: token, id: menuItem.id});
    console.log("Deleting "+ menuItem.name + " "+ menuItem.id);
  }
  
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to delete <span className="text-nord-11">{menuItem.name}</span></AlertDialogTitle>
          <AlertDialogDescription>
           This action cannot be undone. This will permanently delete your menu item.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="text-white bg-nord-14 border-0 hover:bg-nord-14 hover:text-white">Cancel</AlertDialogCancel>
          <AlertDialogAction className="text-white bg-nord-11 hover:bg-nord-11" onClick={handleDeleteClick}>
                  {mutation.isPending ? <Loading/> : 'Delete'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
