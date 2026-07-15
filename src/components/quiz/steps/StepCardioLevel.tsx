"use client";

import React from "react";
import { useQuizStore } from "@/core/store/quizStore";
import { QuizStep, CardioFitnessLevel } from "@/core/types/quiz";
import { OptionCard } from "../OptionCard";
import { useTranslations } from "@/core/i18n/translations";
import { useLocale } from "@/core/i18n/useLocale";
import { Heart, Activity, Gauge, Flame } from "lucide-react";

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
    <div className="flex flex-col gap-5">
      {/* Imagem/Ilustração Superior (Layout B) */}
      <div className="w-full h-28 bg-zinc-950/40 rounded-2xl border border-zinc-900/60 overflow-hidden relative flex items-center justify-between p-6 select-none">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-lime/5 via-transparent to-brand-teal/5" />
        <div className="flex flex-col gap-1 relative z-10">
          <span className="text-[10px] font-heading font-black text-brand-lime uppercase tracking-wider bg-brand-lime/10 px-2 py-0.5 rounded w-fit">
            {locale === "pt-br" ? "ZONAS CARDÍACAS" : "HEART RATE ZONES"}
          </span>
          <p className="text-[11px] text-zinc-400 font-medium max-w-[200px] mt-1 leading-normal">
            {locale === "pt-br" ? "Calibrando limites para manter você na zona ativa de queima de gordura." : "Defining thresholds to maintain your metabolic training within the active fat-burn zone."}
          </p>
        </div>

        {/* SVG Dinâmico da Frequência Cardíaca */}
        <svg className="w-32 h-14 relative z-10" viewBox="0 0 120 50" fill="none">
          <path d="M0 25 L30 25 L35 15 L40 35 L45 5 L50 45 L55 20 L60 27 L90 27" stroke="rgba(20,184,166,0.15)" strokeWidth="1.5" />
          <path d="M0 25 L30 25 L35 10 L40 40 L45 0 L50 50 L55 15 L60 25 L120 25" stroke="#bef264" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="45" cy="0" r="3" fill="#14b8a6" />
          <circle cx="50" cy="50" r="3" fill="#14b8a6" />
        </svg>
      </div>

      <div className="flex flex-col gap-1 px-1">
        <div className="flex items-center gap-2">
          <Heart className="w-4 h-4 text-brand-lime animate-pulse" />
          <h2 className="text-sm font-heading font-extrabold text-zinc-100 uppercase tracking-wide">
            {t.quiz.steps.cardioLevel.title}
          </h2>
        </div>
        <p className="text-xs text-zinc-400 leading-relaxed mt-1">
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
  );
}
