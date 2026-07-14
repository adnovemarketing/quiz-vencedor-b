"use client";

import React from "react";
import { useQuizStore } from "@/core/store/quizStore";
import { QuizStep, AgeGroup } from "@/core/types/quiz";
import { OptionCard } from "../OptionCard";
import { useTranslations } from "@/core/i18n/translations";
import { useLocale } from "@/core/i18n/useLocale";
import { Calendar } from "lucide-react";

interface StepProps {
  onNext: (nextStep: QuizStep) => void;
}

export function StepAgeSelection({ onNext }: StepProps) {
  const { data, updateData } = useQuizStore();
  const locale = useLocale();
  const t = useTranslations(locale);

  const ageOptions: { value: AgeGroup; label: string; desc: string }[] = [
    { value: "18_24", label: t.quiz.steps.ageSelection.options["18_24"].label, desc: t.quiz.steps.ageSelection.options["18_24"].desc },
    { value: "25_34", label: t.quiz.steps.ageSelection.options["25_34"].label, desc: t.quiz.steps.ageSelection.options["25_34"].desc },
    { value: "35_44", label: t.quiz.steps.ageSelection.options["35_44"].label, desc: t.quiz.steps.ageSelection.options["35_44"].desc },
    { value: "45_54", label: t.quiz.steps.ageSelection.options["45_54"].label, desc: t.quiz.steps.ageSelection.options["45_54"].desc },
    { value: "55_plus", label: t.quiz.steps.ageSelection.options["55_plus"].label, desc: t.quiz.steps.ageSelection.options["55_plus"].desc },
  ];

  const handleSelect = (value: AgeGroup) => {
    updateData({ ageGroup: value });
    onNext("gender-selection");
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-2">
        <Calendar className="w-5 h-5 text-brand-lime" />
        <h2 className="text-sm font-heading font-extrabold text-zinc-100 uppercase tracking-wide">
          {t.quiz.steps.ageSelection.title}
        </h2>
      </div>
      <p className="text-xs text-zinc-400 leading-relaxed -mt-2">
        {t.quiz.steps.ageSelection.subtitle}
      </p>

      <div className="flex flex-col gap-2.5">
        {ageOptions.map((opt) => (
          <OptionCard
            key={opt.value}
            title={opt.label}
            description={opt.desc}
            selected={data.ageGroup === opt.value}
            onClick={() => handleSelect(opt.value)}
          />
        ))}
      </div>
    </div>
  );
}
