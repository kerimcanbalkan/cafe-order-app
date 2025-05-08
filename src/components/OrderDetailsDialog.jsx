import { Dialog, DialogContent, DialogFooter, DialogTitle} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import OrderServeDialog from "@/components/OrderServeDialog";

export default function OrderDetailsDialog({order, open, setOpen, refetch}){
  const [alertOpen, setAlertOpen] = useState(false);
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="p-4 min-h-100">
        <DialogTitle className="text-nord-10">{order.table}</DialogTitle>

        {/* Scrollable list of items */}
        <div className="flex-1 overflow-y-auto pr-1 mb-2">
          {order.items.map((item) => (
            <div key={item.menuItem.id} className="flex justify-between mb-2">
              <p className="text-nord-1">{item.menuItem.name} <span className="text-nord-11 text-lg">x{item.quantity}</span></p>
              <p className="font-bold text-nord-1">{`${item.menuItem.price * item.quantity}$`}</p>
            </div>
          ))}
        </div>

        {/* Total Price */}
        <div className="border-t border-nord-4 pt-2 text-nord-10">
          <p className="text-md flex justify-between">
            <span>Total Price</span>
            <span className="font-bold">{order.totalPrice}$</span>
          </p>
        </div>
        
        <DialogFooter>
          <Button className="text-white bg-nord-11 hover:bg-nord-11"onClick={() => {
            setOpen(false);
          }}>Cancel</Button>
          <Button className="text-white bg-nord-14 hover:bg-nord-14" onClick={() => {
            setAlertOpen(true);
            setOpen(false);
          }}>Serve</Button>
        </DialogFooter>
      </DialogContent>
      <OrderServeDialog open={alertOpen} setOpen={setAlertOpen} refetch={refetch} id={order.id} table={order.tableName}/>
    </Dialog>
  );
}
