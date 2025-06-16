import OrderCard from "@/components/OrderCard";
import { useQuery } from "@tanstack/react-query";
import Loading from "@/components/Loading";
import { getOrders } from "@/api/order";
import { getTables } from "@/api/table";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const LIMIT = 8;

export default function AdminOrders() {
  const [page, setPage] = useState(1);

  const {
    data: orders,
    isLoading: ordersLoading,
    isError: ordersError,
    refetch: refetchOrders,
  } = useQuery({
    queryKey: ["orders", page],
    queryFn: () => getOrders(page, LIMIT),
    keepPreviousData: true,
  });

  const {
    data: tables,
    isLoading: tablesLoading,
    isError: tablesError,
    refetch: refetchTables,
  } = useQuery({
    queryKey: ["tables"],
    queryFn: getTables,
  });

  const isLoading = ordersLoading || tablesLoading;
  const isError = ordersError || tablesError;

  const totalPages = orders?.meta?.totalPages || 1;

  const enrichedOrders = Array.isArray(orders?.data)
    ? orders.data.map((o) => {
        const table = tables?.data?.find((t) => t.id === o.tableId);
        return {
          ...o,
          tableName: table?.name || "Unknown Table",
        };
      })
    : [];

  if (!isLoading && !isError && enrichedOrders.length === 0) {
    return (
      <div className="container mx-auto h-svh">
        <div className="w-full h-full flex flex-col gap-4 items-center justify-center">
          <h3 className="text-nord-11 text-lg">No recent orders at the moment.</h3>
          <Button
            className="bg-nord-14 hover:bg-nord-14 text-white rounded-lg active:scale-95 transition"
            onClick={() => {
              refetchOrders();
              refetchTables();
            }}
          >
            Refresh
          </Button>
        </div>
      </div>
    );
  }

  if (isLoading) return <Loading />;
  if (isError)
    return (
      <div className="container mx-auto h-svh">
        <div className="w-full h-full flex flex-col gap-4 items-center justify-center">
          <h3 className="text-nord-11 text-lg">Could not load the Orders!</h3>
          <Button
            className="bg-nord-11 hover:bg-nord-1 text-white rounded-lg active:scale-95 transition"
            onClick={() => {
              refetchOrders();
              refetchTables();
            }}
          >
            Retry
          </Button>
        </div>
      </div>
    );

  return (
    <div className="container mx-auto my-5">
      <div className="my-4 flex justify-center">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                className="text-nord-12 cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  setPage((p) => Math.max(1, p - 1));
                }}
              />
            </PaginationItem>

            {Array.from({ length: totalPages }).map((_, i) => {
              const pageNum = i + 1;
              return (
                <PaginationItem key={pageNum}>
                  <PaginationLink
                    isActive={page === pageNum}
                    className="cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      setPage(pageNum);
                    }}
                  >
                    {pageNum}
                  </PaginationLink>
                </PaginationItem>
              );
            })}

            {totalPages > 5 && <PaginationEllipsis />}

            <PaginationItem>
              <PaginationNext
                className="text-nord-10 cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  setPage((p) => Math.min(totalPages, p + 1));
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2">
        {enrichedOrders.map((order) => (
          <OrderCard order={order} key={order.id} />
        ))}
      </div>
    </div>
  );
}
