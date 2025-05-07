import OrderChart from "@/components/OrderChart";
import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const mockChartToday = [
  { time: "8", totalOrders: 5, totalRevenue: 250},
  { time: "10", totalOrders: 8, totalRevenue: 400},
  { time: "12", totalOrders: 10, totalRevenue: 520},
  { time: "14", totalOrders: 7, totalRevenue: 350},
  { time: "16", totalOrders: 6, totalRevenue: 330},
  { time: "18", totalOrders: 9, totalRevenue: 495},
  { time: "20", totalOrders: 4, totalRevenue: 220},
];

const mockAverageToday = 259;
const mockAverageLast7Days = 221;
const mockAverageThisMonth = 280;
const mockAverageLastMonth = 100;
const mockAverageThisYear = 230;

const mockChartLast7Days = [
  { time: "Monday", totalOrders: 75, totalRevenue: 3750},
  { time: "Tuesday", totalOrders: 80, totalRevenue: 4000},
  { time: "Wednesday", totalOrders: 90, totalRevenue: 4950},
  { time: "Thursday", totalOrders: 85, totalRevenue: 4675},
  { time: "Friday", totalOrders: 100, totalRevenue: 5500},
  { time: "Saturday", totalOrders: 120, totalRevenue: 6600},
  { time: "Sunday", totalOrders: 95, totalRevenue: 5225},
];

const mockChartThisMonth = [
  { time: "1", totalOrders: 120, totalRevenue: 6000},
  { time: "2", totalOrders: 140, totalRevenue: 7700},
  { time: "3", totalOrders: 135, totalRevenue: 7425},
  { time: "4", totalOrders: 150, totalRevenue: 8250},
];

const mockChartLastMonth = [
  { time: "1", totalOrders: 110, totalRevenue: 4000},
  { time: "2", totalOrders: 125, totalRevenue: 6875},
  { time: "3", totalOrders: 130, totalRevenue: 7150},
  { time: "4", totalOrders: 120, totalRevenue: 6600},
];

const mockChartThisYear = [
  { time: "January", totalOrders: 120, totalRevenue: 6000},
  { time: "February", totalOrders: 98, totalRevenue: 4900},
  { time: "March", totalOrders: 130, totalRevenue: 7150},
  { time: "April", totalOrders: 110, totalRevenue: 5500},
  { time: "May", totalOrders: 145, totalRevenue: 7980},
  { time: "June", totalOrders: 160, totalRevenue: 8800},
  { time: "July", totalOrders: 170, totalRevenue: 9350},
  { time: "August", totalOrders: 150, totalRevenue: 8250},
  { time: "September", totalOrders: 140, totalRevenue: 7000},
  { time: "October", totalOrders: 155, totalRevenue: 7750},
  { time: "November", totalOrders: 125, totalRevenue: 6875},
  { time: "December", totalOrders: 180, totalRevenue: 9900},
];


export default function AdminStatistics(){
  const [selectedRange, setSelectedRange] = useState("today");
  const [data, setData] = useState(mockChartToday);
  const [average, setAverage] = useState(mockAverageToday);

  useEffect(() => {
    switch (selectedRange) {
      case "today":
        setData(mockChartToday);
        setAverage(mockAverageToday);
        break;
      case "last7days":
        setData(mockChartLast7Days);
        setAverage(mockAverageLast7Days);
        break;
      case "thisMonth":
        setData(mockChartThisMonth);
        setAverage(mockAverageThisMonth);
        break;
      case "lastMonth":
        setData(mockChartLastMonth);
        setAverage(mockAverageLastMonth);
        break;
      case "thisYear":
        setData(mockChartThisYear);
        setAverage(mockAverageThisYear);
        break;
      default:
        setChartData([]);
    }
  }, [selectedRange]);
  
  return (
    <div className="max-w-300 mx-auto">
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
      <div>
        <h1 className="text-nord-0 font-bold"> <span className="text-nord-10">Average Order Value</span>: {average}$</h1>
        <h1 className="text-nord-0 font-bold"> <span className="text-nord-10">Total Order Amount</span>: {data.reduce((sum, el) =>sum + el.totalOrders,0)}</h1>
        <h1 className="text-nord-0 font-bold mb-4"> <span className="text-nord-10">Total Revenue</span>: {data.reduce((sum, el)=>sum+el.totalRevenue,0)}$</h1>
      </div>
      <div className="my-5 grid grid-cols-1 lg:grid-cols-3 gap-2">
        <OrderChart data={data} dataKey="totalOrders" label="Amount of orders" color="#bf616a"/>
        <OrderChart data={data} dataKey="totalRevenue" label="Total Revenue" color="#88c0d0"/>
      </div>
    </div>
  );
}
