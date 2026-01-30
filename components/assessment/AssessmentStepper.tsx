"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AssessmentData } from "@/types/assessment";

import StepCorrectness from "./steps/StepCorrectness";
import StepEffectiveness from "./steps/StepEffectiveness";
import StepQuality from "./steps/StepQuality";
import StepExperts from "./steps/StepExperts";
import StepThreats from "./steps/StepThreats";
import StepNavigation from "./StepNavigation";
import { saveAssessmentData } from "@/lib/storage";

const steps = [
  "Корректность ИБ",
  "Эффективность ИБ",
  "Качество оценки",
  "Эксперты",
  "Угрозы",
];

const initialData: AssessmentData = {
  correctness: { domains: [] },
  effectiveness: { processes: [] },
  quality: { methodQuality: 0.8, procedureQuality: 0.8 },
  experts: { correctnessExpertise: 0.8, effectivenessExpertise: 0.8 },
  threats: { knownThreatsCredibility: 80, newThreatsCredibility: 80 },
};

export default function AssessmentStepper() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState<AssessmentData>(initialData);

  const finish = () => {
    saveAssessmentData(data);
    router.push("/assessment/result");
  };

  return (
    <div className="bg-white shadow rounded-xl p-6">
      <h1 className="text-2xl font-bold mb-6">
        Оценка уверенности информационной безопасности
      </h1>

      <div className="flex justify-between mb-6 gap-2 flex-wrap">
        {steps.map((step, index) => (
          <div
            key={step}
            className={`text-sm ${
              index === currentStep ? "font-bold text-blue-600" : "text-gray-400"
            }`}
          >
            {index + 1}. {step}
          </div>
        ))}
      </div>

      <div className="min-h-80">
        {currentStep === 0 && <StepCorrectness data={data} setData={setData} />}
        {currentStep === 1 && <StepEffectiveness data={data} setData={setData} />}
        {currentStep === 2 && <StepQuality data={data} setData={setData} />}
        {currentStep === 3 && <StepExperts data={data} setData={setData} />}
        {currentStep === 4 && <StepThreats data={data} setData={setData} />}
      </div>

      <StepNavigation
        currentStep={currentStep}
        totalSteps={steps.length}
        onBack={() => setCurrentStep((s) => s - 1)}
        onNext={() => setCurrentStep((s) => s + 1)}
        onFinish={finish}
      />
    </div>
  );
}
