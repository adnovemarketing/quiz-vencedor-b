"use client";

import React from "react";
import { useQuizStore } from "@/core/store/quizStore";
import { QuizStep, NutritionBaseline } from "@/core/types/quiz";
import { OptionCard } from "../OptionCard";
import { useTranslations } from "@/core/i18n/translations";
import { useLocale } from "@/core/i18n/useLocale";
import { Apple } from "lucide-react";

interface StepProps {
  onNext: (nextStep: QuizStep) => void;
}

export function StepDailyNutrition({ onNext }: StepProps) {
  const { data, updateData } = useQuizStore();
  const locale = useLocale();
  const t = useTranslations(locale);

  const options: { value: NutritionBaseline; title: string; description: string; emoji: string }[] = [
    {
      value: "balanced",
      title: t.quiz.steps.dailyNutrition.balanced.label,
      description: t.quiz.steps.dailyNutrition.balanced.desc,
      emoji: "🥗",
    },
    {
      value: "carbs_heavy",
      title: t.quiz.steps.dailyNutrition.carbsHeavy.label,
      description: t.quiz.steps.dailyNutrition.carbsHeavy.desc,
      emoji: "🍞",
    },
    {
      value: "low_carb_keto",
      title: t.quiz.steps.dailyNutrition.lowCarb.label,
      description: t.quiz.steps.dailyNutrition.lowCarb.desc,
      emoji: "🥑",
    },
    {
      value: "unstructured",
      title: t.quiz.steps.dailyNutrition.unstructured.label,
      description: t.quiz.steps.dailyNutrition.unstructured.desc,
      emoji: "🍕",
    },
  ];

  const handleSelect = (val: NutritionBaseline) => {
    updateData({ nutritionBaseline: val });
    onNext("antropometria");
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="text-center">
        <span className="text-[10px] tracking-widest text-brand-lime font-heading font-extrabold uppercase bg-brand-lime/10 px-3 py-1 rounded-full">
          {t.quiz.steps.dailyNutrition.badge}
        </span>
        <h2 className="text-xl md:text-2xl font-heading font-extrabold text-zinc-50 mt-3 leading-tight uppercase">
          {t.quiz.steps.dailyNutrition.title}
        </h2>
        <p className="text-xs text-zinc-400 mt-2">
          {t.quiz.steps.dailyNutrition.subtitle}
        </p>
      </div>

      <div className="flex flex-col gap-3 mt-2">
        {options.map((opt) => (
          <OptionCard
            key={opt.value}
            title={opt.title}
            description={opt.description}
            emoji={opt.emoji}
            selected={data.nutritionBaseline === opt.value}
            onClick={() => handleSelect(opt.value)}
          />
        ))}
      </div>
    </div>
  );
}
