"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { loadAssessmentData, clearAssessmentData } from "@/lib/storage";
import { calculateAssessment } from "@/lib/calculations";

import FactorsDonutChart from "@/components/assessment/charts/FactorsDonutChart";
import ProcessesChartTabs from "@/components/assessment/charts/ProcessesChartTabs";

function levelRu(level: string) {
  switch (level) {
    case "VERY_HIGH":
      return "Очень высокая";
    case "HIGH":
      return "Высокая";
    case "SATISFACTORY":
      return "Удовлетворительная";
    case "LOW":
      return "Низкая";
    default:
      return "Очень низкая";
  }
}

export default function ResultView() {
  const router = useRouter();

  const { data, result } = useMemo(() => {
    const data = loadAssessmentData();
    const result = data ? calculateAssessment(data) : null;
    return { data, result };
  }, []);

  if (!data || !result) {
    return (
      <div className="bg-white shadow rounded-xl p-6">
        <h1 className="text-2xl font-bold mb-2">Результаты</h1>
        <p className="text-gray-600 mb-6">
          Нет данных для расчёта. Пройди мастер оценки заново.
        </p>
        <button
          onClick={() => router.push("/assessment")}
          className="px-4 py-2 rounded bg-blue-600 text-white"
        >
          Перейти к оценке
        </button>
      </div>
    );
  }

  // Данные для диаграммы факторов (Donut)
  const factors = [
    { name: "C (доверие)", value: result.C },
    { name: "P (качество)", value: result.P },
    { name: "B (эксперты)", value: result.B },
    { name: "Z (угрозы)", value: result.Z },
  ];

  // Данные для диаграмм процессов
  const processes = data.effectiveness.processes.map((p) => ({
    name: p.name,
    level: p.maturityLevel,
  }));

  return (
    <div className="bg-white shadow rounded-xl p-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold">Результаты оценки</h1>
          <p className="text-gray-600 mt-1">
            Итоговая уверенность реализации политики ИБ
          </p>
        </div>

        <div className="text-right">
          <div className="text-sm text-gray-500">U</div>
          <div className="text-4xl font-bold tabular-nums">
            {result.U.toFixed(3)}
          </div>
          <div className="text-sm mt-1">
            Уровень:{" "}
            <span className="font-semibold">{levelRu(result.level)}</span>
          </div>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <div className="border rounded-lg p-4">
          <div className="font-semibold mb-3">Доверие к ИБ (C)</div>
          <div className="text-sm text-gray-600">
            kC (корректность):{" "}
            <span className="tabular-nums">{result.kC.toFixed(3)}</span>
          </div>
          <div className="text-sm text-gray-600">
            eC (эффективность):{" "}
            <span className="tabular-nums">{result.eC.toFixed(3)}</span>
          </div>
          <div className="text-sm mt-2">
            C ={" "}
            <span className="font-semibold tabular-nums">
              {result.C.toFixed(3)}
            </span>
          </div>
        </div>

        <div className="border rounded-lg p-4">
          <div className="font-semibold mb-3">Факторы уверенности</div>
          <div className="text-sm text-gray-600">
            P (качество оценки):{" "}
            <span className="tabular-nums">{result.P.toFixed(3)}</span>
          </div>
          <div className="text-sm text-gray-600">
            B (эксперты):{" "}
            <span className="tabular-nums">{result.B.toFixed(3)}</span>
          </div>
          <div className="text-sm text-gray-600">
            Z (знания угроз):{" "}
            <span className="tabular-nums">{result.Z.toFixed(3)}</span>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <div className="border rounded-lg p-4">
          <div className="font-semibold mb-2">Вклад факторов (C / P / B / Z)</div>
          <div className="text-sm text-gray-500 mb-3">
            Визуализация ключевых факторов, влияющих на итоговую уверенность.
          </div>
          <FactorsDonutChart items={factors} />
        </div>

        <div className="border rounded-lg p-4">
          <div className="font-semibold mb-2">Зрелость процессов ИБ (0–5)</div>
          <div className="text-sm text-gray-500 mb-3">
            Radar/Bar-представление зрелости процессов.
          </div>

          {processes.length ? (
            <ProcessesChartTabs items={processes} />
          ) : (
            <div className="text-sm text-gray-500">
              Нет процессов для отображения — добавь их в мастере оценки.
            </div>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 mt-8">
        <button
          onClick={() => router.push("/assessment")}
          className="px-4 py-2 rounded bg-gray-200"
        >
          Назад к вводу
        </button>

        <button
          onClick={() => {
            clearAssessmentData();
            router.push("/assessment");
          }}
          className="px-4 py-2 rounded bg-red-600 text-white"
        >
          Новая оценка
        </button>
      </div>
    </div>
  );
}
