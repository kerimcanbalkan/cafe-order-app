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
 * Order Card components that displays the order details
 *
 * @param {{ order: Order }} props - The component props.
 */
export default function OrderCard({ order, setOpenDetails, setSelectedOrder, className }) {
  const [date, hour] = new Date(order.createdAt)
  .toLocaleString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
    .split(", ");

  const currency = order?.items[0]?.menuItem?.currency || "";
  
  return (
    <div className={`flex flex-col cursor-pointer text-sm shadow-sm ${order.closedAt && order.servedAt ? "shadow-nord-10" : "shadow-nord-12" } p-2 w-full overflow-hidden rounded-md text-nord-0 ${className}`} onClick={() => {
      if (setOpenDetails && setSelectedOrder) {
        setOpenDetails(true);
        setSelectedOrder(order);        
      }
    }}>
      <h1 className="text-base font-semibold mb-2 text-nord-10">{order.tableName}</h1>

      {/* Scrollable list of items */}
      <div className="flex-1 overflow-y-auto pr-1 mb-2">
        {order.items.map((item) => (
          <div key={item.menuItem.id} className="flex justify-between mb-2">
            <p className="text-nord-1">{`${item.menuItem.name} x${item.quantity}`}</p>
            <p className="font-bold text-nord-1">{formatPriceIntl((item?.menuItem.price / 100) * item.quantity, currency)}</p>
          </div>
        ))}
      </div>

      {/* Total Price */}
      <div className="border-t border-nord-4 pt-2 mb-1 text-nord-10">
        <p className="text-md flex justify-between">
          <span>Total Price</span>
          <span className="font-bold">{formatPriceIntl(order.totalPrice / 100, currency)}</span>
        </p>
      </div>

      {/* Status + Time pinned to bottom */}
      <div className="flex justify-between gap-1 text-xs mt-auto">
        <div className="flex gap-1">
          <p className={`${order.closedAt ? "text-nord-14" : "text-nord-12"}`}>
            {order.closedAt ? "Closed" : "Open"}
          </p>
          <p className={`${order.servedAt ? "text-nord-14" : "text-nord-12"}`}>
            {order.servedAt ? "Served" : "Pending"}
          </p>
        </div>
          <p>{date}</p>
      </div>
    </div>
  );
}

function formatPriceIntl(amount, currencyCode, locale = 'en-US') {
  if (!currencyCode) return amount.toFixed(2); // fallback if currency missing
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currencyCode
  }).format(amount);
}
