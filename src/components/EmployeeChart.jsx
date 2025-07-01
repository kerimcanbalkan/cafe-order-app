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

export default function EmployeeChart({ data, dataKey, label, color }) {
  return (
    <Card>
      <CardContent>
        <CardTitle className="text-nord-10 text-center p-2">{label}</CardTitle>
        <ChartContainer config={{}} className="h-[200px] w-full">
          <BarChart data={data} margin={{ top: 20, right: 40, bottom: 20, left: 0 }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="groupKey"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={formatGroupKey}
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

function formatGroupKey(value) {
  if (!value) return "";

  // Week format: e.g. 2025-W22
  if (/^\d{4}-W\d{1,2}$/.test(value)) {
    const [year, weekStr] = value.split("-W");
    const week = parseInt(weekStr, 10);
    return `Week ${week}, ${year}`;
  }

  // Month format: e.g. 2025-06
  if (/^\d{4}-\d{2}$/.test(value)) {
    const [year, month] = value.split("-");
    const monthNames = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    const monthName = monthNames[parseInt(month, 10) - 1] || month;
    return `${monthName} ${year}`;
  }

  // Day format: e.g. 2025-06-01
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    const date = new Date(value);
    if (isNaN(date)) return value; // fallback
    return date.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }

  // Fallback: return the value as-is
  return value;
}
