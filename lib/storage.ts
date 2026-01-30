import { AssessmentData } from "@/types/assessment";

const KEY = "ib_assessment_data_v1";

export function saveAssessmentData(data: AssessmentData) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(data));
}

export function loadAssessmentData(): AssessmentData | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AssessmentData;
  } catch {
    return null;
  }
}

export function clearAssessmentData() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(KEY);
}
