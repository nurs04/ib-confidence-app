"use client";

import { AssessmentData } from "@/types/assessment";
import { v4 as uuid } from "uuid";

interface Props {
  data: AssessmentData;
  setData: (data: AssessmentData) => void;
}

export default function StepCorrectness({ data, setData }: Props) {
  const domains = data.correctness.domains;

  const addDomain = () => {
    setData({
      ...data,
      correctness: {
        domains: [
          ...domains,
          {
            id: uuid(),
            name: "Новая область ИБ",
            indicators: [],
          },
        ],
      },
    });
  };

  const addIndicator = (domainId: string) => {
    setData({
      ...data,
      correctness: {
        domains: domains.map((d) =>
          d.id === domainId
            ? {
                ...d,
                indicators: [
                  ...d.indicators,
                  {
                    id: uuid(),
                    title: "Новый показатель",
                    value: 0.7,
                  },
                ],
              }
            : d
        ),
      },
    });
  };

  const updateIndicatorValue = (
    domainId: string,
    indicatorId: string,
    value: number
  ) => {
    setData({
      ...data,
      correctness: {
        domains: domains.map((d) =>
          d.id === domainId
            ? {
                ...d,
                indicators: d.indicators.map((i) =>
                  i.id === indicatorId ? { ...i, value } : i
                ),
              }
            : d
        ),
      },
    });
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">
        Корректность реализации ИБ
      </h2>

      {domains.map((domain) => (
        <div
          key={domain.id}
          className="border rounded-lg p-4 mb-4"
        >
          <input
            value={domain.name}
            onChange={(e) =>
              setData({
                ...data,
                correctness: {
                  domains: domains.map((d) =>
                    d.id === domain.id
                      ? { ...d, name: e.target.value }
                      : d
                  ),
                },
              })
            }
            className="font-medium mb-3 w-full border-b outline-none"
          />

          {domain.indicators.map((indicator) => (
            <div key={indicator.id} className="mb-3">
              <input
                value={indicator.title}
                onChange={(e) =>
                  setData({
                    ...data,
                    correctness: {
                      domains: domains.map((d) =>
                        d.id === domain.id
                          ? {
                              ...d,
                              indicators: d.indicators.map((i) =>
                                i.id === indicator.id
                                  ? { ...i, title: e.target.value }
                                  : i
                              ),
                            }
                          : d
                      ),
                    },
                  })
                }
                className="w-full text-sm mb-1 border-b outline-none"
              />

              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min={0.1}
                  max={1}
                  step={0.01}
                  value={indicator.value}
                  onChange={(e) =>
                    updateIndicatorValue(
                      domain.id,
                      indicator.id,
                      Number(e.target.value)
                    )
                  }
                  className="flex-1"
                />
                <input
                  type="number"
                  min={0}
                  max={1}
                  step={0.01}
                  value={indicator.value}
                  onChange={(e) => {
                    const v = Number(e.target.value);
                    const clamped = Math.min(1, Math.max(0, isNaN(v) ? 0 : v));
                    updateIndicatorValue(domain.id, indicator.id, clamped);
                  }}
                  className="w-20 border rounded px-2 py-1 text-sm tabular-nums"
                />
              </div>
            </div>
          ))}

          <button
            onClick={() => addIndicator(domain.id)}
            className="text-sm text-blue-600 mt-2"
          >
            + Добавить показатель
          </button>
        </div>
      ))}

      <button
        onClick={addDomain}
        className="px-4 py-2 bg-gray-100 rounded"
      >
        + Добавить область ИБ
      </button>
    </div>
  );
}
