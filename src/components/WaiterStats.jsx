import Chart from "@/components/Chart";

export default function WaiterStats({data}) {
  return (
    <div>
      <div>
         <h1 className="text-nord-0 font-bold"> <span className="text-nord-10">Total Orders Served</span>: {data?.totalOrdersServed}</h1>
         <h1 className="text-nord-0 font-bold"> <span className="text-nord-10">Average Serving Time</span>: {data?.averageServingTime} minutes</h1>
         <h1 className="text-nord-0 font-bold mb-4"> <span className="text-nord-10">Fastest Serving Time</span>: {data?.fastestServingTime} minutes</h1>
       </div>
      <div className="my-5 grid grid-cols-1 lg:grid-cols-3 gap-2">
        <Chart data={data?.aggregatedStats ?? []} dataKey="totalOrdersServed" label="Amount of orders closed" color="#bf616a"/>
        <Chart data={data?.aggregatedStats ?? []} dataKey="averageServingTime" label="Total Revenue Collected" color="#88c0d0"/>
      </div>
    </div>
  )
}
