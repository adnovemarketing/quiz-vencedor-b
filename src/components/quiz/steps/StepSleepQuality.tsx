"use client";

import React from "react";
import { useQuizStore } from "@/core/store/quizStore";
import { QuizStep, SleepDuration } from "@/core/types/quiz";
import { OptionCard } from "../OptionCard";
import { useTranslations } from "@/core/i18n/translations";
import { useLocale } from "@/core/i18n/useLocale";
import { Moon } from "lucide-react";

interface StepProps {
  onNext: (nextStep: QuizStep) => void;
}

export function StepSleepQuality({ onNext }: StepProps) {
  const { data, updateData } = useQuizStore();
  const locale = useLocale();
  const t = useTranslations(locale);

  const sleepOptions: { value: SleepDuration; label: string; desc: string; emoji: string }[] = [
    { value: "less_5h", label: t.quiz.steps.sleepQuality.options["less_5h"].label, desc: t.quiz.steps.sleepQuality.options["less_5h"].desc, emoji: "🥵" },
    { value: "5_to_6h", label: t.quiz.steps.sleepQuality.options["5_to_6h"].label, desc: t.quiz.steps.sleepQuality.options["5_to_6h"].desc, emoji: "🥱" },
    { value: "6_to_7h", label: t.quiz.steps.sleepQuality.options["6_to_7h"].label, desc: t.quiz.steps.sleepQuality.options["6_to_7h"].desc, emoji: "🧘" },
    { value: "7_to_8h", label: t.quiz.steps.sleepQuality.options["7_to_8h"].label, desc: t.quiz.steps.sleepQuality.options["7_to_8h"].desc, emoji: "⚡" },
    { value: "more_8h", label: t.quiz.steps.sleepQuality.options["more_8h"].label, desc: t.quiz.steps.sleepQuality.options["more_8h"].desc, emoji: "💪" },
  ];

  const handleSelect = (value: SleepDuration) => {
    updateData({ sleepDuration: value });
    onNext("water-intake");
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-center">
      {/* Coluna Esquerda: Texto e Opções */}
      <div className="md:col-span-7 flex flex-col gap-5">
        <div className="text-left md:text-left">
          <div className="flex items-center gap-2">
            <Moon className="w-4 h-4 text-brand-lime" />
            <h2 className="text-sm font-heading font-extrabold text-zinc-100 uppercase tracking-wide">
              {t.quiz.steps.sleepQuality.title}
            </h2>
          </div>
          <p className="text-xs text-zinc-400 leading-relaxed mt-2">
            {t.quiz.steps.sleepQuality.subtitle}
          </p>
        </div>

        <div className="flex flex-col gap-2.5 mt-1">
          {sleepOptions.map((opt) => (
            <OptionCard
              key={opt.value}
              title={opt.label}
              description={opt.desc}
              emoji={opt.emoji}
              selected={data.sleepDuration === opt.value}
              onClick={() => handleSelect(opt.value)}
            />
          ))}
        </div>
      </div>

      {/* Coluna Direita: Ilustração Visual (Layout A) */}
      <div className="md:col-span-5 hidden md:flex flex-col items-center justify-center p-4 bg-zinc-950/40 rounded-2xl border border-zinc-900/60 aspect-square relative overflow-hidden group select-none">
        <div className="absolute inset-0 bg-gradient-to-tr from-brand-lime/5 via-transparent to-brand-teal/5 opacity-80" />
        <svg className="w-36 h-36 relative z-10 drop-shadow-[0_0_20px_rgba(20,184,166,0.1)]" viewBox="0 0 100 100" fill="none">
          {/* Círculo da Lua */}
          <path d="M65 30 A20 20 0 0 1 35 55 A22 22 0 1 0 65 30 Z" fill="#bef264" />
          <circle cx="50" cy="50" r="40" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />
          
          {/* Ondas de Sono / Ritmo Circadiano */}
          <path d="M 15 75 Q 32.5 65 50 75 T 85 75" stroke="rgba(20,184,166,0.2)" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M 15 82 Q 32.5 76 50 82 T 85 82" stroke="#14b8a6" strokeWidth="2.5" strokeLinecap="round" />
          
          {/* Estrelas */}
          <circle cx="28" cy="30" r="1.5" fill="#14b8a6" />
          <circle cx="78" cy="62" r="1" fill="#14b8a6" />
          <circle cx="48" cy="22" r="1" fill="#bef264" />
          <circle cx="20" cy="54" r="1" fill="#bef264" />
        </svg>
        <span className="text-[10px] font-heading font-black text-brand-lime uppercase tracking-widest mt-4 relative z-10">
          {locale === "pt-br" ? "MÉTRICAS METABÓLICAS" : "METABOLIC METRICS"}
        </span>
        <span className="text-[9px] text-zinc-500 font-medium text-center max-w-[120px] mt-1 relative z-10 leading-normal">
          {locale === "pt-br" ? "Sono calibra a síntese de proteínas" : "Sleep structures protein synthesis"}
        </span>
      </div>
    </div>
  );
}
