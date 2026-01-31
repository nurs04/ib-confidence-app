"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { CHART_COLORS } from "./chartColors";

type ProcessItem = {
  name: string;
  level: number;
};

interface Props {
  items: ProcessItem[];
}

export default function ProcessesBarChart({ items }: Props) {
  const data = items.map((x) => ({
    ...x,
    level: Number.isFinite(x.level) ? x.level : 0,
  }));

  return (
    <div className="h-90">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 40, left: 0, bottom: 60 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            interval={0}
            angle={-20}
            textAnchor="end"
            height={20}
            dy={20}
          />
          <YAxis domain={[0, 5]} ticks={[0, 1, 2, 3, 4, 5]} />
          <Tooltip />
          <Bar dataKey="level" fill={CHART_COLORS[0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
