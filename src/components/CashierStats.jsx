import Chart from "@/components/Chart";

export default function CashierStats({data}) {
  return (
    <div>
      <div>
         <h1 className="text-nord-0 font-bold"> <span className="text-nord-10">Total Orders Closed</span>: {data?.totalOrdersClosed}</h1>
         <h1 className="text-nord-0 font-bold"> <span className="text-nord-10">Total Revenue Collected</span>: {formatPriceIntl((data?.totalRevenue / 100), "USD")}</h1>
       </div>
      <div className="my-5 grid grid-cols-1 lg:grid-cols-3 gap-2">
        <Chart data={data?.aggregatedStats ?? []} dataKey="totalOrdersClosed" label="Amount of orders closed" color="#bf616a"/>
        <Chart data={data?.aggregatedStats ?? []} dataKey="totalRevenue" label="Total Revenue Collected" color="#88c0d0"/>
      </div>
    </div>
  )
}

function formatPriceIntl(amount, currencyCode, locale = 'en-US') {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currencyCode
  }).format(amount);
}
