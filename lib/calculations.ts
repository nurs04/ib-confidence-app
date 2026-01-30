import {
  AssessmentData,
  AssessmentResult,
  HarringtonLevel,
} from "@/types/assessment";

/**
 * Нормализация значения (формула 4)
 */
export function normalize(
  value: number,
  min: number,
  max: number
): number {
  return -2 + 7 * ((value - min) / (max - min));
}

/**
 * Частная функция желательности Харрингтона (формула 3)
 */
export function harringtonDesirability(yNormalized: number): number {
  return Math.exp(-Math.exp(-yNormalized));
}