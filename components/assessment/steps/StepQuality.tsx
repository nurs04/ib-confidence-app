"use client";

import { AssessmentData } from "@/types/assessment";

interface Props {
  data: AssessmentData;
  setData: (data: AssessmentData) => void;
}

function clamp01(n: number) {
  return Math.min(1, Math.max(0, n));
}

export function StepQuality({ data, setData }: Props) {
  const { methodQuality, procedureQuality } = data.quality;

  const update = (field: "methodQuality" | "procedureQuality", value: number) => {
    setData({
      ...data,
      quality: {
        ...data.quality,
        [field]: clamp01(value),
      },
    });
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Качество процедуры оценки (P)</h2>

      <p className="text-gray-600 mb-6">
        Укажите, насколько качественно выбран метод экспертизы и насколько корректно проведена процедура оценки.
      </p>

      <div className="border rounded-lg p-4 mb-4">
        <div className="flex items-center justify-between mb-2">
          <div className="font-medium">Качество экспертного метода</div>
          <div className="text-sm tabular-nums">{methodQuality.toFixed(2)}</div>
        </div>
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={methodQuality}
          onChange={(e) => update("methodQuality", Number(e.target.value))}
          className="w-full"
        />
        <div className="text-xs text-gray-500 mt-2">0 — плохо, 1 — отлично</div>
      </div>

      <div className="border rounded-lg p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="font-medium">Качество процедуры оценки</div>
          <div className="text-sm tabular-nums">{procedureQuality.toFixed(2)}</div>
        </div>
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={procedureQuality}
          onChange={(e) => update("procedureQuality", Number(e.target.value))}
          className="w-full"
        />
        <div className="text-xs text-gray-500 mt-2">0 — плохо, 1 — отлично</div>
      </div>
    </div>
  );
}
