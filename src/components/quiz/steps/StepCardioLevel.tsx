"use client";

import React from "react";
import Image from "next/image";
import { useQuizStore } from "@/core/store/quizStore";
import { QuizStep, CardioFitnessLevel } from "@/core/types/quiz";
import { OptionCard } from "../OptionCard";
import { useTranslations } from "@/core/i18n/translations";
import { useLocale } from "@/core/i18n/useLocale";
import { Heart, Activity, Gauge, Flame } from "lucide-react";
import { VISUAL_ASSETS } from "@/config/visualAssets";

interface StepProps {
  onNext: (nextStep: QuizStep) => void;
}

export function StepCardioLevel({ onNext }: StepProps) {
  const { data, updateData } = useQuizStore();
  const locale = useLocale();
  const t = useTranslations(locale);

  const options: { value: CardioFitnessLevel; title: string; description: string; emoji: string; icon: React.ReactNode }[] = [
    {
      value: "beginner",
      title: t.quiz.steps.cardioLevel.beginner.label,
      description: t.quiz.steps.cardioLevel.beginner.desc,
      emoji: "🧘",
      icon: <Activity className="w-4 h-4 text-brand-teal" />
    },
    {
      value: "intermediate",
      title: t.quiz.steps.cardioLevel.intermediate.label,
      description: t.quiz.steps.cardioLevel.intermediate.desc,
      emoji: "🏃",
      icon: <Gauge className="w-4 h-4 text-brand-lime" />
    },
    {
      value: "advanced",
      title: t.quiz.steps.cardioLevel.advanced.label,
      description: t.quiz.steps.cardioLevel.advanced.desc,
      emoji: "⚡",
      icon: <Flame className="w-4 h-4 text-brand-lime" />
    },
    {
      value: "poor_fitness",
      title: t.quiz.steps.cardioLevel.poor.label,
      description: t.quiz.steps.cardioLevel.poor.desc,
      emoji: "🥵",
      icon: <Heart className="w-4 h-4 text-red-500" />
    },
  ];

  const handleSelect = (val: CardioFitnessLevel) => {
    updateData({ cardioFitnessLevel: val });
    onNext("incline-profile");
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 md-grid-cols-12 gap-6 md:gap-8 items-center">
      {/* Coluna Esquerda: Texto e Opções */}
      <div className="md:col-span-7 md-col-span-7 flex flex-col gap-5 w-full min-w-0">
        <div className="text-left md:text-left px-1">
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-brand-lime animate-pulse animate-duration-1000" />
            <h2 className="text-sm font-heading font-extrabold text-zinc-100 uppercase tracking-wide">
              {t.quiz.steps.cardioLevel.title}
            </h2>
          </div>
          <p className="text-xs text-zinc-400 leading-relaxed mt-2">
            {t.quiz.steps.cardioLevel.subtitle}
          </p>
        </div>

        {/* Grid de Alternativas 2x2 no Desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-1">
          {options.map((opt) => (
            <OptionCard
              key={opt.value}
              title={opt.title}
              description={opt.description}
              emoji={opt.emoji}
              icon={opt.icon}
              selected={data.cardioFitnessLevel === opt.value}
              onClick={() => handleSelect(opt.value)}
            />
          ))}
        </div>
      </div>

      {/* Coluna Direita: Ilustração Visual (Layout A/B/D) */}
      <div className="md:col-span-5 md-col-span-5 hidden md:flex flex-col justify-end p-6 bg-zinc-950/40 rounded-2xl border border-zinc-900/60 aspect-square relative overflow-hidden group select-none">
        <Image
          src={VISUAL_ASSETS.treadmill.experienceMan}
          alt={locale === "pt-br" ? "Nível de Aptidão Cardiorrespiratória" : "Cardiorespiratory Fitness Level"}
          fill
          sizes="33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
        <div className="relative z-10 flex flex-col gap-1">
          <span className="text-[10px] font-heading font-black text-brand-lime uppercase tracking-widest">
            {locale === "pt-br" ? "ZONAS CARDÍACAS" : "HEART RATE ZONES"}
          </span>
          <span className="text-[9px] text-zinc-300 font-medium leading-normal">
            {locale === "pt-br" ? "Calibrando limites para manter você na zona ativa de queima de gordura." : "Defining thresholds to maintain your metabolic training within the active fat-burn zone."}
          </span>
        </div>
      </div>
    </div>
  );
}
