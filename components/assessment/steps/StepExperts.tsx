"use client";

import { AssessmentData } from "@/types/assessment";

interface Props {
  data: AssessmentData;
  setData: (data: AssessmentData) => void;
}

function clamp01(n: number) {
  return Math.min(1, Math.max(0, n));
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

      <div className="border rounded-lg p-4 mb-4">
        <div className="flex items-center justify-between mb-2">
          <div className="font-medium">Экспертиза при оценке корректности</div>
          <div className="text-sm tabular-nums">{correctnessExpertise.toFixed(2)}</div>
        </div>
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={correctnessExpertise}
          onChange={(e) => update("correctnessExpertise", Number(e.target.value))}
          className="w-full"
        />
      </div>

      <div className="border rounded-lg p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="font-medium">Экспертиза при оценке эффективности</div>
          <div className="text-sm tabular-nums">{effectivenessExpertise.toFixed(2)}</div>
        </div>
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={effectivenessExpertise}
          onChange={(e) => update("effectivenessExpertise", Number(e.target.value))}
          className="w-full"
        />
      </div>
    </div>
  );
}
