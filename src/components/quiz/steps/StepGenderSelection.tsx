"use client";

import React from "react";
import { useQuizStore } from "@/core/store/quizStore";
import { QuizStep, BiomechanicsGender } from "@/core/types/quiz";
import { OptionCard } from "../OptionCard";
import { useTranslations } from "@/core/i18n/translations";
import { useLocale } from "@/core/i18n/useLocale";

interface StepProps {
  onNext: (nextStep: QuizStep) => void;
}

export function StepGenderSelection({ onNext }: StepProps) {
  const { data, updateData } = useQuizStore();
  const locale = useLocale();
  const t = useTranslations(locale);

  const options: { value: BiomechanicsGender; title: string; description: string; emoji: string }[] = [
    {
      value: "female",
      title: t.quiz.steps.genderSelection.female.label,
      description: t.quiz.steps.genderSelection.female.desc,
      emoji: "👩",
    },
    {
      value: "male",
      title: t.quiz.steps.genderSelection.male.label,
      description: t.quiz.steps.genderSelection.male.desc,
      emoji: "👨",
    },
    {
      value: "other",
      title: t.quiz.steps.genderSelection.other.label,
      description: t.quiz.steps.genderSelection.other.desc,
      emoji: "🧬",
    },
  ];

  const handleSelect = (val: BiomechanicsGender) => {
    updateData({ biomechanicsGender: val });
    onNext("treadmill-frequency");
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="text-center">
        <span className="text-[10px] tracking-widest text-brand-lime font-heading font-extrabold uppercase bg-brand-lime/10 px-3 py-1 rounded-full">
          {t.quiz.steps.genderSelection.badge}
        </span>
        <h2 className="text-xl md:text-2xl font-heading font-extrabold text-zinc-50 mt-3 leading-tight uppercase">
          {t.quiz.steps.genderSelection.title}
        </h2>
        <p className="text-xs text-zinc-400 mt-2">
          {t.quiz.steps.genderSelection.subtitle}
        </p>
      </div>

      <div className="flex flex-col gap-3 mt-2">
        {options.map((opt) => (
          <OptionCard
            key={opt.value}
            title={opt.title}
            description={opt.description}
            emoji={opt.emoji}
            selected={data.biomechanicsGender === opt.value}
            onClick={() => handleSelect(opt.value)}
          />
        ))}
      </div>
    </div>
  );
}
