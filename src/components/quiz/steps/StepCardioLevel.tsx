"use client";

import React from "react";
import { useQuizStore } from "@/core/store/quizStore";
import { QuizStep, CardioFitnessLevel } from "@/core/types/quiz";
import { OptionCard } from "../OptionCard";
import { useTranslations } from "@/core/i18n/translations";
import { useLocale } from "@/core/i18n/useLocale";
import { Heart } from "lucide-react";

interface StepProps {
  onNext: (nextStep: QuizStep) => void;
}

export function StepCardioLevel({ onNext }: StepProps) {
  const { data, updateData } = useQuizStore();
  const locale = useLocale();
  const t = useTranslations(locale);

  const options: { value: CardioFitnessLevel; title: string; description: string; emoji: string }[] = [
    {
      value: "beginner",
      title: t.quiz.steps.cardioLevel.beginner.label,
      description: t.quiz.steps.cardioLevel.beginner.desc,
      emoji: "🧘",
    },
    {
      value: "intermediate",
      title: t.quiz.steps.cardioLevel.intermediate.label,
      description: t.quiz.steps.cardioLevel.intermediate.desc,
      emoji: "🏃",
    },
    {
      value: "advanced",
      title: t.quiz.steps.cardioLevel.advanced.label,
      description: t.quiz.steps.cardioLevel.advanced.desc,
      emoji: "⚡",
    },
    {
      value: "poor_fitness",
      title: t.quiz.steps.cardioLevel.poor.label,
      description: t.quiz.steps.cardioLevel.poor.desc,
      emoji: "🥵",
    },
  ];

  const handleSelect = (val: CardioFitnessLevel) => {
    updateData({ cardioFitnessLevel: val });
    onNext("incline-profile");
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="text-center">
        <span className="text-[10px] tracking-widest text-brand-lime font-heading font-extrabold uppercase bg-brand-lime/10 px-3 py-1 rounded-full">
          {t.quiz.steps.cardioLevel.badge}
        </span>
        <h2 className="text-xl md:text-2xl font-heading font-extrabold text-zinc-50 mt-3 leading-tight uppercase">
          {t.quiz.steps.cardioLevel.title}
        </h2>
        <p className="text-xs text-zinc-400 mt-2">
          {t.quiz.steps.cardioLevel.subtitle}
        </p>
      </div>

      <div className="flex flex-col gap-3 mt-2">
        {options.map((opt) => (
          <OptionCard
            key={opt.value}
            title={opt.title}
            description={opt.description}
            emoji={opt.emoji}
            selected={data.cardioFitnessLevel === opt.value}
            onClick={() => handleSelect(opt.value)}
          />
        ))}
      </div>
    </div>
  );
}
