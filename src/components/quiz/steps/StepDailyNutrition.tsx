"use client";

import React from "react";
import { useQuizStore } from "@/core/store/quizStore";
import { QuizStep, NutritionBaseline } from "@/core/types/quiz";
import { OptionCard } from "../OptionCard";
import { useTranslations } from "@/core/i18n/translations";
import { useLocale } from "@/core/i18n/useLocale";
import { Apple } from "lucide-react";

interface StepProps {
  onNext: (nextStep: QuizStep) => void;
}

export function StepDailyNutrition({ onNext }: StepProps) {
  const { data, updateData } = useQuizStore();
  const locale = useLocale();
  const t = useTranslations(locale);

  const options: { value: NutritionBaseline; title: string; description: string; emoji: string }[] = [
    {
      value: "balanced",
      title: t.quiz.steps.dailyNutrition.balanced.label,
      description: t.quiz.steps.dailyNutrition.balanced.desc,
      emoji: "🥗",
    },
    {
      value: "carbs_heavy",
      title: t.quiz.steps.dailyNutrition.carbsHeavy.label,
      description: t.quiz.steps.dailyNutrition.carbsHeavy.desc,
      emoji: "🍞",
    },
    {
      value: "low_carb_keto",
      title: t.quiz.steps.dailyNutrition.lowCarb.label,
      description: t.quiz.steps.dailyNutrition.lowCarb.desc,
      emoji: "🥑",
    },
    {
      value: "unstructured",
      title: t.quiz.steps.dailyNutrition.unstructured.label,
      description: t.quiz.steps.dailyNutrition.unstructured.desc,
      emoji: "🍕",
    },
  ];

  const handleSelect = (val: NutritionBaseline) => {
    updateData({ nutritionBaseline: val });
    onNext("antropometria");
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-center">
      {/* Coluna Esquerda: Texto e Opções */}
      <div className="md:col-span-7 flex flex-col gap-5">
        <div className="text-left md:text-left">
          <span className="text-[10px] tracking-widest text-brand-lime font-heading font-extrabold uppercase bg-brand-lime/10 px-3 py-1 rounded-full">
            {t.quiz.steps.dailyNutrition.badge}
          </span>
          <h2 className="text-xl md:text-2xl font-heading font-extrabold text-zinc-50 mt-3 leading-tight uppercase flex items-center gap-2">
            <Apple className="w-5 h-5 text-brand-lime shrink-0" />
            {t.quiz.steps.dailyNutrition.title}
          </h2>
          <p className="text-xs text-zinc-400 mt-2">
            {t.quiz.steps.dailyNutrition.subtitle}
          </p>
        </div>

        <div className="flex flex-col gap-3 mt-1">
          {options.map((opt) => (
            <OptionCard
              key={opt.value}
              title={opt.title}
              description={opt.description}
              emoji={opt.emoji}
              selected={data.nutritionBaseline === opt.value}
              onClick={() => handleSelect(opt.value)}
            />
          ))}
        </div>
      </div>

      {/* Coluna Direita: Ilustração Visual (Layout A) */}
      <div className="md:col-span-5 hidden md:flex flex-col items-center justify-center p-4 bg-zinc-950/40 rounded-2xl border border-zinc-900/60 aspect-square relative overflow-hidden group select-none">
        <div className="absolute inset-0 bg-gradient-to-tr from-brand-lime/5 via-transparent to-brand-teal/5 opacity-80" />
        <svg className="w-36 h-36 relative z-10 drop-shadow-[0_0_20px_rgba(190,242,100,0.1)]" viewBox="0 0 100 100" fill="none">
          {/* Círculo Gráfico Macro */}
          <circle cx="50" cy="46" r="30" stroke="rgba(255,255,255,0.03)" strokeWidth="8" />
          
          {/* Fatias Macros */}
          {/* Carbs */}
          <circle cx="50" cy="46" r="30" stroke="#bef264" strokeWidth="6" strokeDasharray="188" strokeDashoffset="60" strokeLinecap="round" />
          {/* Proteins */}
          <circle cx="50" cy="46" r="30" stroke="#14b8a6" strokeWidth="6" strokeDasharray="188" strokeDashoffset="130" strokeLinecap="round" className="origin-center rotate-[110deg]" style={{ transformOrigin: '50px 46px' }} />
          {/* Fats */}
          <circle cx="50" cy="46" r="30" stroke="#27272a" strokeWidth="4" strokeDasharray="188" strokeDashoffset="170" strokeLinecap="round" className="origin-center rotate-[220deg]" style={{ transformOrigin: '50px 46px' }} />
          
          {/* Ícone Apple Central */}
          <g transform="translate(42, 38)">
            <path d="M12 2 C11.5 2, 9.5 3.5, 9 4.5 C8.5 3.5, 6.5 2, 6 2 C4 2, 2 4.5, 2 8.5 C2 13.5, 6 17.5, 9 17.5 C12 17.5, 16 13.5, 16 8.5 C16 4.5, 14 2, 12 2 Z" fill="#09090b" stroke="#bef264" strokeWidth="1.5" />
            <path d="M9 1 V3.5" stroke="#bef264" strokeWidth="1.5" strokeLinecap="round" />
          </g>
        </svg>
        <span className="text-[10px] font-heading font-black text-brand-lime uppercase tracking-widest mt-4 relative z-10">
          {locale === "pt-br" ? "MÉTODO METABÓLICO" : "METABOLIC TIMING"}
        </span>
        <span className="text-[9px] text-zinc-500 font-medium text-center max-w-[120px] mt-1 relative z-10 leading-normal">
          {locale === "pt-br" ? "Combustível calibrado para queima máxima" : "Fuel aligned with target walk intervals"}
        </span>
      </div>
    </div>
  );
}
