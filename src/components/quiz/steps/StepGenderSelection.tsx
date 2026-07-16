"use client";

import React from "react";
import { useQuizStore } from "@/core/store/quizStore";
import { QuizStep, BiomechanicsGender } from "@/core/types/quiz";
import { OptionCard } from "../OptionCard";
import { useTranslations } from "@/core/i18n/translations";
import { useLocale } from "@/core/i18n/useLocale";
import { OptionImage } from "@/components/ui/ImageWrapper";

interface StepProps {
  onNext: (nextStep: QuizStep) => void;
}

export function StepGenderSelection({ onNext }: StepProps) {
  const { data, updateData } = useQuizStore();
  const locale = useLocale();
  const t = useTranslations(locale);

  const options: { value: BiomechanicsGender; title: string; description: string; image: React.ReactNode }[] = [
    {
      value: "female",
      title: t.quiz.steps.genderSelection.female.label,
      description: t.quiz.steps.genderSelection.female.desc,
      image: (
        <OptionImage
          src="/assets/images/female-30-39.webp"
          alt="Female biomechanics"
          fileName="images/female-30-39.webp"
          placeholderText={locale === "pt-br" ? "Silhueta Biomecânica Feminina" : "Female Biomechanical Silhouette"}
          aiPrompt="Minimalist premium white vector line drawing of a female athletic runner silhouette, transparent background, glowing teal highlights, dark style."
          fallbackSvg={
            <svg className="w-20 h-20 text-brand-lime opacity-80" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="30" r="10" stroke="currentColor" strokeWidth="2.5" />
              <path d="M50 40 V70 M40 85 L50 70 L60 85 M35 52 H65" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M38 52 C38 45, 62 45, 62 52" stroke="#14b8a6" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          }
        />
      ),
    },
    {
      value: "male",
      title: t.quiz.steps.genderSelection.male.label,
      description: t.quiz.steps.genderSelection.male.desc,
      image: (
        <OptionImage
          src="/assets/images/male-40-49.webp"
          alt="Male biomechanics"
          fileName="images/male-40-49.webp"
          placeholderText={locale === "pt-br" ? "Silhueta Biomecânica Masculina" : "Male Biomechanical Silhouette"}
          aiPrompt="Minimalist premium white vector line drawing of a male athletic runner silhouette, transparent background, glowing teal highlights, dark style."
          fallbackSvg={
            <svg className="w-20 h-20 text-brand-lime opacity-80" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="30" r="10" stroke="currentColor" strokeWidth="2.5" />
              <path d="M50 40 V70 M40 85 L50 70 L60 85 M30 48 H70" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              <line x1="30" y1="48" x2="33" y2="60" stroke="#14b8a6" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="70" y1="48" x2="67" y2="60" stroke="#14b8a6" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          }
        />
      ),
    },
    {
      value: "other",
      title: t.quiz.steps.genderSelection.other.label,
      description: t.quiz.steps.genderSelection.other.desc,
      image: (
        <OptionImage
          src="/assets/images/body-type-01.webp"
          alt="Neutral biomechanics"
          fileName="images/body-type-01.webp"
          placeholderText={locale === "pt-br" ? "Metabolismo Neutro / Outro" : "Neutral Metabolism / Other"}
          aiPrompt="Minimalist premium abstract line drawing representing human bio-energy and metabolism cells, transparent background, glowing lime highlights, dark style."
          fallbackSvg={
            <svg className="w-20 h-20 text-brand-lime opacity-80" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="18" stroke="currentColor" strokeWidth="2" strokeDasharray="3 3" />
              <circle cx="50" cy="50" r="10" stroke="#14b8a6" strokeWidth="2.5" />
              <path d="M50 15 V32 M50 68 V85 M15 50 H32 M68 50 H85" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <circle cx="50" cy="15" r="3" fill="currentColor" />
              <circle cx="50" cy="85" r="3" fill="currentColor" />
              <circle cx="15" cy="50" r="3" fill="#14b8a6" />
              <circle cx="85" cy="50" r="3" fill="#14b8a6" />
            </svg>
          }
        />
      ),
    },
  ];

  const handleSelect = (val: BiomechanicsGender) => {
    updateData({ biomechanicsGender: val });
    onNext("treadmill-frequency");
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="text-center">
        <span className="text-[10px] tracking-widest text-brand-lime font-heading font-extrabold uppercase bg-brand-lime/10 px-3 py-1 rounded-full">
          {t.quiz.steps.genderSelection.badge}
        </span>
        <h2 className="text-xl md:text-2xl font-heading font-extrabold text-zinc-50 mt-3 leading-tight uppercase">
          {t.quiz.steps.genderSelection.title}
        </h2>
        <p className="text-xs text-zinc-400 mt-2">
          {t.quiz.steps.genderSelection.subtitle}
        </p>
      </div>

      {/* Grid horizontal no desktop para Layout C */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
        {options.map((opt) => (
          <OptionCard
            key={opt.value}
            title={opt.title}
            description={opt.description}
            image={opt.image}
            selected={data.biomechanicsGender === opt.value}
            onClick={() => handleSelect(opt.value)}
          />
        ))}
      </div>
    </div>
  );
}
