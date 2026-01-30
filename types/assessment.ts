// ---------- Общие типы ----------

export type HarringtonLevel =
  | "VERY_LOW"
  | "LOW"
  | "SATISFACTORY"
  | "HIGH"
  | "VERY_HIGH";

export type MaturityLevel = 0 | 1 | 2 | 3 | 4 | 5;

// ---------- Корректность ИБ ----------

export interface CorrectnessIndicator {
  id: string;
  title: string;
  value: number; // 0..1
}

export interface SecurityDomain {
  id: string;
  name: string;
  indicators: CorrectnessIndicator[];
}

export interface CorrectnessAssessment {
  domains: SecurityDomain[];
}

// ---------- Эффективность ИБ ----------

export interface SecurityProcess {
  id: string;
  name: string;
  maturityLevel: MaturityLevel;
}

export interface EffectivenessAssessment {
  processes: SecurityProcess[];
}

// ---------- Качество оценки ----------

export interface AssessmentQuality {
  methodQuality: number;    // 0..1
  procedureQuality: number; // 0..1
}

// ---------- Эксперты ----------

export interface ExpertBackground {
  correctnessExpertise: number;   // 0..1
  effectivenessExpertise: number; // 0..1
}

// ---------- Угрозы ----------

export interface ThreatKnowledge {
  knownThreatsCredibility: number; // 1..99
  newThreatsCredibility: number;   // 1..99
}

// ---------- Главный объект ----------

export interface AssessmentData {
  correctness: CorrectnessAssessment;
  effectiveness: EffectivenessAssessment;
  quality: AssessmentQuality;
  experts: ExpertBackground;
  threats: ThreatKnowledge;
}

// ---------- Результат ----------

export interface AssessmentResult {
  kC: number;
  eC: number;
  C: number;
  P: number;
  B: number;
  Z: number;
  U: number;
  level: HarringtonLevel;
}