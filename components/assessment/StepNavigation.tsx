interface Props {
  currentStep: number;
  totalSteps: number;
  onBack: () => void;
  onNext: () => void;
  onFinish: () => void;
}

export default function StepNavigation({
  currentStep,
  totalSteps,
  onBack,
  onNext,
  onFinish,
}: Props) {
  const isLast = currentStep === totalSteps - 1;

  return (
    <div className="flex justify-between mt-6">
      <button
        onClick={onBack}
        disabled={currentStep === 0}
        className="px-4 py-2 rounded bg-gray-200 disabled:opacity-50"
      >
        Назад
      </button>

      {!isLast ? (
        <button
          onClick={onNext}
          className="px-4 py-2 rounded bg-blue-600 text-white"
        >
          Далее
        </button>
      ) : (
        <button
          onClick={onFinish}
          className="px-4 py-2 rounded bg-green-600 text-white"
        >
          Рассчитать
        </button>
      )}
    </div>
  );
}
