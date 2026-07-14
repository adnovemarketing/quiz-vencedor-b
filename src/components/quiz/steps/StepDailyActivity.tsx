"use client";

import React from "react";
import { useQuizStore } from "@/core/store/quizStore";
import { QuizStep, JobActivity } from "@/core/types/quiz";
import { OptionCard } from "../OptionCard";
import { useTranslations } from "@/core/i18n/translations";
import { useLocale } from "@/core/i18n/useLocale";
import { Briefcase } from "lucide-react";

interface StepProps {
  onNext: (nextStep: QuizStep) => void;
}

export function StepDailyActivity({ onNext }: StepProps) {
  const { data, updateData } = useQuizStore();
  const locale = useLocale();
  const t = useTranslations(locale);

  const activityOptions: { value: JobActivity; label: string; desc: string }[] = [
    { value: "sedentary", label: t.quiz.steps.dailyActivity.options["sedentary"].label, desc: t.quiz.steps.dailyActivity.options["sedentary"].desc },
    { value: "light_movement", label: t.quiz.steps.dailyActivity.options["light_movement"].label, desc: t.quiz.steps.dailyActivity.options["light_movement"].desc },
    { value: "moderate", label: t.quiz.steps.dailyActivity.options["moderate"].label, desc: t.quiz.steps.dailyActivity.options["moderate"].desc },
    { value: "very_active", label: t.quiz.steps.dailyActivity.options["very_active"].label, desc: t.quiz.steps.dailyActivity.options["very_active"].desc },
  ];

  const handleSelect = (value: JobActivity) => {
    updateData({ jobActivity: value });
    onNext("daily-nutrition");
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-2">
        <Briefcase className="w-5 h-5 text-brand-lime" />
        <h2 className="text-sm font-heading font-extrabold text-zinc-100 uppercase tracking-wide">
          {t.quiz.steps.dailyActivity.title}
        </h2>
      </div>
      <p className="text-xs text-zinc-400 leading-relaxed -mt-2">
        {t.quiz.steps.dailyActivity.subtitle}
      </p>

      <div className="flex flex-col gap-2.5">
        {activityOptions.map((opt) => (
          <OptionCard
            key={opt.value}
            title={opt.label}
            description={opt.desc}
            selected={data.jobActivity === opt.value}
            onClick={() => handleSelect(opt.value)}
          />
        ))}
      </div>
    </div>
  );
}
