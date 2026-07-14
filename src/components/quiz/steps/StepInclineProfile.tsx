"use client";

import React from "react";
import { useQuizStore } from "@/core/store/quizStore";
import { QuizStep } from "@/core/types/quiz";
import { OptionCard } from "../OptionCard";
import { useTranslations } from "@/core/i18n/translations";
import { useLocale } from "@/core/i18n/useLocale";
import { TrendingUp } from "lucide-react";

interface StepProps {
  onNext: (nextStep: QuizStep) => void;
}

export function StepInclineProfile({ onNext }: StepProps) {
  const { data, updateData } = useQuizStore();
  const locale = useLocale();
  const t = useTranslations(locale);

  const handleSelect = (hasIncline: boolean) => {
    updateData({ hasInclineAccess: hasIncline });
    onNext("injury-triage");
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="text-center">
        <span className="text-[10px] tracking-widest text-brand-lime font-heading font-extrabold uppercase bg-brand-lime/10 px-3 py-1 rounded-full">
          {t.quiz.steps.inclineProfile.badge}
        </span>
        <h2 className="text-xl md:text-2xl font-heading font-extrabold text-zinc-50 mt-3 leading-tight uppercase">
          {t.quiz.steps.inclineProfile.title}
        </h2>
        <p className="text-xs text-zinc-400 mt-2">
          {t.quiz.steps.inclineProfile.subtitle}
        </p>
      </div>

      <div className="flex flex-col gap-3 mt-2">
        <OptionCard
          title={t.quiz.steps.inclineProfile.yes.label}
          description={t.quiz.steps.inclineProfile.yes.desc}
          icon={<TrendingUp className="w-5 h-5" />}
          selected={data.hasInclineAccess === true}
          onClick={() => handleSelect(true)}
        />
        <OptionCard
          title={t.quiz.steps.inclineProfile.no.label}
          description={t.quiz.steps.inclineProfile.no.desc}
          icon={<TrendingUp className="w-5 h-5 rotate-90" />}
          selected={data.hasInclineAccess === false}
          onClick={() => handleSelect(false)}
        />
      </div>
    </div>
  );
}
