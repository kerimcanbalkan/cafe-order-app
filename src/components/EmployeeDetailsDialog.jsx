import { Dialog, DialogContent, DialogFooter, DialogTitle} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import EmployeeDeleteDialog from "@/components/EmployeeDeleteDialog";

/**
 * Displays employee details and allows to delete the employee data.
 * @param {Object} props - The component props.
 * @param {boolean} props.open - Controls whether the dialog is open.
 * @param {function(boolean):void} props.setOpen - Function to toggle the dialog open state.
 * @param {Object} props.user - The product details.
 * @param {string} props.user.id - The id of the user.
 * @param {string} props.user.name - The name of the user.
 * @param {string} props.user.surname - The surname of the user.
 * @param {string} props.user.gender - The gender of the user.
 * @param {number} props.user.email - The email of the user.
 * @param {string} props.user.username - The username of the user
 * @param {string} props.user.role - The role (admin, cashier or waiter) of the user.
 * @param {string} props.user.createdAt - The users creation date.
 */
export default function EmployeeDetailsDialog({ open, setOpen, user, refetch}) {
  const [deleteOpen, setDeleteOpen] = useState(false);
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="p-4">
        <DialogTitle className="text-nord-10">Employee Details</DialogTitle>
        <div className="flex flex-col gap-1">
          <p><span className="font-bold">ID: </span>{user.id}</p>
          <p><span className="font-bold">Name: </span>{user.name}</p>
          <p><span className="font-bold">Surname: </span>{user.surname}</p>
          <p><span className="font-bold">Gender: </span>{capitalize(user.gender)}</p>
          <p><span className="font-bold">Email: </span>{user.email}</p>
          <p><span className="font-bold">Username: </span>{user.username}</p>
          <p><span className="font-bold">Role: </span>{capitalize(user.role)}</p>
          <p><span className="font-bold">Started At: </span>{new Date(user.createdAt).toLocaleString("en-GB")}</p>
        </div>
        <DialogFooter>
          <Button className="text-white bg-nord-14 hover:bg-nord-14">Check Statistics</Button>
          <Button className="text-white bg-nord-11 hover:bg-nord-11" onClick={() => {
            setDeleteOpen(true);
            setOpen(false);
          }}>Delete Employee</Button>
        </DialogFooter>
      </DialogContent>
      <EmployeeDeleteDialog open={deleteOpen} setOpen={setDeleteOpen} user={user} refetch={refetch}/>
    </Dialog>
  )
}

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
