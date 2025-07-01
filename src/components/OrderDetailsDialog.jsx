import { Dialog, DialogContent, DialogFooter, DialogTitle} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import OrderServeDialog from "@/components/OrderServeDialog";
import OrderCloseDialog from "./OrderCloseDialog";

/**
 * @typedef {Object} MenuItem
 * @property {string} id - Unique identifier of the menu item.
 * @property {string} name - Name of the menu item.
 * @property {string} description - Description of the menu item.
 * @property {number} price - Price of the menu item.
 * @property {string} category - Category to which the menu item belongs.
 * @property {string} image - Image ID or URL for the menu item.
 */

/**
 * @typedef {Object} OrderItem
 * @property {MenuItem} menuItem - The menu item ordered.
 * @property {number} quantity - The quantity of the menu item ordered.
 */

/**
 * @typedef {Object} Order
 * @property {string} id - Unique identifier for the order.
 * @property {OrderItem[]} items - List of items in the order.
 * @property {number} totalPrice - Total price of the order.
 * @property {string} tableId - Identifier of the table where the order was placed.
 * @property {string} createdAt - ISO string of when the order was created.
 * @property {string} servedAt - ISO string of when the order was served.
 * @property {string} closedAt - ISO string of when the order was closed.
 * @property {string} handledBy - ID of the user (e.g. waiter) who handled the order.
 * @property {string} closedBy - ID of the user (e.g. cashier) who closed the order.
 */

/**
 * Order Details Dialog displays order details for the waiters.
 *
 * @param {Object} props - The component props
 * @param {order} props.order - The order object
 * @param {boolean} props.open - The dialog open state
 * @param {function(boolean):void} props.setOpen - Open state set function
 * @param {function():void} props.refetch - Refetch function of the parent component
 * @param {string} props.variation - variation of the dialog should be one of waiter or cashier
 */
export default function OrderDetailsDialog({order, open, setOpen, refetch, variation}){
  const [alertOpen, setAlertOpen] = useState(false);
  const currency = order?.items[0]?.menuItem?.currency || "";
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="p-4 min-h-100">
        <DialogTitle className="text-nord-10">{order.tableName}</DialogTitle>

        {/* Scrollable list of items */}
        <div className="flex-1 overflow-y-auto pr-1 mb-2">
          {order?.items?.map((item) => (
            <div key={item.menuItem.id} className="flex justify-between mb-2">
              <p className="text-nord-1">{item.menuItem.name} <span className="text-nord-11 text-lg">x{item.quantity}</span></p>
              <p className="font-bold text-nord-1">{formatPriceIntl((item.menuItem.price * item.quantity)/100, currency)}</p>
            </div>
          ))}
        </div>

        {/* Total Price */}
        <div className="border-t border-nord-4 pt-2 text-nord-10">
          <p className="text-md flex justify-between">
            <span>Total Price</span>
            <span className="font-bold">{formatPriceIntl(order.totalPrice / 100, currency)}</span>
          </p>
        </div>
        
        <DialogFooter>
          <Button className="text-white bg-nord-11 hover:bg-nord-11"onClick={() => {
            setOpen(false);
          }}>Cancel</Button>
          <Button className="text-white bg-nord-14 hover:bg-nord-14" onClick={() => {
            setAlertOpen(true);
            setOpen(false);
          }}>{variation === "cashier" ? "Close" : "Serve"}</Button>
        </DialogFooter>
      </DialogContent>
      
      {
        variation === "waiter" ? (
          <OrderServeDialog
            open={alertOpen}
            setOpen={setAlertOpen}
            refetch={refetch}
            id={order.id}
            table={order.tableName}
          />
        ) : (
          <OrderCloseDialog
            open={alertOpen}
            setOpen={setAlertOpen}
            refetch={refetch}
            tableName={order.tableName}
            tableId={order.tableId}
          />
        )
      }
    </Dialog>
  );
}

function formatPriceIntl(amount, currencyCode, locale = 'en-US') {
  if (!currencyCode) return amount.toFixed(2); // fallback if currency missing
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currencyCode
  }).format(amount);
}
