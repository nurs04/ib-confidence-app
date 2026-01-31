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
  const normalized = value.replace(",", ".");
  const n = Number(normalized);
  return Number.isFinite(n) ? n : 0;
}

type Field =
  | "methodCorrectness"
  | "procedureCorrectness"
  | "methodEffectiveness"
  | "procedureEffectiveness";

function Row({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="border rounded-lg p-4">
      <div className="flex items-center justify-between mb-2 gap-4">
        <div className="font-medium">{label}</div>
        <div className="text-sm tabular-nums">{value.toFixed(2)}</div>
      </div>

      <div className="flex items-center gap-3">
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="flex-1"
        />
        <input
          type="number"
          min={0}
          max={1}
          step={0.01}
          value={value}
          onChange={(e) => onChange(parseNumber(e.target.value))}
          className="w-20 border rounded px-2 py-1 text-sm tabular-nums"
        />
      </div>

      <div className="text-xs text-gray-500 mt-2">0 — плохо, 1 — отлично</div>
    </div>
  );
}

export default function StepQuality({ data, setData }: Props) {
  const q = data.quality;

  const update = (field: Field, value: number) => {
    setData({
      ...data,
      quality: {
        ...q,
        [field]: clamp01(value),
      },
    });
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Качество оценки (P)</h2>

      <p className="text-gray-600 mb-6">
        В статье качество оценивается отдельно для корректности и эффективности:
        метод (M) и процедура (L).
      </p>

      <div className="mb-6">
        <h3 className="font-semibold mb-3">Для корректности (Pk)</h3>
        <div className="grid grid-cols-1 gap-4">
          <Row
            label="Качество метода (ξMk)"
            value={q.methodCorrectness}
            onChange={(v) => update("methodCorrectness", v)}
          />
          <Row
            label="Качество процедуры (ξLk)"
            value={q.procedureCorrectness}
            onChange={(v) => update("procedureCorrectness", v)}
          />
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-3">Для эффективности (Pe)</h3>
        <div className="grid grid-cols-1 gap-4">
          <Row
            label="Качество метода (ξMe)"
            value={q.methodEffectiveness}
            onChange={(v) => update("methodEffectiveness", v)}
          />
          <Row
            label="Качество процедуры (ξLe)"
            value={q.procedureEffectiveness}
            onChange={(v) => update("procedureEffectiveness", v)}
          />
        </div>
      </div>
    </div>
  );
}
