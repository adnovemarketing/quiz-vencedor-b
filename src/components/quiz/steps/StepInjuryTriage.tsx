"use client";

import React from "react";
import { useQuizStore } from "@/core/store/quizStore";
import { QuizStep } from "@/core/types/quiz";
import { OptionCard } from "../OptionCard";
import { Button } from "@/components/ui/button";
import { useTranslations } from "@/core/i18n/translations";
import { useLocale } from "@/core/i18n/useLocale";
import { QuestionHeroImage } from "@/components/ui/ImageWrapper";

interface StepProps {
  onNext: (nextStep: QuizStep) => void;
}

export function StepInjuryTriage({ onNext }: StepProps) {
  const { data, updateData } = useQuizStore();
  const locale = useLocale();
  const t = useTranslations(locale);
  const { jointSensitivities } = data;

  const handleToggle = (key: keyof typeof jointSensitivities) => {
    if (key === "none") {
      updateData({
        jointSensitivities: {
          knees: false,
          ankles: false,
          lowerBack: false,
          none: true,
        },
      });
    } else {
      updateData({
        jointSensitivities: {
          ...jointSensitivities,
          [key]: !jointSensitivities[key],
          none: false,
        },
      });
    }
  };

  const handleNext = () => {
    const hasAnyActive = Object.values(useQuizStore.getState().data.jointSensitivities).some(v => v);
    if (!hasAnyActive) {
      updateData({
        jointSensitivities: {
          knees: false,
          ankles: false,
          lowerBack: false,
          none: true,
        },
      });
    }
    onNext("sleep-quality");
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Imagem/Ilustração Superior (Layout B) */}
      <QuestionHeroImage
        src="/assets/placeholders/injury-triage.webp"
        alt="Joint protection posture schema"
        fileName="placeholders/injury-triage.webp"
        placeholderText={locale === "pt-br" ? "Mapeamento anatômico de articulações e lombar" : "Anatomical mapping of joints & lumbar protection"}
        aiPrompt="A premium high-tech glowing 3D anatomical silhouette model of a human walking, with highlighted alert rings on lower back, knees, and ankles, fitness science style."
        fallbackSvg={
          <div className="w-full h-full flex items-center justify-between p-6 select-none relative">
            <div className="absolute inset-0 bg-gradient-to-r from-brand-lime/5 via-transparent to-brand-teal/5" />
            <div className="flex flex-col gap-1 relative z-10 text-left">
              <span className="text-[10px] font-heading font-black text-brand-lime uppercase tracking-wider bg-brand-lime/10 px-2 py-0.5 rounded w-fit">
                {locale === "pt-br" ? "PROTEÇÃO ARTICULAR" : "JOINT PROTECTION"}
              </span>
              <p className="text-[11px] text-zinc-400 font-medium max-w-[200px] mt-1 leading-normal">
                {locale === "pt-br" ? "Mapeamos áreas sensíveis para adaptar a velocidade de subida e evitar impactos." : "Modifying incline and deck compression algorithms to secure sensitive joint structures."}
              </p>
            </div>
            {/* SVG Silhueta Corporal com Articulações */}
            <svg className="w-24 h-24 relative z-10 text-zinc-600" viewBox="0 0 100 100" fill="none">
              {/* Silhueta Humana */}
              <path d="M50 12 C53 12, 55 10, 55 7 C55 4, 53 2, 50 2 C47 2, 45 4, 45 7 C45 10, 47 12, 50 12 Z M50 14 C44 14, 38 18, 38 25 V45 H44 V80 H47 V98 H53 V80 H56 V45 H62 V25 C62 18, 56 14, 50 14 Z" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
              
              {/* Marcador Coluna/Lombar */}
              <circle cx="50" cy="36" r="3.5" stroke="#14b8a6" strokeWidth="1.5" fill="#09090b" className="animate-pulse" />
              <line x1="50" y1="36" x2="68" y2="36" stroke="#14b8a6" strokeWidth="1" strokeDasharray="2 2" />
              <text x="72" y="39" fill="#14b8a6" fontSize="7" fontWeight="bold">Lombar</text>

              {/* Marcador Joelhos */}
              <circle cx="44" cy="62" r="3.5" stroke="#bef264" strokeWidth="1.5" fill="#09090b" />
              <circle cx="56" cy="62" r="3.5" stroke="#bef264" strokeWidth="1.5" fill="#09090b" />
              <line x1="56" y1="62" x2="72" y2="62" stroke="#bef264" strokeWidth="1" strokeDasharray="2 2" />
              <text x="76" y="65" fill="#bef264" fontSize="7" fontWeight="bold">Joelho</text>

              {/* Marcador Tornozelo */}
              <circle cx="47" cy="90" r="3" stroke="#14b8a6" strokeWidth="1.5" fill="#09090b" />
              <circle cx="53" cy="90" r="3" stroke="#14b8a6" strokeWidth="1.5" fill="#09090b" />
            </svg>
          </div>
        }
      />

      <div className="flex flex-col gap-1 px-1">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-heading font-extrabold text-zinc-100 uppercase tracking-wide">
            {t.quiz.steps.injuryTriage.title}
          </h2>
        </div>
        <p className="text-xs text-zinc-400 leading-relaxed mt-1">
          {t.quiz.steps.injuryTriage.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-1">
        <OptionCard
          title={t.quiz.steps.injuryTriage.knees.title}
          description={t.quiz.steps.injuryTriage.knees.desc}
          emoji="🦵"
          selected={jointSensitivities.knees}
          onClick={() => handleToggle("knees")}
          multiSelect
        />
        <OptionCard
          title={t.quiz.steps.injuryTriage.ankles.title}
          description={t.quiz.steps.injuryTriage.ankles.desc}
          emoji="👟"
          selected={jointSensitivities.ankles}
          onClick={() => handleToggle("ankles")}
          multiSelect
        />
        <OptionCard
          title={t.quiz.steps.injuryTriage.lowerBack.title}
          description={t.quiz.steps.injuryTriage.lowerBack.desc}
          emoji="🧘"
          selected={jointSensitivities.lowerBack}
          onClick={() => handleToggle("lowerBack")}
          multiSelect
        />
        <OptionCard
          title={t.quiz.steps.injuryTriage.none.title}
          description={t.quiz.steps.injuryTriage.none.desc}
          emoji="💪"
          selected={jointSensitivities.none}
          onClick={() => handleToggle("none")}
          multiSelect
        />
      </div>

      <Button
        onClick={handleNext}
        className="w-full mt-4 bg-brand-lime text-zinc-950 hover:bg-brand-lime-hover font-heading font-bold text-sm tracking-wide py-6 rounded-2xl transition-all cursor-pointer"
      >
        {t.quiz.steps.injuryTriage.cta}
      </Button>
    </div>
  );
}
