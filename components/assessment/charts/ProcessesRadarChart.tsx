"use client";

import {
  ResponsiveContainer,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Tooltip,
} from "recharts";

import { CHART_COLORS } from "./chartColors";

type ProcessItem = {
  name: string;
  level: number; // 0..5
};

interface Props {
  items: ProcessItem[];
}

export default function ProcessesRadarChart({ items }: Props) {
  const data = items.map((p) => ({
    name: p.name.length > 18 ? p.name.slice(0, 18) + "…" : p.name,
    level: p.level,
    fullName: p.name,
  }));

  // 🎨 основной цвет для Radar (единый стиль)
  const color = CHART_COLORS[0]; // blue-600

  return (
    <div className="h-90">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data}>
          <PolarGrid strokeOpacity={0.25} />
          <PolarAngleAxis dataKey="name" />
          <PolarRadiusAxis domain={[0, 5]} tickCount={6} />

          <Tooltip
            formatter={(value: number | string | undefined) => {
              const v =
                typeof value === "number"
                  ? value
                  : typeof value === "string"
                  ? Number(value)
                  : 0;
              return v;
            }}
          />

          <Radar
            dataKey="level"
            stroke={color}
            fill={color}
            fillOpacity={0.18}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
