import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
      <main className="max-w-2xl text-center px-6">
        <h1 className="text-3xl font-bold mb-4">
          Оценка информационной безопасности
          <br />
          по критерию уверенности
        </h1>

        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Веб-инструмент для расчёта уровня уверенности реализации политики
          информационной безопасности организации на основе модели доверия
          и функции Харрингтона.
        </p>

        <Link
          href="/assessment"
          className="inline-block px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
        >
          Начать оценку
        </Link>
      </main>
    </div>
  );
}
