"use client";

import { useMemo, useState } from "react";
import ProcessesBarChart from "./ProcessesBarChart";
import ProcessesRadarChart from "./ProcessesRadarChart";

type ProcessItem = { name: string; level: number };

export default function ProcessesChartTabs({ items }: { items: ProcessItem[] }) {
  const canShowRadar = items.length >= 3;
  const [mode, setMode] = useState<"radar" | "bar">(canShowRadar ? "radar" : "bar");

  // если процессов стало мало — принудительно на bar
  useMemo(() => {
    if (!canShowRadar && mode === "radar") setMode("bar");
  }, [canShowRadar, mode]);

  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <button
          onClick={() => setMode("radar")}
          disabled={!canShowRadar}
          className={`px-3 py-1.5 rounded text-sm border transition ${
            mode === "radar"
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-white text-gray-700 border-gray-300"
          } ${!canShowRadar ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          Radar
        </button>

        <button
          onClick={() => setMode("bar")}
          className={`px-3 py-1.5 rounded text-sm border transition ${
            mode === "bar"
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-white text-gray-700 border-gray-300"
          }`}
        >
          Bar
        </button>

        <div className="text-xs text-gray-500 ml-auto">
          {mode === "radar"
            ? "Лучше для общего профиля зрелости"
            : "Лучше для сравнения процессов"}
        </div>
      </div>

      {mode === "radar" ? (
        canShowRadar ? (
          <ProcessesRadarChart items={items} />
        ) : (
          <div className="text-sm text-gray-500">
            Radar корректно выглядит, когда процессов хотя бы 3. Сейчас: {items.length}.
          </div>
        )
      ) : (
        <ProcessesBarChart items={items} />
      )}
    </div>
  );
}
