import OrderChart from "@/components/OrderChart";
import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const mockChartToday = [
  { time: "8", totalOrders: 5, totalRevenue: 250, averageOrderValue: 50 },
  { time: "10", totalOrders: 8, totalRevenue: 400, averageOrderValue: 50 },
  { time: "12", totalOrders: 10, totalRevenue: 520, averageOrderValue: 52 },
  { time: "14", totalOrders: 7, totalRevenue: 350, averageOrderValue: 50 },
  { time: "16", totalOrders: 6, totalRevenue: 330, averageOrderValue: 55 },
  { time: "18", totalOrders: 9, totalRevenue: 495, averageOrderValue: 55 },
  { time: "20", totalOrders: 4, totalRevenue: 220, averageOrderValue: 55 },
];

const mockChartLast7Days = [
  { time: "Monday", totalOrders: 75, totalRevenue: 3750, averageOrderValue: 50 },
  { time: "Tuesday", totalOrders: 80, totalRevenue: 4000, averageOrderValue: 50 },
  { time: "Wednesday", totalOrders: 90, totalRevenue: 4950, averageOrderValue: 55 },
  { time: "Thursday", totalOrders: 85, totalRevenue: 4675, averageOrderValue: 55 },
  { time: "Friday", totalOrders: 100, totalRevenue: 5500, averageOrderValue: 55 },
  { time: "Saturday", totalOrders: 120, totalRevenue: 6600, averageOrderValue: 55 },
  { time: "Sunday", totalOrders: 95, totalRevenue: 5225, averageOrderValue: 55 },
];

const mockChartThisMonth = [
  { time: "1", totalOrders: 120, totalRevenue: 6000, averageOrderValue: 50 },
  { time: "2", totalOrders: 140, totalRevenue: 7700, averageOrderValue: 55 },
  { time: "3", totalOrders: 135, totalRevenue: 7425, averageOrderValue: 55 },
  { time: "4", totalOrders: 150, totalRevenue: 8250, averageOrderValue: 55 },
];

const mockChartLastMonth = [
  { time: "1", totalOrders: 110, totalRevenue: 5500, averageOrderValue: 50 },
  { time: "2", totalOrders: 125, totalRevenue: 6875, averageOrderValue: 55 },
  { time: "3", totalOrders: 130, totalRevenue: 7150, averageOrderValue: 55 },
  { time: "4", totalOrders: 120, totalRevenue: 6600, averageOrderValue: 55 },
];

const mockChartThisYear = [
  { time: "January", totalOrders: 120, totalRevenue: 6000, averageOrderValue: 50 },
  { time: "February", totalOrders: 98, totalRevenue: 4900, averageOrderValue: 50 },
  { time: "March", totalOrders: 130, totalRevenue: 7150, averageOrderValue: 55 },
  { time: "April", totalOrders: 110, totalRevenue: 5500, averageOrderValue: 50 },
  { time: "May", totalOrders: 145, totalRevenue: 7980, averageOrderValue: 55 },
  { time: "June", totalOrders: 160, totalRevenue: 8800, averageOrderValue: 55 },
  { time: "July", totalOrders: 170, totalRevenue: 9350, averageOrderValue: 55 },
  { time: "August", totalOrders: 150, totalRevenue: 8250, averageOrderValue: 55 },
  { time: "September", totalOrders: 140, totalRevenue: 7000, averageOrderValue: 50 },
  { time: "October", totalOrders: 155, totalRevenue: 7750, averageOrderValue: 50 },
  { time: "November", totalOrders: 125, totalRevenue: 6875, averageOrderValue: 55 },
  { time: "December", totalOrders: 180, totalRevenue: 9900, averageOrderValue: 55 },
];


export default function AdminStatistics(){
  const [selectedRange, setSelectedRange] = useState("today");
  const [data, setData] = useState(mockChartToday);

  useEffect(() => {
    switch (selectedRange) {
      case "today":
        setData(mockChartToday);
        break;
      case "last7days":
        setData(mockChartLast7Days);
        break;
      case "thisMonth":
        setData(mockChartThisMonth);
        break;
      case "lastMonth":
        setData(mockChartLastMonth);
        break;
      case "thisYear":
        setData(mockChartThisYear);
        break;
      default:
        setChartData([]);
    }
  }, [selectedRange]);
  
  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-md font-semibold text-nord-0">View Order Statistics</h2>
        <Select defaultValue="today" onValueChange={setSelectedRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Today" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="today">Today</SelectItem>
            <SelectItem value="last7days">Last 7 Days</SelectItem>
            <SelectItem value="thisMonth">This Month</SelectItem>
            <SelectItem value="lastMonth">Last Month</SelectItem>
            <SelectItem value="thisYear">This Year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className=" my-5 grid grid-cols-1 lg:grid-cols-3 gap-2">
        <OrderChart data={data} dataKey="totalOrders" label="Amount of orders" color="#bf616a"/>
        <OrderChart data={data} dataKey="totalRevenue" label="Total Revenue" color="#88c0d0"/>
        <OrderChart data={data} dataKey="averageOrderValue" label="Average Order Value" color="#b48ead"/>
      </div>
    </div>
  );
}
