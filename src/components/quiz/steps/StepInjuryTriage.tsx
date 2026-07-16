"use client";

import React from "react";
import Image from "next/image";
import { useQuizStore } from "@/core/store/quizStore";
import { QuizStep } from "@/core/types/quiz";
import { OptionCard } from "../OptionCard";
import { Button } from "@/components/ui/button";
import { useTranslations } from "@/core/i18n/translations";
import { useLocale } from "@/core/i18n/useLocale";
import { VISUAL_ASSETS } from "@/config/visualAssets";

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
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-center">
      {/* Coluna Esquerda: Texto, Opções e CTA */}
      <div className="md:col-span-7 flex flex-col gap-5">
        <div className="flex flex-col gap-1 px-1">
          <h2 className="text-sm font-heading font-extrabold text-zinc-100 uppercase tracking-wide">
            {t.quiz.steps.injuryTriage.title}
          </h2>
          <p className="text-xs text-zinc-400 leading-relaxed mt-1">
            {t.quiz.steps.injuryTriage.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-1">
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
          className="w-full mt-2 bg-brand-lime text-zinc-950 hover:bg-brand-lime-hover font-heading font-bold text-sm tracking-wide py-6 rounded-2xl transition-all cursor-pointer"
        >
          {t.quiz.steps.injuryTriage.cta}
        </Button>
      </div>

      {/* Coluna Direita: Ilustração de Triagem e Saúde (Layout D) */}
      <div className="md:col-span-5 hidden md:flex flex-col justify-end p-6 bg-zinc-950/40 rounded-2xl border border-zinc-900/60 aspect-square relative overflow-hidden group select-none">
        <Image
          src={VISUAL_ASSETS.health.consultation}
          alt={locale === "pt-br" ? "Proteção e Triagem Articular" : "Joint Protection and Triage"}
          fill
          sizes="33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
        <div className="relative z-10 flex flex-col gap-1">
          <span className="text-[10px] font-heading font-black text-brand-lime uppercase tracking-widest">
            {locale === "pt-br" ? "PROTEÇÃO ARTICULAR" : "JOINT PROTECTION"}
          </span>
          <span className="text-[9px] text-zinc-300 font-medium leading-normal">
            {locale === "pt-br" ? "Mapeamos áreas sensíveis para adaptar a velocidade de subida e evitar impactos." : "Modifying incline and deck compression algorithms to secure sensitive joint structures."}
          </span>
        </div>
      </div>
    </div>
  );
}
