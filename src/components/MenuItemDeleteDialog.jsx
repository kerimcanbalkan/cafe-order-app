import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useMutation } from "@tanstack/react-query";
import { deleteMenuItem } from "@/api/menu";
import Loading from "@/components/Loading";
import { useAlert } from "@/components/AlertProvider";

export default function MenuItemDeleteDialog({open, setOpen, menuItem, refetch}) {
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
          <AlertDialogTitle>Are you sure you want to delete <span className="text-nord-11">{menuItem?.name}</span></AlertDialogTitle>
          <AlertDialogDescription>
           This action cannot be undone. This will permanently delete your menu item.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="text-white bg-nord-10 border-0 hover:bg-nord-10 hover:text-white">Cancel</AlertDialogCancel>
          <AlertDialogAction className="text-white bg-nord-11 hover:bg-nord-11" onClick={handleDeleteClick}>
                  {mutation.isPending ? <Loading/> : 'Delete'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
