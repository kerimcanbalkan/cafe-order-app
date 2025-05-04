import OrderChart from "@/components/OrderChart";
import { useState } from "react";
// You can replace this mock data with a `data` prop if desired
const mockChartDaily = [
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

const mockChartMonthly = [
  { day: "Day 1", totalOrders: 2, totalRevenue: 100, averageOrderValue: 50 },
  { day: "Day 2", totalOrders: 3, totalRevenue: 150, averageOrderValue: 50 },
  { day: "Day 3", totalOrders: 1, totalRevenue: 75, averageOrderValue: 75 },
  { day: "Day 4", totalOrders: 5, totalRevenue: 250, averageOrderValue: 50 },
  { day: "Day 5", totalOrders: 4, totalRevenue: 200, averageOrderValue: 50 },
  { day: "Day 6", totalOrders: 6, totalRevenue: 300, averageOrderValue: 50 },
  { day: "Day 7", totalOrders: 3, totalRevenue: 180, averageOrderValue: 60 },
  { day: "Day 8", totalOrders: 4, totalRevenue: 210, averageOrderValue: 52.5 },
  { day: "Day 9", totalOrders: 2, totalRevenue: 90, averageOrderValue: 45 },
  { day: "Day 10", totalOrders: 5, totalRevenue: 260, averageOrderValue: 52 },
  { day: "Day 11", totalOrders: 6, totalRevenue: 310, averageOrderValue: 51.67 },
  { day: "Day 12", totalOrders: 7, totalRevenue: 350, averageOrderValue: 50 },
  { day: "Day 13", totalOrders: 3, totalRevenue: 160, averageOrderValue: 53.33 },
  { day: "Day 14", totalOrders: 5, totalRevenue: 270, averageOrderValue: 54 },
  { day: "Day 15", totalOrders: 4, totalRevenue: 230, averageOrderValue: 57.5 },
  { day: "Day 16", totalOrders: 2, totalRevenue: 100, averageOrderValue: 50 },
  { day: "Day 17", totalOrders: 4, totalRevenue: 220, averageOrderValue: 55 },
  { day: "Day 18", totalOrders: 6, totalRevenue: 290, averageOrderValue: 48.33 },
  { day: "Day 19", totalOrders: 3, totalRevenue: 170, averageOrderValue: 56.67 },
  { day: "Day 20", totalOrders: 2, totalRevenue: 120, averageOrderValue: 60 },
  { day: "Day 21", totalOrders: 5, totalRevenue: 270, averageOrderValue: 54 },
  { day: "Day 22", totalOrders: 6, totalRevenue: 320, averageOrderValue: 53.33 },
  { day: "Day 23", totalOrders: 7, totalRevenue: 360, averageOrderValue: 51.43 },
  { day: "Day 24", totalOrders: 8, totalRevenue: 400, averageOrderValue: 50 },
  { day: "Day 25", totalOrders: 4, totalRevenue: 220, averageOrderValue: 55 },
  { day: "Day 26", totalOrders: 5, totalRevenue: 270, averageOrderValue: 54 },
  { day: "Day 27", totalOrders: 6, totalRevenue: 310, averageOrderValue: 51.67 },
  { day: "Day 28", totalOrders: 4, totalRevenue: 240, averageOrderValue: 60 },
  { day: "Day 29", totalOrders: 3, totalRevenue: 200, averageOrderValue: 66.67 },
  { day: "Day 30", totalOrders: 5, totalRevenue: 280, averageOrderValue: 56 }
];

export default function AdminStatistics(){
  const [data, setData] = useState(mockChartMonthly);
  
  return (
    <div>
      <div className="container mx-auto my-5 grid grid-cols-1 lg:grid-cols-3 gap-2">
        <OrderChart data={data} dataKey="totalOrders" label="Amount of orders" color="#bf616a"/>
        <OrderChart data={data} dataKey="totalRevenue" label="Total Revenue" color="#88c0d0"/>
        <OrderChart data={data} dataKey="averageOrderValue" label="Average Order Value" color="#b48ead"/>
      </div>
    </div>
  );
}
