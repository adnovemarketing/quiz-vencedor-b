"use client";

import React from "react";
import { useQuizStore } from "@/core/store/quizStore";
import { QuizStep, MainBlocker } from "@/core/types/quiz";
import { OptionCard } from "../OptionCard";
import { useTranslations } from "@/core/i18n/translations";
import { useLocale } from "@/core/i18n/useLocale";
import { ShieldAlert } from "lucide-react";
import { QuestionSideImage } from "@/components/ui/ImageWrapper";

interface StepProps {
  onNext: (nextStep: QuizStep) => void;
}

export function StepMindsetBlockers({ onNext }: StepProps) {
  const { data, updateData } = useQuizStore();
  const locale = useLocale();
  const t = useTranslations(locale);

  const options: { value: MainBlocker; title: string; description: string; emoji: string }[] = [
    {
      value: "boredom",
      title: t.quiz.steps.mindsetBlockers.boredom.label,
      description: t.quiz.steps.mindsetBlockers.boredom.desc,
      emoji: "🥱",
    },
    {
      value: "time_constraint",
      title: t.quiz.steps.mindsetBlockers.timeConstraint.label,
      description: t.quiz.steps.mindsetBlockers.timeConstraint.desc,
      emoji: "⏱️",
    },
    {
      value: "joint_pain",
      title: t.quiz.steps.mindsetBlockers.jointPain.label,
      description: t.quiz.steps.mindsetBlockers.jointPain.desc,
      emoji: "🤕",
    },
    {
      value: "lack_of_guidance",
      title: t.quiz.steps.mindsetBlockers.lackGuidance.label,
      description: t.quiz.steps.mindsetBlockers.lackGuidance.desc,
      emoji: "🤷",
    },
    {
      value: "none",
      title: t.quiz.steps.mindsetBlockers.none.label,
      description: t.quiz.steps.mindsetBlockers.none.desc,
      emoji: "🔥",
    },
  ];

  const handleSelect = (val: MainBlocker) => {
    updateData({ mainBlocker: val });
    onNext("educational-transition");
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-center">
      {/* Coluna Esquerda: Texto e Opções */}
      <div className="md:col-span-7 flex flex-col gap-5">
        <div className="text-left md:text-left">
          <span className="text-[10px] tracking-widest text-brand-lime font-heading font-extrabold uppercase bg-brand-lime/10 px-3 py-1 rounded-full">
            {t.quiz.steps.mindsetBlockers.badge}
          </span>
          <h2 className="text-xl md:text-2xl font-heading font-extrabold text-zinc-50 mt-3 leading-tight uppercase flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-brand-lime shrink-0" />
            {t.quiz.steps.mindsetBlockers.title}
          </h2>
          <p className="text-xs text-zinc-400 mt-2">
            {t.quiz.steps.mindsetBlockers.subtitle}
          </p>
        </div>

        <div className="flex flex-col gap-3 mt-1">
          {options.map((opt) => (
            <OptionCard
              key={opt.value}
              title={opt.title}
              description={opt.description}
              emoji={opt.emoji}
              selected={data.mainBlocker === opt.value}
              onClick={() => handleSelect(opt.value)}
            />
          ))}
        </div>
      </div>

      {/* Coluna Direita: Ilustração Visual (Layout A) */}
      <div className="md:col-span-5 hidden md:flex items-center justify-center">
        <QuestionSideImage
          src="/assets/placeholders/mindset-blockers.webp"
          alt="Overcoming mindset physical blocks"
          fileName="placeholders/mindset-blockers.webp"
          placeholderText={locale === "pt-br" ? "Pessoa superando limites de treino" : "Person overcoming training mental/time blocks"}
          aiPrompt="A powerful cinematic vector-style image of a runner breaking through a glass barrier, stylized action shot, bright neon green accents, dark background."
          fallbackSvg={
            <div className="flex flex-col items-center justify-center p-4">
              <svg className="w-36 h-36 relative z-10 drop-shadow-[0_0_20px_rgba(190,242,100,0.1)]" viewBox="0 0 100 100" fill="none">
                {/* Símbolo de Escudo / Quebra */}
                <path d="M 50 15 C 30 15, 25 25, 25 45 C 25 70, 50 90, 50 90 C 50 90, 75 70, 75 45 C 75 25, 70 15, 50 15 Z" stroke="#14b8a6" strokeWidth="2.5" fill="#09090b" />
                
                {/* Cadeado Aberto (Metáfora de Superar Bloqueios) */}
                <rect x="42" y="50" width="16" height="12" rx="2" fill="#bef264" />
                <path d="M 45 50 V 42 C 45 37, 55 37, 55 42" stroke="#bef264" strokeWidth="2" strokeLinecap="round" />
                
                {/* Raio de Energia de Rompimento */}
                <path d="M 50 25 L 47 38 H 53 L 50 48" stroke="#14b8a6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="text-[10px] font-heading font-black text-brand-lime uppercase tracking-widest mt-4 relative z-10">
                {locale === "pt-br" ? "MINDFULNESS ATIVO" : "MINDSET BLUEPRINT"}
              </span>
              <span className="text-[9px] text-zinc-500 font-medium text-center max-w-[120px] mt-1 relative z-10 leading-normal">
                {locale === "pt-br" ? "Estratégias sob medida contra o tédio e a dor" : "Tailored routines built to beat daily boredom"}
              </span>
            </div>
          }
        />
      </div>
    </div>
  );
}
