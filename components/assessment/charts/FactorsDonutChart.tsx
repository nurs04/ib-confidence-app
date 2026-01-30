"use client";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Tooltip,
  Legend,
  Cell,
} from "recharts";
import { CHART_COLORS } from "./chartColors";

type Item = {
  name: string;
  value: number;
};

interface Props {
  items: Item[];
}

export default function FactorsDonutChart({ items }: Props) {
  const data = items.map((x) => ({
    ...x,
    value: Number.isFinite(x.value) ? x.value : 0,
  }));

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius="55%"
            outerRadius="85%"
            paddingAngle={2}
          >
            {data.map((_, idx) => (
              <Cell key={idx} fill={CHART_COLORS[idx % CHART_COLORS.length]} />
            ))}
          </Pie>

          <Tooltip
            formatter={(value: any) =>
              typeof value === "number" ? value.toFixed(3) : value
            }
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
