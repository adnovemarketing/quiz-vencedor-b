"use client";

import React from "react";
import { useQuizStore } from "@/core/store/quizStore";
import { QuizStep } from "@/core/types/quiz";
import { OptionCard } from "../OptionCard";
import { Button } from "@/components/ui/button";
import { useTranslations } from "@/core/i18n/translations";
import { useLocale } from "@/core/i18n/useLocale";

interface StepProps {
  onNext: (nextStep: QuizStep) => void;
}

export function StepInjuryTriage({ onNext }: StepProps) {
  const { data, updateData } = useQuizStore();
  const locale = useLocale();
  const t = useTranslations(locale);
  const { jointSensitivities } = data;

  const handleToggle = (key: keyof typeof jointSensitivities) => {
    if (key === "none") {
      updateData({
        jointSensitivities: {
          knees: false,
          ankles: false,
          lowerBack: false,
          none: true,
        },
      });
    } else {
      updateData({
        jointSensitivities: {
          ...jointSensitivities,
          [key]: !jointSensitivities[key],
          none: false,
        },
      });
    }
  };

  const handleNext = () => {
    const hasAnyActive = Object.values(useQuizStore.getState().data.jointSensitivities).some(v => v);
    if (!hasAnyActive) {
      updateData({
        jointSensitivities: {
          knees: false,
          ankles: false,
          lowerBack: false,
          none: true,
        },
      });
    }
    onNext("sleep-quality");
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="text-center">
        <span className="text-[10px] tracking-widest text-brand-lime font-heading font-extrabold uppercase bg-brand-lime/10 px-3 py-1 rounded-full">
          {t.quiz.steps.injuryTriage.badge}
        </span>
        <h2 className="text-xl md:text-2xl font-heading font-extrabold text-zinc-50 mt-3 leading-tight uppercase">
          {t.quiz.steps.injuryTriage.title}
        </h2>
        <p className="text-xs text-zinc-400 mt-2">
          {t.quiz.steps.injuryTriage.subtitle}
        </p>
      </div>

      <div className="flex flex-col gap-3 mt-2">
        <OptionCard
          title={t.quiz.steps.injuryTriage.knees.title}
          description={t.quiz.steps.injuryTriage.knees.desc}
          emoji="🦵"
          selected={jointSensitivities.knees}
          onClick={() => handleToggle("knees")}
          multiSelect
        />
        <OptionCard
          title={t.quiz.steps.injuryTriage.ankles.title}
          description={t.quiz.steps.injuryTriage.ankles.desc}
          emoji="👟"
          selected={jointSensitivities.ankles}
          onClick={() => handleToggle("ankles")}
          multiSelect
        />
        <OptionCard
          title={t.quiz.steps.injuryTriage.lowerBack.title}
          description={t.quiz.steps.injuryTriage.lowerBack.desc}
          emoji="🧘"
          selected={jointSensitivities.lowerBack}
          onClick={() => handleToggle("lowerBack")}
          multiSelect
        />
        <OptionCard
          title={t.quiz.steps.injuryTriage.none.title}
          description={t.quiz.steps.injuryTriage.none.desc}
          emoji="💪"
          selected={jointSensitivities.none}
          onClick={() => handleToggle("none")}
          multiSelect
        />
      </div>

      <Button
        onClick={handleNext}
        className="w-full mt-4 bg-brand-lime text-zinc-950 hover:bg-brand-lime-hover font-heading font-bold text-sm tracking-wide py-6 rounded-2xl transition-all cursor-pointer"
      >
        {t.quiz.steps.injuryTriage.cta}
      </Button>
    </div>
  );
}
