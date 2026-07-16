"use client";

import React from "react";
import { useQuizStore } from "@/core/store/quizStore";
import { QuizStep, ImportantEvent } from "@/core/types/quiz";
import { OptionCard } from "../OptionCard";
import { useTranslations } from "@/core/i18n/translations";
import { useLocale } from "@/core/i18n/useLocale";
import { CalendarHeart } from "lucide-react";
import { OptionImage } from "@/components/ui/ImageWrapper";

interface StepProps {
  onNext: (nextStep: QuizStep) => void;
}

export function StepImportantEvent({ onNext }: StepProps) {
  const { data, updateData } = useQuizStore();
  const locale = useLocale();
  const t = useTranslations(locale);

  const eventOptions: { value: ImportantEvent; label: string; desc: string; image: React.ReactNode }[] = [
    { 
      value: "wedding", 
      label: t.quiz.steps.importantEvent.options["wedding"].label, 
      desc: t.quiz.steps.importantEvent.options["wedding"].desc,
      image: (
        <OptionImage
          src="/assets/testimonials/event-wedding.webp"
          alt="Wedding event preparation"
          fileName="testimonials/event-wedding.webp"
          placeholderText={locale === "pt-br" ? "Preparação para Casamento" : "Wedding day prep"}
          aiPrompt="Close-up of a happy couple holding hands, wedding rings, stylish elegant styling, high class premium photorealistic photo."
          fallbackSvg={
            <svg className="w-16 h-16 text-brand-lime opacity-80" viewBox="0 0 100 100" fill="none">
              <circle cx="42" cy="50" r="15" stroke="currentColor" strokeWidth="2.5" />
              <circle cx="58" cy="50" r="15" stroke="#14b8a6" strokeWidth="2.5" />
              <path d="M42 35 C45 32, 55 32, 58 35" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          }
        />
      )
    },
    { 
      value: "vacation", 
      label: t.quiz.steps.importantEvent.options["vacation"].label, 
      desc: t.quiz.steps.importantEvent.options["vacation"].desc,
      image: (
        <OptionImage
          src="/assets/testimonials/event-vacation.webp"
          alt="Vacation beach trip"
          fileName="testimonials/event-vacation.webp"
          placeholderText={locale === "pt-br" ? "Viagem ou Férias" : "Vacation or Beach trip"}
          aiPrompt="A sunny paradise beach scene with turquoise ocean waves and palm tree leaves, cozy vacation aesthetic, realistic."
          fallbackSvg={
            <svg className="w-16 h-16 text-brand-lime opacity-80" viewBox="0 0 100 100" fill="none">
              <path d="M50 80 C50 60, 40 40, 20 38 M50 80 C50 60, 60 40, 80 38" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M20 38 Q 40 32 50 35 Q 60 32 80 38" stroke="#14b8a6" strokeWidth="2" />
              <circle cx="50" cy="22" r="8" fill="#bef264" />
            </svg>
          }
        />
      )
    },
    { 
      value: "birthday", 
      label: t.quiz.steps.importantEvent.options["birthday"].label, 
      desc: t.quiz.steps.importantEvent.options["birthday"].desc,
      image: (
        <OptionImage
          src="/assets/testimonials/event-birthday.webp"
          alt="Birthday celebration goal"
          fileName="testimonials/event-birthday.webp"
          placeholderText={locale === "pt-br" ? "Aniversário ou Celebração" : "Birthday Celebration"}
          aiPrompt="Elegant minimalist close-up of a single lit candle on a premium dark gourmet chocolate cupcake, soft glow bokeh lighting."
          fallbackSvg={
            <svg className="w-16 h-16 text-brand-lime opacity-80" viewBox="0 0 100 100" fill="none">
              <rect x="30" y="55" width="40" height="25" rx="4" fill="#09090b" stroke="currentColor" strokeWidth="2.5" />
              <line x1="50" y1="55" x2="50" y2="42" stroke="currentColor" strokeWidth="2" />
              <path d="M 50 42 C 48 38 52 35 50 30 C 48 35 52 38 50 42 Z" fill="#bef264" stroke="#14b8a6" strokeWidth="0.5" />
            </svg>
          }
        />
      )
    },
    { 
      value: "health_goal", 
      label: t.quiz.steps.importantEvent.options["health_goal"].label, 
      desc: t.quiz.steps.importantEvent.options["health_goal"].desc,
      image: (
        <OptionImage
          src="/assets/testimonials/event-health.webp"
          alt="Health and physical longevity goal"
          fileName="testimonials/event-health.webp"
          placeholderText={locale === "pt-br" ? "Melhoria de Saúde Física" : "Health and Vitality Improvement"}
          aiPrompt="Heart rate monitor dashboard showing high cardiovascular score or active medical checkup chart showing optimal health levels, dark mode, glowing green."
          fallbackSvg={
            <svg className="w-16 h-16 text-brand-lime opacity-80" viewBox="0 0 100 100" fill="none">
              <path d="M35 30 V50 C35 60, 65 60, 65 50 V30" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M50 58 V78 H65" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M44 26 C41 22, 35 22, 32 26 C29 30, 32 38, 44 44 C56 38, 59 30, 56 26 C53 22, 47 22, 44 26 Z" fill="#14b8a6" opacity="0.8" />
            </svg>
          }
        />
      )
    },
    { 
      value: "no_specific_date", 
      label: t.quiz.steps.importantEvent.options["no_specific_date"].label, 
      desc: t.quiz.steps.importantEvent.options["no_specific_date"].desc,
      image: (
        <OptionImage
          src="/assets/testimonials/event-fitness.webp"
          alt="General fitness improvement target"
          fileName="testimonials/event-fitness.webp"
          placeholderText={locale === "pt-br" ? "Melhoria Geral / Sem Data Fixa" : "General Fitness Improvement / No Date"}
          aiPrompt="Minimalist glowing target board with a arrow hitting the bullseye in neon lime and brand teal colors, professional look."
          fallbackSvg={
            <svg className="w-16 h-16 text-brand-lime opacity-80" viewBox="0 0 100 100" fill="none">
              <circle cx="50" cy="50" r="22" stroke="currentColor" strokeWidth="2" />
              <circle cx="50" cy="50" r="12" stroke="#14b8a6" strokeWidth="2.5" />
              <circle cx="50" cy="50" r="4" fill="#bef264" />
              <path d="M25 75 L45 55" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M40 55 H45 V60" stroke="currentColor" strokeWidth="2" />
            </svg>
          }
        />
      )
    },
  ];

  const handleSelect = (value: ImportantEvent) => {
    updateData({ importantEvent: value });
    onNext("mindset-blockers");
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="text-left md:text-center px-1">
        <div className="flex items-center md:justify-center gap-2">
          <CalendarHeart className="w-4 h-4 text-brand-lime" />
          <h2 className="text-sm font-heading font-extrabold text-zinc-100 uppercase tracking-wide">
            {t.quiz.steps.importantEvent.title}
          </h2>
        </div>
        <p className="text-xs text-zinc-400 leading-relaxed mt-2">
          {t.quiz.steps.importantEvent.subtitle}
        </p>
      </div>

      {/* Grid de Cards de Evento */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mt-1">
        {eventOptions.map((opt, idx) => (
          <div key={opt.value} className={idx >= 3 ? "md:col-span-1 md:first-of-type:col-start-1" : ""}>
            <OptionCard
              title={opt.label}
              description={opt.desc}
              image={opt.image}
              selected={data.importantEvent === opt.value}
              onClick={() => handleSelect(opt.value)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
