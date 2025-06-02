import {
  Card,
  CardContent,
  CardTitle,
} from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { getActiveOrder } from "@/api/order";
import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";


/**
 * Renders a clickable tabel card that shows order status of the table
 * @param {Object} props - The component props.
 * @param {Object} props.table - table object with table details
 * @param {string} props.table.id - The table ID.
  * @param {string} props.table.name - The table name.
 */
export default function TableCard({ table, setDetailsOpen, setOrder, setOrderRefetch }){
  const {
    data: order,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["order", table.id],
    queryFn: () => getActiveOrder(table.id),
  })

  const orders = order?.data || [];

  const handleClick = () => {
    if (orders?.items?.length !== 0){
      orders.tableName = table.name
      setOrder(orders)
      setDetailsOpen(true);
      setOrderRefetch(() => refetch);
    }
  }

  if (isLoading)
    return (
      <Card className="cursor-pointer">
        <CardContent className="flex items-center justify-center p-4 h-30">
          <CardTitle className="text-nord-0">
            <Loading />
          </CardTitle>
        </CardContent>
      </Card>
    );
  
  if (error)
    return (
      <Card className="cursor-pointer">
        <CardContent className="flex flex-col items-center justify-center p-4 h-30 gap-3">
          <Button
            className="bg-0 border-1 border-nord-11 hover:bg-nord-1 text-nord-11 text-xs rounded-lg active:scale-95 hover:bg-nord-11 hover:text-white transition"
            onClick={() => {
              refetch();
            }}
          >
             Retry
          </Button>
        </CardContent>
      </Card>
    );
  
  return (
    <Card className={`cursor-pointer ${orders?.items?.length === 0 ? "" : "shadow-nord-11"}`} onClick={handleClick}>
      <CardContent className="flex items-center justify-center p-4 min-h-30">
        <CardTitle className="text-nord-0">
          {table.name}
        </CardTitle>
      </CardContent>
    </Card>
  )
}
