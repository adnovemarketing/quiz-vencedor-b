"use client";

import React from "react";
import { useQuizStore } from "@/core/store/quizStore";
import { QuizStep, JobActivity } from "@/core/types/quiz";
import { OptionCard } from "../OptionCard";
import { useTranslations } from "@/core/i18n/translations";
import { useLocale } from "@/core/i18n/useLocale";
import { Briefcase } from "lucide-react";

interface StepProps {
  onNext: (nextStep: QuizStep) => void;
}

export function StepDailyActivity({ onNext }: StepProps) {
  const { data, updateData } = useQuizStore();
  const locale = useLocale();
  const t = useTranslations(locale);

  const activityOptions: { value: JobActivity; label: string; desc: string; emoji: string }[] = [
    { value: "sedentary", label: t.quiz.steps.dailyActivity.options["sedentary"].label, desc: t.quiz.steps.dailyActivity.options["sedentary"].desc, emoji: "🖥️" },
    { value: "light_movement", label: t.quiz.steps.dailyActivity.options["light_movement"].label, desc: t.quiz.steps.dailyActivity.options["light_movement"].desc, emoji: "🚶" },
    { value: "moderate", label: t.quiz.steps.dailyActivity.options["moderate"].label, desc: t.quiz.steps.dailyActivity.options["moderate"].desc, emoji: "🏃" },
    { value: "very_active", label: t.quiz.steps.dailyActivity.options["very_active"].label, desc: t.quiz.steps.dailyActivity.options["very_active"].desc, emoji: "🏋️" },
  ];

  const handleSelect = (value: JobActivity) => {
    updateData({ jobActivity: value });
    onNext("daily-nutrition");
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Imagem/Ilustração Superior (Layout B) */}
      <div className="w-full h-28 bg-zinc-950/40 rounded-2xl border border-zinc-900/60 overflow-hidden relative flex items-center justify-between p-6 select-none">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-lime/5 via-transparent to-brand-teal/5" />
        <div className="flex flex-col gap-1 relative z-10">
          <span className="text-[10px] font-heading font-black text-brand-lime uppercase tracking-wider bg-brand-lime/10 px-2 py-0.5 rounded w-fit">
            {locale === "pt-br" ? "NÍVEL DE ATIVIDADE DIÁRIA" : "DAILY MOVEMENT LEVEL"}
          </span>
          <p className="text-[11px] text-zinc-400 font-medium max-w-[200px] mt-1 leading-normal">
            {locale === "pt-br" ? "A atividade diária (NEAT) determina sua taxa metabólica base antes dos treinos." : "Physical daily activity sets your baseline metabolic output before structured walks."}
          </p>
        </div>

        {/* SVG Dinâmico do Nível de Movimento */}
        <svg className="w-32 h-14 relative z-10" viewBox="0 0 100 50" fill="none">
          {/* Barras de Energia */}
          <rect x="10" y="38" width="12" height="12" rx="3" fill="#14b8a6" fillOpacity="0.2" stroke="#14b8a6" strokeWidth="1" />
          <rect x="30" y="28" width="12" height="22" rx="3" fill="#14b8a6" fillOpacity="0.4" stroke="#14b8a6" strokeWidth="1" />
          <rect x="50" y="18" width="12" height="32" rx="3" fill="#bef264" fillOpacity="0.6" stroke="#bef264" strokeWidth="1" />
          <rect x="70" y="8" width="12" height="42" rx="3" fill="#bef264" stroke="#bef264" strokeWidth="1.5" />
          
          {/* Linha Tendência Seta */}
          <path d="M 5 45 L 85 10" stroke="#bef264" strokeWidth="2" strokeDasharray="3 3" />
        </svg>
      </div>

      <div className="flex flex-col gap-1 px-1">
        <div className="flex items-center gap-2">
          <Briefcase className="w-4 h-4 text-brand-lime" />
          <h2 className="text-sm font-heading font-extrabold text-zinc-100 uppercase tracking-wide">
            {t.quiz.steps.dailyActivity.title}
          </h2>
        </div>
        <p className="text-xs text-zinc-400 leading-relaxed mt-1">
          {t.quiz.steps.dailyActivity.subtitle}
        </p>
      </div>

      {/* Grid de Opções 2x2 no Desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-1">
        {activityOptions.map((opt) => (
          <OptionCard
            key={opt.value}
            title={opt.label}
            description={opt.desc}
            emoji={opt.emoji}
            selected={data.jobActivity === opt.value}
            onClick={() => handleSelect(opt.value)}
          />
        ))}
      </div>
    </div>
  );
}
