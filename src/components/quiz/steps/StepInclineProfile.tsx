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
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-center">
      {/* Coluna Esquerda: Texto e Opções */}
      <div className="md:col-span-7 flex flex-col gap-5">
        <div className="text-left md:text-left">
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

        <div className="flex flex-col gap-3 mt-1">
          <OptionCard
            title={t.quiz.steps.inclineProfile.yes.label}
            description={t.quiz.steps.inclineProfile.yes.desc}
            icon={<TrendingUp className="w-5 h-5 text-brand-lime" />}
            selected={data.hasInclineAccess === true}
            onClick={() => handleSelect(true)}
          />
          <OptionCard
            title={t.quiz.steps.inclineProfile.no.label}
            description={t.quiz.steps.inclineProfile.no.desc}
            icon={<TrendingUp className="w-5 h-5 rotate-90 text-zinc-600" />}
            selected={data.hasInclineAccess === false}
            onClick={() => handleSelect(false)}
          />
        </div>
      </div>

      {/* Coluna Direita: Ilustração de Inclinação (Layout D) */}
      <div className="md:col-span-5 hidden md:flex flex-col items-center justify-center p-4 bg-zinc-950/40 rounded-2xl border border-zinc-900/60 aspect-square relative overflow-hidden group select-none">
        <div className="absolute inset-0 bg-gradient-to-tr from-brand-lime/5 via-transparent to-brand-teal/5 opacity-80" />
        <svg className="w-36 h-36 relative z-10 drop-shadow-[0_0_20px_rgba(190,242,100,0.1)]" viewBox="0 0 100 100" fill="none">
          {/* Base e Colunas da Esteira */}
          <rect x="15" y="70" width="70" height="6" rx="3" fill="#18181b" stroke="#27272a" strokeWidth="1.5" />
          <line x1="25" y1="70" x2="25" y2="35" stroke="#27272a" strokeWidth="3" strokeLinecap="round" />
          <line x1="25" y1="35" x2="38" y2="33" stroke="#27272a" strokeWidth="3" strokeLinecap="round" />
          
          {/* Deck com Angulação de Inclinação (Animação de Eixo) */}
          <g className="origin-[25px_70px]">
            {/* Linha Plana */}
            <line x1="25" y1="70" x2="80" y2="70" stroke="rgba(255,255,255,0.05)" strokeWidth="3" strokeDasharray="3 3" />
            
            {/* Linha de Inclinação Elevada */}
            <line x1="25" y1="70" x2="78" y2="45" stroke="#bef264" strokeWidth="4.5" strokeLinecap="round" />
            
            {/* Indicador de Ângulo de Arco */}
            <path d="M 60 70 A 35 35 0 0 0 58 54" stroke="#14b8a6" strokeWidth="2" strokeDasharray="2 2" />
            
            {/* Ponto Articulação */}
            <circle cx="25" cy="70" r="4" fill="#09090b" stroke="#bef264" strokeWidth="2" />
            
            {/* Badge de Ângulo 12% */}
            <rect x="62" y="30" width="22" height="13" rx="4" fill="rgba(20,184,166,0.1)" stroke="#14b8a6" strokeWidth="1" />
            <text x="73" y="39" fill="#14b8a6" fontSize="7" fontWeight="black" textAnchor="middle">12%</text>
          </g>
        </svg>
        <span className="text-[10px] font-heading font-black text-brand-lime uppercase tracking-widest mt-4 relative z-10">
          {locale === "pt-br" ? "MÉTODO DE INCLINAÇÃO" : "INCLINE WALKING"}
        </span>
        <span className="text-[9px] text-zinc-500 font-medium text-center max-w-[120px] mt-1 relative z-10 leading-normal">
          {locale === "pt-br" ? "Queima até 60% mais calorias" : "Burns up to 60% more calories"}
        </span>
      </div>
    </div>
  );
}
