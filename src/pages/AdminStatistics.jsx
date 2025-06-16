import OrderChart from "@/components/OrderChart";
import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { getOrderStatistics } from "@/api/statistics";
import Loading from "@/components/Loading";


export default function AdminStatistics(){
  const { start: initialStart, end: initialEnd } = getWeekRange();
  const [selectedRange, setSelectedRange] = useState("last7Days");
  const [start, setStart] = useState(initialStart);
  const [end, setEnd] = useState(initialEnd);
  const [group, setGroup] = useState("day");


  useEffect(() => {
    let range;

    switch (selectedRange) {
    case "last7Days":
      range = getWeekRange();
      setGroup("day");
      break;
    case "thisMonth":
      range = getMonthRange();
      setGroup("week");
      break;
    case "thisYear":
      range = getYearRange();
      setGroup("month");
      break;
    default:
      range = null;
      setStart(null);
      setEnd(null);
      break;
    }

    if (range) {
      setStart(range.start);
      setEnd(range.end);
      refetch();
    }
  }, [selectedRange]);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["data", start, end, group],
    queryFn: () => getOrderStatistics({ from: start, to: end, groupBy: group }),
    enabled: Boolean(start && end),
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
          <h3 className="text-nord-11 text-lg">Could not load the statistics!</h3>
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
    <div className="max-w-300 mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-md font-semibold text-nord-0">View Order Statistics</h2>
        <Select defaultValue={selectedRange} onValueChange={setSelectedRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Today" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="last7Days">Last 7 Days</SelectItem>
            <SelectItem value="thisMonth">This Month</SelectItem>
            <SelectItem value="thisYear">This Year</SelectItem>
          </SelectContent>
        </Select>
      </div>
       <div>
         <h1 className="text-nord-0 font-bold"> <span className="text-nord-10">Average Order Value</span>: {data?.data?.averageOrderValue}$</h1>
         <h1 className="text-nord-0 font-bold"> <span className="text-nord-10">Total Order Amount</span>: {data?.data?.totalOrders}$</h1>
         <h1 className="text-nord-0 font-bold mb-4"> <span className="text-nord-10">Total Revenue</span>: {data?.data?.totalRevenue}$</h1>
       </div>
      <div className="my-5 grid grid-cols-1 lg:grid-cols-3 gap-2">
        <OrderChart data={data?.data.aggregatedStats ?? []} dataKey="totalOrders" label="Amount of orders" color="#bf616a"/>
        <OrderChart data={data?.data.aggregatedStats ?? []} dataKey="totalRevenue" label="Total Revenue" color="#88c0d0"/>
      </div>
    </div>
  );
}
const formatDate = (date) => date.toISOString().split('T')[0];

const getWeekRange = () => {
  const today = new Date();

  // Get Sunday as start of the week
  const firstDay = new Date(today);
  firstDay.setDate(today.getDate() - 7);

  const lastDay = new Date(today);

  return {
    start: formatDate(firstDay),
    end: formatDate(lastDay),
  };
};

const getYearRange = () => {
  const today = new Date();

  // First day of the current year: January 1st
  const firstDay = new Date(today.getFullYear(), 0, 1);

  // Last day of the current year: December 31st
  const lastDay = new Date(today.getFullYear(), 11, 31);

  return {
    start: formatDate(firstDay),
    end: formatDate(lastDay),
  };
}

const getMonthRange = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  // First day of the current month (day = 1)
  const firstDay = new Date(year, month, 1);

  // Last day of the current month: 
  // Create a date of the 1st day of the next month, then subtract 1 day
  const lastDay = new Date(year, month + 1, 0);

  return {
    start: formatDate(firstDay),
    end: formatDate(lastDay),
  };
}
