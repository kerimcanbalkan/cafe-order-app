import Loading from "@/components/Loading";
import { useAlert } from "@/components/AlertProvider";
import { useMutation } from "@tanstack/react-query";
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
import { closeOrder } from "@/api/order";

/**
 * Displays alert dialog for confirming the serving of order
 * @param {Object} props - The component props
 * @param {string} props.id - Order id to be served
 * @param {string} props.table - Table name to be displayed to the user
 * @param {function(): void} props.refetch - Function taken from the mutation to refetch the data from the parent
 */
export default function OrderCloseDialog({open, setOpen, tableName, tableId, refetch}){
  const showAlert = useAlert();
  
  const mutation = useMutation({
    mutationFn: (id) => {
      return closeOrder(id);
    },
    onError: (error) => {
      console.error("Error closing order", error);
      
      const message = error?.response?.data?.error || "Could not close the order";
      showAlert("error", "Error!", message);
    },
    onSuccess: () => {
      refetch();
      showAlert("success", "Success!", "Order closed succesfully");
    },
  });

  const handleClick = () => {
    mutation.mutate(tableId);
  }
  
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to close order of <span className="text-nord-11">{tableName}</span></AlertDialogTitle>
          <AlertDialogDescription>
                                    This action cannot be undone. Make sure payment is recieved
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="text-white bg-nord-10 border-0 hover:bg-nord-10 hover:text-white">No</AlertDialogCancel>
          <AlertDialogAction className="text-white bg-nord-14 hover:bg-nord-14" onClick={handleClick}>
            {mutation.isPending ? <Loading/> : 'Yes'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
