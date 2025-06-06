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

/**
 * Displays alert dialog for confirming the deletion of item
 * @param {Object} props - The component props
 * @param {boolean} props.open - Controls whether the dialog is open
 * @param {function(boolean): void} props.setOpen - Function to toggler the dialog open state.
 * @param {Object} props.menuItem - The menuItem that is being deleted.
 * @param {string} props.menuItem.name - The menuItem name.
 * @param {string} props.menuItem.description - The menuItem description.
 * @param {string} props.menuItem.category - The menuItem caregory.
 * @param {number} props.menuItem.price - The menuItem price.
 * @param {string} props.menuItem.image - The menuItem image url .
 * @param {function(): void} props.refetch - Function taken from the mutation to refetch the data from the parent
 */
export default function MenuItemDeleteDialog({open, setOpen, menuItem, refetch}) {
  const showAlert = useAlert();
  
  const mutation = useMutation({
    mutationFn: (id) => {
      return deleteMenuItem(id);
    },
    onError: (error) => {
      console.error("Error deleting item:", error);
      const message = error?.response?.data?.error || "Something went wrong while deleting menu item. Please try again.";      
      showAlert("error", "Error!", message);
    },
    onSuccess: () => {
      refetch();
      showAlert("success", "Success!", "Item deleted succesfully");
    },
  });

  const handleDeleteClick = () => {
    mutation.mutate(menuItem.id);
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
