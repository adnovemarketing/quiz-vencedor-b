"use client";

import React from "react";
import { useQuizStore } from "@/core/store/quizStore";
import { QuizStep, WaterIntake } from "@/core/types/quiz";
import { OptionCard } from "../OptionCard";
import { useTranslations } from "@/core/i18n/translations";
import { useLocale } from "@/core/i18n/useLocale";
import { Droplet } from "lucide-react";
import { QuestionSideImage } from "@/components/ui/ImageWrapper";

interface StepProps {
  onNext: (nextStep: QuizStep) => void;
}

export function StepWaterIntake({ onNext }: StepProps) {
  const { data, updateData } = useQuizStore();
  const locale = useLocale();
  const t = useTranslations(locale);

  const waterOptions: { value: WaterIntake; label: string; desc: string; emoji: string }[] = [
    { value: "less_1L", label: t.quiz.steps.waterIntake.options["less_1L"].label, desc: t.quiz.steps.waterIntake.options["less_1L"].desc, emoji: "💧" },
    { value: "1_to_2L", label: t.quiz.steps.waterIntake.options["1_to_2L"].label, desc: t.quiz.steps.waterIntake.options["1_to_2L"].desc, emoji: "🥤" },
    { value: "2_to_3L", label: t.quiz.steps.waterIntake.options["2_to_3L"].label, desc: t.quiz.steps.waterIntake.options["2_to_3L"].desc, emoji: "🥛" },
    { value: "more_3L", label: t.quiz.steps.waterIntake.options["more_3L"].label, desc: t.quiz.steps.waterIntake.options["more_3L"].desc, emoji: "🔋" },
  ];

  const handleSelect = (value: WaterIntake) => {
    updateData({ waterIntake: value });
    onNext("daily-activity");
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-center">
      {/* Coluna Esquerda: Texto e Opções */}
      <div className="md:col-span-7 flex flex-col gap-5">
        <div className="text-left md:text-left">
          <div className="flex items-center gap-2">
            <Droplet className="w-4 h-4 text-brand-teal" />
            <h2 className="text-sm font-heading font-extrabold text-zinc-100 uppercase tracking-wide">
              {t.quiz.steps.waterIntake.title}
            </h2>
          </div>
          <p className="text-xs text-zinc-400 leading-relaxed mt-2">
            {t.quiz.steps.waterIntake.subtitle}
          </p>
        </div>

        <div className="flex flex-col gap-2.5 mt-1">
          {waterOptions.map((opt) => (
            <OptionCard
              key={opt.value}
              title={opt.label}
              description={opt.desc}
              emoji={opt.emoji}
              selected={data.waterIntake === opt.value}
              onClick={() => handleSelect(opt.value)}
            />
          ))}
        </div>
      </div>

      {/* Coluna Direita: Ilustração Visual (Layout A) */}
      <div className="md:col-span-5 hidden md:flex items-center justify-center">
        <QuestionSideImage
          src="/assets/images/water-intake.webp"
          alt="Water intake metabolic boost"
          fileName="images/water-intake.webp"
          placeholderText={locale === "pt-br" ? "Pessoa bebendo água ativamente" : "Person drinking water actively"}
          aiPrompt="A premium high-fidelity visual of a sports water bottle with water drops splashing, glowing cyan highlights, clean gym/fitness setting, realistic, 3D style."
          fallbackSvg={
            <div className="flex flex-col items-center justify-center p-4">
              <svg className="w-36 h-36 relative z-10 drop-shadow-[0_0_20px_rgba(20,184,166,0.15)]" viewBox="0 0 100 100" fill="none">
                {/* Garrafa / Recipiente de Água */}
                <rect x="38" y="25" width="24" height="55" rx="6" stroke="#14b8a6" strokeWidth="2.5" fill="#09090b" />
                <rect x="44" y="16" width="12" height="9" rx="2" stroke="#14b8a6" strokeWidth="2" fill="#09090b" />
                
                {/* Nível de Água (Glow) */}
                <rect x="41" y="45" width="18" height="32" rx="3" fill="rgba(20,184,166,0.2)" />
                
                {/* Linha Metade */}
                <line x1="38" y1="52" x2="62" y2="52" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
                
                {/* Gotas de Água Flutuantes */}
                <path d="M 50 10 Q 47 15 50 17 Q 53 15 50 10 Z" fill="#14b8a6" stroke="#bef264" strokeWidth="0.5" />
                <path d="M 28 35 Q 26 39 28 41 Q 30 39 28 35 Z" fill="#14b8a6" opacity="0.6" />
                <path d="M 72 45 Q 70 49 72 51 Q 74 49 72 45 Z" fill="#14b8a6" opacity="0.6" />
              </svg>
              <span className="text-[10px] font-heading font-black text-brand-teal uppercase tracking-widest mt-4 relative z-10">
                {locale === "pt-br" ? "OTIMIZAÇÃO METABÓLICA" : "METABOLIC BOOST"}
              </span>
              <span className="text-[9px] text-zinc-500 font-medium text-center max-w-[120px] mt-1 relative z-10 leading-normal">
                {locale === "pt-br" ? "Água acelera a queima calórica em 30%" : "Water boosts caloric oxidation by 30%"}
              </span>
            </div>
          }
        />
      </div>
    </div>
  );
}
