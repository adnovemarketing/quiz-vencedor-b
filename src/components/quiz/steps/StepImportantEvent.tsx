"use client";

import React from "react";
import { useQuizStore } from "@/core/store/quizStore";
import { QuizStep, ImportantEvent } from "@/core/types/quiz";
import { OptionCard } from "../OptionCard";
import { useTranslations } from "@/core/i18n/translations";
import { useLocale } from "@/core/i18n/useLocale";
import { CalendarHeart } from "lucide-react";

interface StepProps {
  onNext: (nextStep: QuizStep) => void;
}

export function StepImportantEvent({ onNext }: StepProps) {
  const { data, updateData } = useQuizStore();
  const locale = useLocale();
  const t = useTranslations(locale);

  const eventOptions: { value: ImportantEvent; label: string; desc: string }[] = [
    { value: "wedding", label: t.quiz.steps.importantEvent.options["wedding"].label, desc: t.quiz.steps.importantEvent.options["wedding"].desc },
    { value: "vacation", label: t.quiz.steps.importantEvent.options["vacation"].label, desc: t.quiz.steps.importantEvent.options["vacation"].desc },
    { value: "birthday", label: t.quiz.steps.importantEvent.options["birthday"].label, desc: t.quiz.steps.importantEvent.options["birthday"].desc },
    { value: "health_goal", label: t.quiz.steps.importantEvent.options["health_goal"].label, desc: t.quiz.steps.importantEvent.options["health_goal"].desc },
    { value: "no_specific_date", label: t.quiz.steps.importantEvent.options["no_specific_date"].label, desc: t.quiz.steps.importantEvent.options["no_specific_date"].desc },
  ];

  const handleSelect = (value: ImportantEvent) => {
    updateData({ importantEvent: value });
    onNext("mindset-blockers");
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-2">
        <CalendarHeart className="w-5 h-5 text-brand-lime" />
        <h2 className="text-sm font-heading font-extrabold text-zinc-100 uppercase tracking-wide">
          {t.quiz.steps.importantEvent.title}
        </h2>
      </div>
      <p className="text-xs text-zinc-400 leading-relaxed -mt-2">
        {t.quiz.steps.importantEvent.subtitle}
      </p>

      <div className="flex flex-col gap-2.5">
        {eventOptions.map((opt) => (
          <OptionCard
            key={opt.value}
            title={opt.label}
            description={opt.desc}
            selected={data.importantEvent === opt.value}
            onClick={() => handleSelect(opt.value)}
          />
        ))}
      </div>
    </div>
  );
}
