"use client";

import React from "react";
import { useQuizStore } from "@/core/store/quizStore";
import { QuizStep, WaterIntake } from "@/core/types/quiz";
import { OptionCard } from "../OptionCard";
import { useTranslations } from "@/core/i18n/translations";
import { useLocale } from "@/core/i18n/useLocale";
import { Droplet } from "lucide-react";

interface StepProps {
  onNext: (nextStep: QuizStep) => void;
}

export function StepWaterIntake({ onNext }: StepProps) {
  const { data, updateData } = useQuizStore();
  const locale = useLocale();
  const t = useTranslations(locale);

  const waterOptions: { value: WaterIntake; label: string; desc: string }[] = [
    { value: "less_1L", label: t.quiz.steps.waterIntake.options["less_1L"].label, desc: t.quiz.steps.waterIntake.options["less_1L"].desc },
    { value: "1_to_2L", label: t.quiz.steps.waterIntake.options["1_to_2L"].label, desc: t.quiz.steps.waterIntake.options["1_to_2L"].desc },
    { value: "2_to_3L", label: t.quiz.steps.waterIntake.options["2_to_3L"].label, desc: t.quiz.steps.waterIntake.options["2_to_3L"].desc },
    { value: "more_3L", label: t.quiz.steps.waterIntake.options["more_3L"].label, desc: t.quiz.steps.waterIntake.options["more_3L"].desc },
  ];

  const handleSelect = (value: WaterIntake) => {
    updateData({ waterIntake: value });
    onNext("daily-activity");
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-2">
        <Droplet className="w-5 h-5 text-brand-teal" />
        <h2 className="text-sm font-heading font-extrabold text-zinc-100 uppercase tracking-wide">
          {t.quiz.steps.waterIntake.title}
        </h2>
      </div>
      <p className="text-xs text-zinc-400 leading-relaxed -mt-2">
        {t.quiz.steps.waterIntake.subtitle}
      </p>

      <div className="flex flex-col gap-2.5">
        {waterOptions.map((opt) => (
          <OptionCard
            key={opt.value}
            title={opt.label}
            description={opt.desc}
            selected={data.waterIntake === opt.value}
            onClick={() => handleSelect(opt.value)}
          />
        ))}
      </div>
    </div>
  );
}
