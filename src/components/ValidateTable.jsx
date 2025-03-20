import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getTableByID } from "@/api/table";
import Loading from "@/components/Loading";
import NotFound from "@/pages/NotFound";

export default function ValidateTable({ children }) {
  const { tableID } = useParams();

  const { data: table, isLoading, isError } = useQuery({
    queryKey: ["table", tableID],
    queryFn: () => getTableByID(tableID),
    retry: false,
  });

  if (isLoading) {
    return <Loading />;
  }

  if (isError || !table) {
    return <NotFound/>;
  }

  return children;
}
