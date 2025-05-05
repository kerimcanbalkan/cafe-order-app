import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Card,
  CardContent,
  CardTitle,
} from "@/components/ui/card";

export default function OrderChart({ data, dataKey, label, color }) {
  
  return (
    <Card>
      <CardContent>
        <CardTitle className="text-nord-10 text-center p-2">{label}</CardTitle>
        <ChartContainer config={{}} className="h-[200px] w-full">
          <BarChart data={data} margin={{ top: 20, right: 40, bottom: 20, left: 0 }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="time"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey={dataKey} name={label} fill={color} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
