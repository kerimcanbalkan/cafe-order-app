import OrderCard from "@/components/OrderCard";
import { useQueries } from "@tanstack/react-query";
import Loading from "@/components/Loading";
import { getOrders } from "@/api/order";
import { getTables } from "@/api/table";
import { Button } from "@/components/ui/button";

export default function AdminOrders() {
  const token = localStorage.getItem("authToken");
  
  const results = useQueries({
    queries: [
      {
        queryKey: ["order"],
        queryFn: () => getOrders({ token }),
      },
      {
        queryKey: ["tables"],
        queryFn: () => getTables({ token }),
      },
    ],
  });

  const [orderQuery, tablesQuery] = results;

  const orders = orderQuery.data;
  const tables = tablesQuery.data;

  const enrichedOrders = orders?.data.map(o => {
    const table = tables?.data.find(t => t.id === o.tableId);
    return {
    ...o,
      tableName: table?.name || "Unknown Table",
    };
  });

  

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
  
  return (
    <div className="container mx-auto my-5 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2">
      {enrichedOrders.map((order) => (
        <OrderCard order={order} key={order.id}/>
      ))}
    </div>
  );
}
