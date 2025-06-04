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
import { deleteUser } from "@/api/user";
import Loading from "@/components/Loading";
import { useAlert } from "@/components/AlertProvider";

/**
 * Displays alert dialog for confirming the deletion of user
 * @param {Object} props - The component props
 * @param {boolean} props.open - Controls whether the dialog is open
 * @param {function(boolean): void} props.setOpen - Function to toggler the dialog open state.
 * @param {Object} props.user - The product details.
 * @param {string} props.user.id - The id of the user.
 * @param {string} props.user.name - The name of the user.
 * @param {string} props.user.surname - The surname of the user.
 * @param {string} props.user.gender - The gender of the user.
 * @param {number} props.user.email - The email of the user.
 * @param {string} props.user.username - The username of the user
 * @param {string} props.user.role - The role (admin, cashier or waiter) of the user.
 * @param {string} props.user.createdAt - The users creation date.
 * @param {function(): void} props.refetch - Function taken from the mutation to refetch the data from the parent
 */
export default function EmployeeDeleteDialog({open, setOpen, user, refetch}) {
  const showAlert = useAlert();
  const mutation = useMutation({
    mutationFn: (id) => {
      return deleteUser(id);
    },
    onError: (error) => {
      console.error("Error deleting user:", error.message);
      const message = error?.response?.data?.error || "Something went wrong while deleting employee. Please try again.";      
      showAlert("error", "Error!", message);
    },
    onSuccess: () => {
      refetch();
      showAlert("success", "Success!", "User deleted succesfully");
    },
  });

  const handleDeleteClick = () => {
    mutation.mutate(user.id);
    console.log("Deleting "+ user.name + " "+ user.id);
  }
  
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to delete <span className="text-nord-11">{user?.name}</span></AlertDialogTitle>
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
