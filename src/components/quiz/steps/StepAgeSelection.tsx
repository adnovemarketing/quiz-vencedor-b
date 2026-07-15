"use client";

import React from "react";
import { useQuizStore } from "@/core/store/quizStore";
import { QuizStep, AgeGroup } from "@/core/types/quiz";
import { OptionCard } from "../OptionCard";
import { useTranslations } from "@/core/i18n/translations";
import { useLocale } from "@/core/i18n/useLocale";
import { Calendar, Activity, Zap, Shield, Heart, ShieldAlert } from "lucide-react";

interface StepProps {
  onNext: (nextStep: QuizStep) => void;
}

export function StepAgeSelection({ onNext }: StepProps) {
  const { data, updateData } = useQuizStore();
  const locale = useLocale();
  const t = useTranslations(locale);

  const ageOptions: { value: AgeGroup; label: string; desc: string; icon: React.ReactNode }[] = [
    { 
      value: "18_24", 
      label: t.quiz.steps.ageSelection.options["18_24"].label, 
      desc: t.quiz.steps.ageSelection.options["18_24"].desc,
      icon: <Activity className="w-4 h-4 text-brand-lime" />
    },
    { 
      value: "25_34", 
      label: t.quiz.steps.ageSelection.options["25_34"].label, 
      desc: t.quiz.steps.ageSelection.options["25_34"].desc,
      icon: <Zap className="w-4 h-4 text-brand-lime" />
    },
    { 
      value: "35_44", 
      label: t.quiz.steps.ageSelection.options["35_44"].label, 
      desc: t.quiz.steps.ageSelection.options["35_44"].desc,
      icon: <Shield className="w-4 h-4 text-brand-lime" />
    },
    { 
      value: "45_54", 
      label: t.quiz.steps.ageSelection.options["45_54"].label, 
      desc: t.quiz.steps.ageSelection.options["45_54"].desc,
      icon: <Heart className="w-4 h-4 text-brand-lime" />
    },
    { 
      value: "55_plus", 
      label: t.quiz.steps.ageSelection.options["55_plus"].label, 
      desc: t.quiz.steps.ageSelection.options["55_plus"].desc,
      icon: <ShieldAlert className="w-4 h-4 text-brand-lime" />
    },
  ];

  const handleSelect = (value: AgeGroup) => {
    updateData({ ageGroup: value });
    onNext("gender-selection");
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Imagem/Ilustração Superior (Layout B) */}
      <div className="w-full h-28 bg-zinc-950/40 rounded-2xl border border-zinc-900/60 overflow-hidden relative flex items-center justify-between p-6 select-none">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-lime/5 via-transparent to-brand-teal/5" />
        <div className="flex flex-col gap-1 relative z-10">
          <span className="text-[10px] font-heading font-black text-brand-lime uppercase tracking-wider bg-brand-lime/10 px-2 py-0.5 rounded w-fit">
            {locale === "pt-br" ? "METABOLISMO & IDADE" : "AGE & METABOLISM"}
          </span>
          <p className="text-[11px] text-zinc-400 font-medium max-w-[200px] mt-1 leading-normal">
            {locale === "pt-br" ? "Ajustando intensidade com base na sua curva de recuperação biológica." : "Calibrating intensity thresholds according to your biological recovery curve."}
          </p>
        </div>

        {/* SVG Dinâmico da Curva de Recuperação */}
        <svg className="w-36 h-16 relative z-10" viewBox="0 0 150 60" fill="none">
          <path d="M10 50 C40 45, 60 15, 90 20 C110 23, 130 35, 140 40" stroke="rgba(190,242,100,0.15)" strokeWidth="2" strokeDasharray="3 3" />
          <path d="M10 50 C40 35, 60 10, 90 15 C110 18, 130 10, 140 5" stroke="#bef264" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="90" cy="15" r="4" fill="#14b8a6" stroke="#09090b" strokeWidth="1.5" />
          <circle cx="10" cy="50" r="3" fill="#bef264" />
          <circle cx="140" cy="5" r="3" fill="#bef264" />
        </svg>
      </div>

      <div className="flex flex-col gap-1 px-1">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-brand-lime" />
          <h2 className="text-sm font-heading font-extrabold text-zinc-100 uppercase tracking-wide">
            {t.quiz.steps.ageSelection.title}
          </h2>
        </div>
        <p className="text-xs text-zinc-400 leading-relaxed mt-1">
          {t.quiz.steps.ageSelection.subtitle}
        </p>
      </div>

      {/* Grid de Opções para evitar aspecto "vazio" */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-1">
        {ageOptions.map((opt) => (
          <div key={opt.value} className={opt.value === "55_plus" ? "sm:col-span-2" : ""}>
            <OptionCard
              title={opt.label}
              description={opt.desc}
              icon={opt.icon}
              selected={data.ageGroup === opt.value}
              onClick={() => handleSelect(opt.value)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
