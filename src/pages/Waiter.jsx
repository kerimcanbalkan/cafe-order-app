import OrderCard from "@/components/OrderCard";
import { useQueries } from "@tanstack/react-query";
import Loading from "@/components/Loading";
import { getOrdersWaiter } from "@/api/order";
import { getTables } from "@/api/table";
import { Button } from "@/components/ui/button";
import OrderDetailsDialog from "../components/OrderDetailsDialog";
import { useState } from "react";

export default function Waiter() {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  
  const results = useQueries({
    queries: [
      {
        queryKey: ["order"],
        queryFn: () => getOrdersWaiter(),
      },
      {
        queryKey: ["tables"],
        queryFn: () => getTables(),
      },
    ],
  });

  const [orderQuery, tablesQuery] = results;

  const orders = orderQuery.data;
  const tables = tablesQuery.data;

  // Create a combined refetch function
  const refetch = () => {
    orderQuery.refetch();
    tablesQuery.refetch();
  };

  const enrichedOrders = Array.isArray(orders?.data)
    ? orders.data.map(o => {
      const table = tables?.data.find(t => t.id === o.tableId);
      return {
        ...o,
        tableName: table?.name || "Unknown Table",
      };
    })
    : [];


  const isLoading = orderQuery.isLoading || tablesQuery.isLoading;
  const error = orderQuery.error || tablesQuery.error;

    if (isLoading)
    return (
      <div>
        <Loading />
      </div>
    );
  if (error)
    return (
      <div className="container mx-auto h-svh">
        <div className="w-full h-full flex flex-col gap-4 items-center justify-center">
          <h3 className="text-nord-11 text-lg">Could not load the Orders!</h3>
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

  if (!isLoading && !error && (!orders?.data || orders?.data.length === 0)) {
    return (
      <div className="container mx-auto h-svh">
        <div className="w-full h-full flex flex-col gap-4 items-center justify-center">
          <h3 className="text-nord-11 text-lg">No recent orders at the moment.</h3>
          <Button
            className="bg-nord-14 hover:bg-nord-14 text-white rounded-lg active:scale-95 transition"
            onClick={refetch}
          >
             Refresh
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto my-5 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2">
      {enrichedOrders.map((order) => (
        <OrderCard order={order} key={order.id} setOpenDetails={setDetailsOpen} setSelectedOrder={setSelectedOrder}/>
      ))}
      {selectedOrder && <OrderDetailsDialog order={selectedOrder} open={detailsOpen} setOpen={setDetailsOpen} refetch={refetch} variation="waiter"/>}
    </div>
  );
}
