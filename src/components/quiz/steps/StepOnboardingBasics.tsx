"use client";

import React from "react";
import { useQuizStore } from "@/core/store/quizStore";
import { PrimaryGoal, QuizStep } from "@/core/types/quiz";
import { OptionCard } from "../OptionCard";
import { useTranslations } from "@/core/i18n/translations";
import { useLocale } from "@/core/i18n/useLocale";
import { Flame, Heart, Calendar, Brain, Activity } from "lucide-react";
import { QuestionSideImage } from "@/components/ui/ImageWrapper";

interface StepProps {
  onNext: (nextStep: QuizStep) => void;
}

export function StepOnboardingBasics({ onNext }: StepProps) {
  const { data, updateData } = useQuizStore();
  const locale = useLocale();
  const t = useTranslations(locale);

  const options: { value: PrimaryGoal; title: string; description: string; icon: React.ReactNode }[] = [
    {
      value: "weight_loss",
      title: t.quiz.steps.onboardingBasics.weightLoss.title,
      description: t.quiz.steps.onboardingBasics.weightLoss.desc,
      icon: <Flame className="w-5 h-5" />,
    },
    {
      value: "cardio_endurance",
      title: t.quiz.steps.onboardingBasics.cardioEndurance.title,
      description: t.quiz.steps.onboardingBasics.cardioEndurance.desc,
      icon: <Activity className="w-5 h-5" />,
    },
    {
      value: "consistency",
      title: t.quiz.steps.onboardingBasics.consistency.title,
      description: t.quiz.steps.onboardingBasics.consistency.desc,
      icon: <Calendar className="w-5 h-5" />,
    },
    {
      value: "stress_relief",
      title: t.quiz.steps.onboardingBasics.stressRelief.title,
      description: t.quiz.steps.onboardingBasics.stressRelief.desc,
      icon: <Brain className="w-5 h-5" />,
    },
    {
      value: "general_health",
      title: t.quiz.steps.onboardingBasics.generalHealth.title,
      description: t.quiz.steps.onboardingBasics.generalHealth.desc,
      icon: <Heart className="w-5 h-5" />,
    },
  ];

  const handleSelect = (val: PrimaryGoal) => {
    updateData({ primaryGoal: val });
    onNext("age-selection");
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-center">
      {/* Coluna Esquerda: Conteúdo e Opções */}
      <div className="md:col-span-7 flex flex-col gap-5">
        <div className="text-left md:text-left">
          <span className="text-[10px] tracking-widest text-brand-lime font-heading font-extrabold uppercase bg-brand-lime/10 px-3 py-1 rounded-full">
            {t.quiz.steps.onboardingBasics.badge}
          </span>
          <h2 className="text-xl md:text-2xl font-heading font-extrabold text-zinc-50 mt-3 leading-tight uppercase">
            {t.quiz.steps.onboardingBasics.title}
          </h2>
          <p className="text-xs text-zinc-400 mt-2">
            {t.quiz.steps.onboardingBasics.subtitle}
          </p>
        </div>

        <div className="flex flex-col gap-3 mt-1">
          {options.map((opt) => (
            <OptionCard
              key={opt.value}
              title={opt.title}
              description={opt.description}
              icon={opt.icon}
              selected={data.primaryGoal === opt.value}
              onClick={() => handleSelect(opt.value)}
            />
          ))}
        </div>
      </div>

      {/* Coluna Direita: Ilustração Visual (Layout A) */}
      <div className="md:col-span-5 hidden md:flex items-center justify-center">
        <QuestionSideImage
          src="/assets/images/hero-walking-group.webp"
          alt="Treadmill walking group"
          fileName="images/hero-walking-group.webp"
          placeholderText={locale === "pt-br" ? "Grupo de pessoas caminhando na esteira" : "Group of people walking on treadmills"}
          aiPrompt="High-end photorealistic scene of athletic people in premium fitness wear walking briskly on modern treadmills in a brightly lit gym, transparent background, studio lighting, detailed."
          fallbackSvg={
            <div className="flex flex-col items-center justify-center p-4">
              <svg className="w-40 h-40 relative z-10 drop-shadow-[0_0_25px_rgba(190,242,100,0.15)]" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="limeTealGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#bef264" />
                    <stop offset="100%" stopColor="#14b8a6" />
                  </linearGradient>
                  <radialGradient id="glowGrad" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#bef264" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#bef264" stopOpacity="0" />
                  </radialGradient>
                </defs>
                
                {/* Círculo de Brilho de Fundo */}
                <circle cx="100" cy="100" r="80" fill="url(#glowGrad)" />

                {/* Anéis de Meta Metálicos */}
                <circle cx="100" cy="100" r="70" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                <circle cx="100" cy="100" r="55" stroke="rgba(255,255,255,0.05)" strokeWidth="1" strokeDasharray="5 5" />
                
                {/* Arco Progresso Principal */}
                <path d="M 100 30 A 70 70 0 1 1 50 150" stroke="url(#limeTealGrad)" strokeWidth="4" strokeLinecap="round" strokeDasharray="300" strokeDashoffset="50" className="animate-[spin_40s_linear_infinite] origin-center" style={{ transformOrigin: '100px 100px' }} />
                
                {/* Círculo Central com Símbolo de Alvo */}
                <circle cx="100" cy="100" r="40" fill="#09090b" stroke="#18181b" strokeWidth="2" />
                
                {/* Alvo - Círculos e Linhas de Precisão */}
                <circle cx="100" cy="100" r="28" stroke="#14b8a6" strokeWidth="1.5" strokeOpacity="0.3" />
                <circle cx="100" cy="100" r="16" stroke="#bef264" strokeWidth="2" strokeOpacity="0.8" />
                <circle cx="100" cy="100" r="6" fill="#bef264" />
                
                {/* Retículos de Mira */}
                <line x1="100" y1="50" x2="100" y2="60" stroke="#14b8a6" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="100" y1="140" x2="100" y2="150" stroke="#14b8a6" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="50" y1="100" x2="60" y2="100" stroke="#14b8a6" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="140" y1="100" x2="150" y2="100" stroke="#14b8a6" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <span className="text-[10px] font-heading font-black text-brand-lime uppercase tracking-widest mt-4 relative z-10">
                {locale === "pt-br" ? "MÉTODO CALIBRADO" : "CALIBRATED METHOD"}
              </span>
              <span className="text-[9px] text-zinc-500 font-medium text-center max-w-[120px] mt-1 relative z-10 leading-normal">
                {locale === "pt-br" ? "Metas calculadas biologicamente" : "Goals biologically calculated"}
              </span>
            </div>
          }
        />
      </div>
    </div>
  );
}
