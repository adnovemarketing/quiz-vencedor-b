"use client";

import React from "react";
import { useQuizStore } from "@/core/store/quizStore";
import { QuizStep, SleepDuration } from "@/core/types/quiz";
import { OptionCard } from "../OptionCard";
import { useTranslations } from "@/core/i18n/translations";
import { useLocale } from "@/core/i18n/useLocale";
import { Moon } from "lucide-react";

interface StepProps {
  onNext: (nextStep: QuizStep) => void;
}

export function StepSleepQuality({ onNext }: StepProps) {
  const { data, updateData } = useQuizStore();
  const locale = useLocale();
  const t = useTranslations(locale);

  const sleepOptions: { value: SleepDuration; label: string; desc: string }[] = [
    { value: "less_5h", label: t.quiz.steps.sleepQuality.options["less_5h"].label, desc: t.quiz.steps.sleepQuality.options["less_5h"].desc },
    { value: "5_to_6h", label: t.quiz.steps.sleepQuality.options["5_to_6h"].label, desc: t.quiz.steps.sleepQuality.options["5_to_6h"].desc },
    { value: "6_to_7h", label: t.quiz.steps.sleepQuality.options["6_to_7h"].label, desc: t.quiz.steps.sleepQuality.options["6_to_7h"].desc },
    { value: "7_to_8h", label: t.quiz.steps.sleepQuality.options["7_to_8h"].label, desc: t.quiz.steps.sleepQuality.options["7_to_8h"].desc },
    { value: "more_8h", label: t.quiz.steps.sleepQuality.options["more_8h"].label, desc: t.quiz.steps.sleepQuality.options["more_8h"].desc },
  ];

  const handleSelect = (value: SleepDuration) => {
    updateData({ sleepDuration: value });
    onNext("water-intake");
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-2">
        <Moon className="w-5 h-5 text-brand-lime" />
        <h2 className="text-sm font-heading font-extrabold text-zinc-100 uppercase tracking-wide">
          {t.quiz.steps.sleepQuality.title}
        </h2>
      </div>
      <p className="text-xs text-zinc-400 leading-relaxed -mt-2">
        {t.quiz.steps.sleepQuality.subtitle}
      </p>

      <div className="flex flex-col gap-2.5">
        {sleepOptions.map((opt) => (
          <OptionCard
            key={opt.value}
            title={opt.label}
            description={opt.desc}
            selected={data.sleepDuration === opt.value}
            onClick={() => handleSelect(opt.value)}
          />
        ))}
      </div>
    </div>
  );
}
