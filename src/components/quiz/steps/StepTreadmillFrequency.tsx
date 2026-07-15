"use client";

import React from "react";
import { useQuizStore } from "@/core/store/quizStore";
import { QuizStep, WeeklyAccess } from "@/core/types/quiz";
import { OptionCard } from "../OptionCard";
import { useTranslations } from "@/core/i18n/translations";
import { useLocale } from "@/core/i18n/useLocale";
import { CalendarRange } from "lucide-react";

interface StepProps {
  onNext: (nextStep: QuizStep) => void;
}

export function StepTreadmillFrequency({ onNext }: StepProps) {
  const { data, updateData } = useQuizStore();
  const locale = useLocale();
  const t = useTranslations(locale);

  const options: { value: WeeklyAccess; title: string; description: string; icon: React.ReactNode }[] = [
    {
      value: "1_2_days",
      title: t.quiz.steps.treadmillFrequency.oneTwo.label,
      description: t.quiz.steps.treadmillFrequency.oneTwo.desc,
      icon: <CalendarRange className="w-5 h-5 text-zinc-400" />,
    },
    {
      value: "3_4_days",
      title: t.quiz.steps.treadmillFrequency.threeFour.label,
      description: t.quiz.steps.treadmillFrequency.threeFour.desc,
      icon: <CalendarRange className="w-5 h-5 text-brand-lime" />,
    },
    {
      value: "5_plus_days",
      title: t.quiz.steps.treadmillFrequency.fivePlus.label,
      description: t.quiz.steps.treadmillFrequency.fivePlus.desc,
      icon: <CalendarRange className="w-5 h-5 text-brand-teal" />,
    },
    {
      value: "no_access_yet",
      title: t.quiz.steps.treadmillFrequency.noneYet.label,
      description: t.quiz.steps.treadmillFrequency.noneYet.desc,
      icon: <CalendarRange className="w-5 h-5 text-zinc-600" />,
    },
  ];

  const handleSelect = (val: WeeklyAccess) => {
    updateData({ weeklyAccess: val });
    onNext("cardio-level");
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-center">
      {/* Coluna Esquerda: Conteúdo e Opções */}
      <div className="md:col-span-7 flex flex-col gap-5">
        <div className="text-left md:text-left">
          <span className="text-[10px] tracking-widest text-brand-lime font-heading font-extrabold uppercase bg-brand-lime/10 px-3 py-1 rounded-full">
            {t.quiz.steps.treadmillFrequency.badge}
          </span>
          <h2 className="text-xl md:text-2xl font-heading font-extrabold text-zinc-50 mt-3 leading-tight uppercase">
            {t.quiz.steps.treadmillFrequency.title}
          </h2>
          <p className="text-xs text-zinc-400 mt-2">
            {t.quiz.steps.treadmillFrequency.subtitle}
          </p>
        </div>

        <div className="flex flex-col gap-3 mt-1">
          {options.map((opt) => (
            <OptionCard
              key={opt.value}
              title={opt.title}
              description={opt.description}
              icon={opt.icon}
              selected={data.weeklyAccess === opt.value}
              onClick={() => handleSelect(opt.value)}
            />
          ))}
        </div>
      </div>

      {/* Coluna Direita: Ilustração Visual (Layout A) */}
      <div className="md:col-span-5 hidden md:flex flex-col items-center justify-center p-4 bg-zinc-950/40 rounded-2xl border border-zinc-900/60 aspect-square relative overflow-hidden group select-none">
        <div className="absolute inset-0 bg-gradient-to-tr from-brand-lime/5 via-transparent to-brand-teal/5 opacity-80" />
        <svg className="w-40 h-40 relative z-10 drop-shadow-[0_0_25px_rgba(20,184,166,0.1)]" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="frequencyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#bef264" />
              <stop offset="100%" stopColor="#14b8a6" />
            </linearGradient>
          </defs>

          {/* Calendário Base Grid */}
          <rect x="30" y="40" width="140" height="120" rx="12" fill="#09090b" stroke="#18181b" strokeWidth="2.5" />
          {/* Header do Calendário */}
          <rect x="30" y="40" width="140" height="28" rx="12" fill="url(#frequencyGrad)" strokeWidth="0" />
          
          {/* Furos Espiral do Calendário */}
          <circle cx="55" cy="40" r="3" fill="#09090b" />
          <circle cx="85" cy="40" r="3" fill="#09090b" />
          <circle cx="115" cy="40" r="3" fill="#09090b" />
          <circle cx="145" cy="40" r="3" fill="#09090b" />

          {/* Linhas de Texto do Calendário (Header) */}
          <line x1="55" y1="54" x2="145" y2="54" stroke="#09090b" strokeWidth="3" strokeLinecap="round" strokeOpacity="0.4" />

          {/* Grid de Dias */}
          {/* Semana 1 */}
          <rect x="45" y="80" width="22" height="20" rx="4" fill="#18181b" stroke="#27272a" strokeWidth="1" />
          <rect x="75" y="80" width="22" height="20" rx="4" fill="rgba(20,184,166,0.1)" stroke="#14b8a6" strokeWidth="1.5" />
          <rect x="105" y="80" width="22" height="20" rx="4" fill="#18181b" stroke="#27272a" strokeWidth="1" />
          <rect x="135" y="80" width="22" height="20" rx="4" fill="rgba(190,242,100,0.1)" stroke="#bef264" strokeWidth="1.5" />

          {/* Semana 2 */}
          <rect x="45" y="110" width="22" height="20" rx="4" fill="#18181b" stroke="#27272a" strokeWidth="1" />
          <rect x="75" y="110" width="22" height="20" rx="4" fill="rgba(190,242,100,0.1)" stroke="#bef264" strokeWidth="1.5" />
          <rect x="105" y="110" width="22" height="20" rx="4" fill="#18181b" stroke="#27272a" strokeWidth="1" />
          <rect x="135" y="110" width="22" height="20" rx="4" fill="rgba(20,184,166,0.1)" stroke="#14b8a6" strokeWidth="1.5" />

          {/* Marcadores Check de Dias Ativos */}
          <path d="M 81 90 L 85 94 L 91 86" stroke="#14b8a6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M 141 90 L 145 94 L 151 86" stroke="#bef264" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M 81 120 L 85 124 L 91 116" stroke="#bef264" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M 141 120 L 145 124 L 151 116" stroke="#14b8a6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="text-[10px] font-heading font-black text-brand-teal uppercase tracking-widest mt-4 relative z-10">
          {locale === "pt-br" ? "ROTEIRO SEMANAL" : "WEEKLY PATHWAY"}
        </span>
        <span className="text-[9px] text-zinc-500 font-medium text-center max-w-[120px] mt-1 relative z-10 leading-normal">
          {locale === "pt-br" ? "Consistência supera intensidade" : "Consistency beats intensity"}
        </span>
      </div>
    </div>
  );
}
