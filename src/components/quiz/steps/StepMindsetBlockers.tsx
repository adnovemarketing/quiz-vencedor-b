"use client";

import React from "react";
import { useQuizStore } from "@/core/store/quizStore";
import { QuizStep, MainBlocker } from "@/core/types/quiz";
import { OptionCard } from "../OptionCard";
import { useTranslations } from "@/core/i18n/translations";
import { useLocale } from "@/core/i18n/useLocale";
import { ShieldAlert } from "lucide-react";

interface StepProps {
  onNext: (nextStep: QuizStep) => void;
}

export function StepMindsetBlockers({ onNext }: StepProps) {
  const { data, updateData } = useQuizStore();
  const locale = useLocale();
  const t = useTranslations(locale);

  const options: { value: MainBlocker; title: string; description: string; emoji: string }[] = [
    {
      value: "boredom",
      title: t.quiz.steps.mindsetBlockers.boredom.label,
      description: t.quiz.steps.mindsetBlockers.boredom.desc,
      emoji: "🥱",
    },
    {
      value: "time_constraint",
      title: t.quiz.steps.mindsetBlockers.timeConstraint.label,
      description: t.quiz.steps.mindsetBlockers.timeConstraint.desc,
      emoji: "⏱️",
    },
    {
      value: "joint_pain",
      title: t.quiz.steps.mindsetBlockers.jointPain.label,
      description: t.quiz.steps.mindsetBlockers.jointPain.desc,
      emoji: "🤕",
    },
    {
      value: "lack_of_guidance",
      title: t.quiz.steps.mindsetBlockers.lackGuidance.label,
      description: t.quiz.steps.mindsetBlockers.lackGuidance.desc,
      emoji: "🤷",
    },
    {
      value: "none",
      title: t.quiz.steps.mindsetBlockers.none.label,
      description: t.quiz.steps.mindsetBlockers.none.desc,
      emoji: "🔥",
    },
  ];

  const handleSelect = (val: MainBlocker) => {
    updateData({ mainBlocker: val });
    onNext("educational-transition");
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="text-center">
        <span className="text-[10px] tracking-widest text-brand-lime font-heading font-extrabold uppercase bg-brand-lime/10 px-3 py-1 rounded-full">
          {t.quiz.steps.mindsetBlockers.badge}
        </span>
        <h2 className="text-xl md:text-2xl font-heading font-extrabold text-zinc-50 mt-3 leading-tight uppercase">
          {t.quiz.steps.mindsetBlockers.title}
        </h2>
        <p className="text-xs text-zinc-400 mt-2">
          {t.quiz.steps.mindsetBlockers.subtitle}
        </p>
      </div>

      <div className="flex flex-col gap-3 mt-2">
        {options.map((opt) => (
          <OptionCard
            key={opt.value}
            title={opt.title}
            description={opt.description}
            emoji={opt.emoji}
            selected={data.mainBlocker === opt.value}
            onClick={() => handleSelect(opt.value)}
          />
        ))}
      </div>
    </div>
  );
}
