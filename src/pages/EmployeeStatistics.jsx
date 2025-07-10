import { useQueries } from "@tanstack/react-query";
import { getEmployeeStatistics } from "@/api/statistics";
import { getUser } from "@/api/user";
import Loading from "@/components/Loading";
import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import WaiterStats from "@/components/WaiterStats";
import CashierStats from "@/components/CashierStats";
import { useNavigate, useParams } from "react-router-dom";


export default function EmployeeStatistics() {
  const { start: initialStart, end: initialEnd } = getWeekRange();
  const [selectedRange, setSelectedRange] = useState("last7Days");
  const [start, setStart] = useState(initialStart);
  const [end, setEnd] = useState(initialEnd);
  const [group, setGroup] = useState("day");
  const {employeeID} = useParams();
  const navigate = useNavigate();

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


  const results = useQueries({
    queries: [
      {
        queryKey: ["data"],
        queryFn: () => getEmployeeStatistics({id: employeeID, from: start, to: end, groupBy: group }),
        enabled: Boolean(start && end),
      },
      {
        queryKey: ["usr"],
        queryFn: () => getUser({id: employeeID}),
      }
    ]
  });
  const isLoading = results.some(q => q.isLoading);
  const isError = results.some(q => q.isError);
  const firstError = results.find(q => q.isError)?.error;

  const [statisticsQuery, userQuery] = results;
  const user = userQuery.data?.data;
  const statistics = statisticsQuery.data?.data;

 // Create a combined refetch function
  const refetch = () => {
    statisticsQuery.refetch();
    userQuery.refetch();
  };
  
  if (isLoading)
    return (
      <div>
        <Loading />
      </div>
  );

  if (isError)
    return (
      <div className="container mx-auto h-svh">
        <div className="w-full h-full flex flex-col gap-3 items-center justify-center">
          <h3 className="text-nord-11 text-lg">Could not load the statistics!</h3>
          <h4>{firstError.Message}</h4>
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


  const date = new Date(user?.createdAt);

  return (
    <div className="mt-5">
      <div className="w-full flex justify-end">
        <div className="flex font-semibold cursor-pointer" onClick={() => navigate("/admin/employees")}>
          <ArrowLeft className="text-nord-10"/>
          <p className="text-nord-10">Go Back</p>
        </div>
      </div>
      <h1 className="text-xl text-nord-10 font-bold border-b border-nord-10">Profile</h1>
      <div className="mt-2">
        <p><span className="font-bold">Name: </span>{user?.name}</p>
        <p><span className="font-bold">Surname: </span>{user?.surname}</p>
        <p><span className="font-bold">Email: </span>{user?.email}</p>
        <p><span className="font-bold">Role: </span>{user?.role.charAt(0).toUpperCase() + user?.role.slice(1)}</p>
        <p><span className="font-bold">Start Date: </span>{date.toLocaleDateString()}</p>
      </div>
      {user?.role != "admin" && (<div className="mt-5">
        <div className="flex justify-between items-center mb-4 border-b border-nord-10 py-2">
        <h1 className="text-xl text-nord-10 font-bold ">Statistics</h1>
        <Select defaultValue={selectedRange} onValueChange={setSelectedRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Last 7 Days" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="last7Days">Last 7 Days</SelectItem>
            <SelectItem value="thisMonth">This Month</SelectItem>
            <SelectItem value="thisYear">This Year</SelectItem>
          </SelectContent>
        </Select>
        </div>
      </div>)}
      
  {statistics && user?.role != "admin" && (
    user?.role === "waiter" ? (
     <WaiterStats data={statistics} />
    ) : (
     <CashierStats data={statistics} />
   )
  )}
     </div>
   )
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
  const firstDay = new Date(year, month, 2);

  // Last day of the current month: 
  // Create a date of the 1st day of the next month, then subtract 1 day
  const lastDay = new Date(year, month + 1, 0);

  return {
    start: formatDate(firstDay),
    end: formatDate(lastDay),
  };
}

function formatPriceIntl(amount, currencyCode, locale = 'en-US') {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currencyCode
  }).format(amount);
}
