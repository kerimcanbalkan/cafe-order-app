import TableCard from "@/components/TableCard";
import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { getTables } from "@/api/table";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import OrderDetailsDialog from "../components/OrderDetailsDialog";

export default function Cashier() {

  const [detailsOpen, setDetailsOpen] = useState(false);
  const [order, setOrder]  = useState(null);
  
  const {
    data: table,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["table"],
    queryFn: getTables,
  });

  if (isLoading)
    return (
      <div>
        <Loading />
      </div>
    );
  
  if (error)
    return (
      <div className="container mx-auto h-svh">
        <div className="w-full h-full flex flex-col gap-3 items-center justify-center">
          <h3 className="text-nord-11 text-lg">Could not load the tables!</h3>
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

  const tables = table?.data || [];

  // Sort alphabetically
  tables.sort((a, b) => a.name.localeCompare(b.name));
  
  return (
    <div className="mx-auto mt-10">
      <div className="container mx-auto my-5 grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-6 gap-2">
        {tables.map((table, index) => (
          <TableCard key={index} table={table} setOrder={setOrder} setDetailsOpen={setDetailsOpen}/>
        ))}
      </div>
      {order && (
        <OrderDetailsDialog
          order={order}
          open={detailsOpen}
          setOpen={setDetailsOpen}
          refetch={refetch}
          variation="cashier"
        />
      )}
    </div>
  );
}
