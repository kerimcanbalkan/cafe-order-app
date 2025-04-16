 import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button";
import Loading from "@/components/Loading";
import { getTables } from "@/api/table";
import { useQuery } from "@tanstack/react-query";
 import { Trash, ExternalLink, CirclePlus } from "lucide-react";

export default function AdminTables() {
  
  const orderBaseUrl = `${window.location.origin}/order`;


  const token = localStorage.getItem("authToken");
  
  const {
    data: tables,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["table"],
    queryFn: () => getTables({ token }),
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
          <h3 className="text-nord-11 text-lg">Could not get the Data</h3>
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

  const allTables = tables?.data || [];
  
  return (
      <Table className="text-nord-0">
      <TableCaption>Tables</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead>Link</TableHead>
          <TableHead><CirclePlus size={20} className="text-nord-0"/></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {allTables.map((table) => (
          <TableRow key={table.id}>
            <TableCell>{table.name}</TableCell>
            <TableCell>{new Date(table.createdAt).toLocaleDateString("en-GB")}</TableCell>
            <TableCell><a className="text-nord-10"href={`${orderBaseUrl}/${table.id}`}><ExternalLink/></a></TableCell>
            <TableCell><Trash className="text-nord-11" size={20}/></TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
