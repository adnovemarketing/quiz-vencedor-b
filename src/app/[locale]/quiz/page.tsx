import React, { Suspense } from "react";
import { Header } from "@/components/common/Header";
import { QuizContainer } from "@/components/quiz/QuizContainer";
import { translations } from "@/core/i18n/translations";
import { Locale } from "@/core/i18n/config";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = translations[locale as Locale] || translations['en-gb'];
  return {
    title: t.metadata.quiz.title,
    description: t.metadata.quiz.description,
  };
}

export default function QuizPage() {
  return (
    <div className="min-h-screen flex flex-col bg-zinc-950 text-zinc-50">
      <Header />
      <Suspense
        fallback={
          <div className="flex-1 flex flex-col items-center justify-center py-12">
            <div className="w-10 h-10 border-4 border-zinc-800 border-t-brand-lime rounded-full animate-spin" />
          </div>
        }
      >
        <QuizContainer />
      </Suspense>
    </div>
  );
}
