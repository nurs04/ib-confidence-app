"use client";

import { AssessmentData } from "@/types/assessment";

interface Props {
  data: AssessmentData;
  setData: (data: AssessmentData) => void;
}

function clampInt(n: number, min: number, max: number) {
  const x = Math.round(n);
  return Math.min(max, Math.max(min, x));
}

export default function StepThreats({ data, setData }: Props) {
  const { knownThreatsCredibility, newThreatsCredibility } = data.threats;

  const update = (
    field: "knownThreatsCredibility" | "newThreatsCredibility",
    value: number
  ) => {
    setData({
      ...data,
      threats: {
        ...data.threats,
        [field]: clampInt(value, 1, 99),
      },
    });
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Знания относительно угроз (Z)</h2>

      <p className="text-gray-600 mb-6">
        Укажите достоверность свидетельств (по шкале 1–99). Это отражает уверенность в знаниях
        об известных угрозах и способность выявлять новые.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="font-medium">Известные угрозы (R)</div>
            <div className="text-sm tabular-nums">{knownThreatsCredibility}</div>
          </div>

          <input
            type="range"
            min={1}
            max={99}
            step={1}
            value={knownThreatsCredibility}
            onChange={(e) => update("knownThreatsCredibility", Number(e.target.value))}
            className="w-full"
          />

          <div className="mt-3">
            <label className="text-xs text-gray-500">Значение (1–99)</label>
            <input
              type="number"
              min={1}
              max={99}
              value={knownThreatsCredibility}
              onChange={(e) => update("knownThreatsCredibility", Number(e.target.value))}
              className="w-full border rounded px-2 py-1 text-sm"
            />
          </div>
        </div>

        <div className="border rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="font-medium">Новые угрозы (F)</div>
            <div className="text-sm tabular-nums">{newThreatsCredibility}</div>
          </div>

          <input
            type="range"
            min={1}
            max={99}
            step={1}
            value={newThreatsCredibility}
            onChange={(e) => update("newThreatsCredibility", Number(e.target.value))}
            className="w-full"
          />

          <div className="mt-3">
            <label className="text-xs text-gray-500">Значение (1–99)</label>
            <input
              type="number"
              min={1}
              max={99}
              value={newThreatsCredibility}
              onChange={(e) => update("newThreatsCredibility", Number(e.target.value))}
              className="w-full border rounded px-2 py-1 text-sm"
            />
          </div>
        </div>
      </div>

      <div className="text-xs text-gray-500 mt-4">
        Подсказка: 80–99 = высокая достоверность, 60–79 = вероятно, 40–59 = неопределённо.
      </div>
    </div>
  );
}
