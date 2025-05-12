import {
  Table,
  TableBody,
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
import { deleteTableById } from "@/api/table";
import {useAlert} from "@/components/AlertProvider";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import TableAddDialog from "../components/TableAddDialog";
 

export default function AdminTables() {
  const [open, setOpen] = useState(false);
  const showAlert = useAlert();
  const orderBaseUrl = `${window.location.origin}/order`;
  
  const {
    data: tables,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["table"],
    queryFn: getTables,
  });

  const deleteMutation = useMutation({
    mutationFn: (tableID) => {
      return deleteTableById(tableID);
    },
    onError: (error) => {
      console.error("Error deleting table", error);
      showAlert("error", "Error!", "Could not delete table!");
    },
    onSuccess: () => {
      showAlert("success", "Success!", "Table deleted successfully");
      refetch();
    }
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
  const sortedTables = allTables.sort((a, b) => a.name.localeCompare(b.name));


  
  return (
    <>
      <Table className="text-nord-0">
      <TableHeader>
        <TableRow>
          <TableHead className="text-lg">Name</TableHead>
          <TableHead className="text-lg">Created At</TableHead>
          <TableHead className="text-lg">Link</TableHead>
          <TableHead><CirclePlus size={25} className="text-nord-15 cursor-pointer" onClick={() => {setOpen(true)}}/></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sortedTables.map((table) => (
          <TableRow key={table.id}>
            <TableCell>{table.name}</TableCell>
            <TableCell>{new Date(table.createdAt).toLocaleDateString("en-GB")}</TableCell>
            <TableCell><a className="text-nord-10"href={`${orderBaseUrl}/${table.id}`}><ExternalLink/></a></TableCell>
            <TableCell>
                {deleteMutation.isPending ? <Loading/> : <Trash size={20} className="text-nord-11 cursor-pointer" disabled={deleteMutation.isLoading} onClick={() => deleteMutation.mutate(table.id)}/> }                
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      </Table>
      <TableAddDialog open={open} setOpen={setOpen} refetch={refetch}/>
    </>
  );
}
