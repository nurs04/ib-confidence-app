"use client";

import { AssessmentData } from "@/types/assessment";
import { v4 as uuid } from "uuid";

interface Props {
  data: AssessmentData;
  setData: (data: AssessmentData) => void;
}

const maturityLabels = [
  "0 — Отсутствует",
  "1 — Начальный",
  "2 — Повторяемый",
  "3 — Определённый",
  "4 — Управляемый",
  "5 — Оптимизируемый",
];

export default function StepEffectiveness({ data, setData }: Props) {
  const processes = data.effectiveness.processes;

  const addProcess = () => {
    setData({
      ...data,
      effectiveness: {
        processes: [
          ...processes,
          {
            id: uuid(),
            name: "Новый процесс ИБ",
            maturityLevel: 2,
          },
        ],
      },
    });
  };

  const updateProcess = (
    id: string,
    field: "name" | "maturityLevel",
    value: string | number
  ) => {
    setData({
      ...data,
      effectiveness: {
        processes: processes.map((p) =>
          p.id === id ? { ...p, [field]: value } : p
        ),
      },
    });
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">
        Эффективность процессов ИБ
      </h2>

      <p className="text-gray-600 mb-4">
        Оцените уровень зрелости процессов управления информационной
        безопасностью по шкале от 0 до 5.
      </p>

      {processes.map((process) => (
        <div
          key={process.id}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3 items-center border rounded-lg p-3"
        >
          {/* Название процесса */}
          <input
            value={process.name}
            onChange={(e) =>
              updateProcess(process.id, "name", e.target.value)
            }
            className="border-b outline-none text-sm md:col-span-2"
          />

          {/* Уровень зрелости */}
          <select
            value={process.maturityLevel}
            onChange={(e) =>
              updateProcess(
                process.id,
                "maturityLevel",
                Number(e.target.value)
              )
            }
            className="border rounded px-2 py-1 text-sm"
          >
            {maturityLabels.map((label, index) => (
              <option key={index} value={index}>
                {label}
              </option>
            ))}
          </select>
        </div>
      ))}

      <button
        onClick={addProcess}
        className="px-4 py-2 bg-gray-100 rounded mt-3"
      >
        + Добавить процесс
      </button>
    </div>
  );
}
