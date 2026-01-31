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


function geoMean(values: number[]): number {
  if (!values.length) return 0;
  const product = values.reduce((acc, v) => acc * v, 1);
  return Math.pow(product, 1 / values.length);
}

/** Ck — доверие к корректности */
export function calculateCorrectness(data: AssessmentData): number {
  const domains = data.correctness.domains;
  if (!domains.length) return 0;

  const domainScores = domains.map((domain) => {
    const indicators = domain.indicators.map((i) => i.value);
    return geoMean(indicators);
  });

  return geoMean(domainScores);
}

/** Ce — доверие к эффективности процессов  */
export function calculateEffectiveness(data: AssessmentData): number {
  const processes = data.effectiveness.processes;
  if (!processes.length) return 0;

  const d = processes.map((p) => {
    const yNorm = normalize(p.maturityLevel, 0, 5); 
    return harringtonDesirability(yNorm);           
  });

  return geoMean(d); 
}

/** Dc — формула (11): Dc = sqrt(Ck * Ce) */
export function calculateTrustC(kC: number, eC: number): number {
  return Math.sqrt(kC * eC);
}

// /**   Качество оценки (P) */
export function calculateQuality(data: AssessmentData): number {
  const q = data.quality;
  const Pk = Math.sqrt(q.methodCorrectness * q.procedureCorrectness);
  const Pe = Math.sqrt(q.methodEffectiveness * q.procedureEffectiveness);
  const Dp = Math.sqrt(Pk * Pe);
  return Dp;
}

/**   Бэкграунд экспертов (B) */
export function calculateExperts(data: AssessmentData): number {
  const bk = data.experts.correctnessExpertise;
  const be = data.experts.effectivenessExpertise;
  return Math.sqrt(bk * be);
}


/**   Знания об угрозах (Z)    */
export function calculateThreats(data: AssessmentData): number {
  const rNorm = normalize(data.threats.knownThreatsCredibility, 1, 99);
  const fNorm = normalize(data.threats.newThreatsCredibility, 1, 99);

  const dR = harringtonDesirability(rNorm);
  const dF = harringtonDesirability(fNorm);

  return Math.sqrt(dR * dF);
}

export function getHarringtonLevel(value: number): HarringtonLevel {
  if (value >= 0.8) return "VERY_HIGH";
  if (value >= 0.63) return "HIGH";
  if (value >= 0.37) return "SATISFACTORY";
  if (value >= 0.2) return "LOW";
  return "VERY_LOW";
}

/** Главная функция расчёта D(U) = 4th_root(Dc * Dp * Db * Dz) */
export function calculateAssessment(data: AssessmentData): AssessmentResult {
  const kC = calculateCorrectness(data);     // Ck
  const eC = calculateEffectiveness(data);   // Ce

  const C = calculateTrustC(kC, eC);         // Dc (формула 11)
  const P = calculateQuality(data);          // Dp
  const B = calculateExperts(data);          // Db
  const Z = calculateThreats(data);          // Dz

  const product = C * P * B * Z;
  const U = product > 0 ? Math.pow(product, 1 / 4) : 0; // формула 16

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