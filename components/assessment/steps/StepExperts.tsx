"use client";

import { AssessmentData } from "@/types/assessment";

interface Props {
  data: AssessmentData;
  setData: (data: AssessmentData) => void;
}

function clamp01(n: number) {
  return Math.min(1, Math.max(0, n));
}

function parseNumber(value: string) {
  // поддержка "0,75" → 0.75
  const normalized = value.replace(",", ".");
  const n = Number(normalized);
  return Number.isFinite(n) ? n : 0;
}

export default function StepExperts({ data, setData }: Props) {
  const { correctnessExpertise, effectivenessExpertise } = data.experts;

  const update = (
    field: "correctnessExpertise" | "effectivenessExpertise",
    value: number
  ) => {
    setData({
      ...data,
      experts: {
        ...data.experts,
        [field]: clamp01(value),
      },
    });
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Бэкграунд экспертов (B)</h2>

      <p className="text-gray-600 mb-6">
        Оцените квалификацию, опыт и репутацию специалистов, проводивших оценку.
      </p>

      {/* correctnessExpertise */}
      <div className="border rounded-lg p-4 mb-4">
        <div className="flex items-center justify-between mb-2">
          <div className="font-medium">Экспертиза при оценке корректности</div>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={correctnessExpertise}
            onChange={(e) =>
              update("correctnessExpertise", Number(e.target.value))
            }
            className="flex-1"
          />

          <input
            type="number"
            min={0}
            max={1}
            step={0.01}
            value={correctnessExpertise}
            onChange={(e) =>
              update("correctnessExpertise", parseNumber(e.target.value))
            }
            className="w-20 border rounded px-2 py-1 text-sm tabular-nums"
          />
        </div>

        <div className="text-xs text-gray-500 mt-2">0 — низко, 1 — очень высоко</div>
      </div>

      {/* effectivenessExpertise */}
      <div className="border rounded-lg p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="font-medium">Экспертиза при оценке эффективности</div>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={effectivenessExpertise}
            onChange={(e) =>
              update("effectivenessExpertise", Number(e.target.value))
            }
            className="flex-1"
          />

          <input
            type="number"
            min={0}
            max={1}
            step={0.01}
            value={effectivenessExpertise}
            onChange={(e) =>
              update("effectivenessExpertise", parseNumber(e.target.value))
            }
            className="w-20 border rounded px-2 py-1 text-sm tabular-nums"
          />
        </div>

        <div className="text-xs text-gray-500 mt-2">0 — низко, 1 — очень высоко</div>
      </div>
    </div>
  );
}
