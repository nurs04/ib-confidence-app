import {
  AssessmentData,
  AssessmentResult,
  HarringtonLevel,
} from "@/types/assessment";


/**    Нормализация значения (формула 4)    */
export function normalize(
  value: number,
  min: number,
  max: number
): number {
  return -2 + 7 * ((value - min) / (max - min));
}


/**    Частная функция желательности Харрингтона (формула 3)    */
export function harringtonDesirability(yNormalized: number): number {
  return Math.exp(-Math.exp(-yNormalized));
}


/**    kC — доверие к корректности   */
export function calculateCorrectness(data: AssessmentData): number {
  const domainValues = data.correctness.domains.map((domain) => {
    const indicators = domain.indicators.map((i) => i.value);
    const product = indicators.reduce((acc, v) => acc * v, 1);
    return Math.pow(product, 1 / indicators.length);
  });

  const total = domainValues.reduce((acc, v) => acc * v, 1);
  return Math.pow(total, 1 / domainValues.length);
}


/**   eC — доверие к эффективности процессов   */
export function calculateEffectiveness(data: AssessmentData): number {
  const desirabilities = data.effectiveness.processes.map((process) => {
    const yNorm = normalize(process.maturityLevel, 0, 5);
    return harringtonDesirability(yNorm);
  });

  const product = desirabilities.reduce((acc, v) => acc * v, 1);
  return Math.pow(product, 1 / desirabilities.length);
}


/**   Качество оценки (P) */
export function calculateQuality(data: AssessmentData): number {
  return (
    data.quality.methodQuality * data.quality.procedureQuality
  );
}


/**   Бэкграунд экспертов (B) */
export function calculateExperts(data: AssessmentData): number {
  return (
    data.experts.correctnessExpertise *
    data.experts.effectivenessExpertise
  );
}


/**   Знания об угрозах (Z)    */
export function calculateThreats(data: AssessmentData): number {
  const rNorm = normalize(data.threats.knownThreatsCredibility, 1, 99);
  const fNorm = normalize(data.threats.newThreatsCredibility, 1, 99);

  const rD = harringtonDesirability(rNorm);
  const fD = harringtonDesirability(fNorm);

  return rD * fD;
}


export function getHarringtonLevel(value: number): HarringtonLevel {
  if (value >= 0.8) return "VERY_HIGH";
  if (value >= 0.63) return "HIGH";
  if (value >= 0.37) return "SATISFACTORY";
  if (value >= 0.2) return "LOW";
  return "VERY_LOW";
}


/**   Главная функция расчёта   */
export function calculateAssessment(
  data: AssessmentData
): AssessmentResult {
  const kC = calculateCorrectness(data);
  const eC = calculateEffectiveness(data);
  const C = kC * eC;

  const P = calculateQuality(data);
  const B = calculateExperts(data);
  const Z = calculateThreats(data);

  const U = C * P * B * Z;

  return {
    kC,
    eC,
    C,
    P,
    B,
    Z,
    U,
    level: getHarringtonLevel(U),
  };
}