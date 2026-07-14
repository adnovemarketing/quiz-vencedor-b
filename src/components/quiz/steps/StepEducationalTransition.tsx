"use client";

import React from "react";
import { QuizStep } from "@/core/types/quiz";
import { Button } from "@/components/ui/button";
import { useTranslations } from "@/core/i18n/translations";
import { useLocale } from "@/core/i18n/useLocale";
import { Award, ShieldCheck, Zap } from "lucide-react";

interface StepProps {
  onNext: (nextStep: QuizStep) => void;
}

export function StepEducationalTransition({ onNext }: StepProps) {
  const locale = useLocale();
  const t = useTranslations(locale);

  return (
    <div className="flex flex-col gap-6">
      <div className="text-center">
        <span className="text-[10px] tracking-widest text-brand-lime font-heading font-extrabold uppercase bg-brand-lime/10 px-3 py-1 rounded-full">
          {t.transitions.educational.badge}
        </span>
        <h2 className="text-xl md:text-2xl font-heading font-extrabold text-zinc-50 mt-3 leading-tight uppercase">
          {t.transitions.educational.title}
        </h2>
      </div>

      {/* Box do Gráfico de Zona Aeróbica */}
      <div className="bg-zinc-950 border border-zinc-800 p-5 rounded-2xl flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <Zap className="w-5 h-5 text-brand-lime" />
          <h3 className="text-xs font-bold font-heading text-zinc-100 tracking-wider">
            {t.transitions.educational.scientificBase}
          </h3>
        </div>
        <p className="text-xs text-zinc-400 leading-relaxed">
          {t.transitions.educational.fatBurningZone}
        </p>

        {/* Citação Científica */}
        <div className="border-l-2 border-brand-teal pl-4 py-1.5 mt-2 bg-brand-teal/5 rounded-r-xl">
          <p className="text-[11px] italic text-zinc-300 leading-relaxed">
            &ldquo;{t.transitions.educational.harvardQuote}&rdquo;
          </p>
        </div>
      </div>

      {/* Vantagens Ativas */}
      <div className="grid grid-cols-1 gap-3">
        <div className="flex items-start gap-3.5 bg-zinc-900/40 p-4 rounded-xl border border-zinc-900">
          <ShieldCheck className="w-5 h-5 text-brand-teal mt-0.5" />
          <div>
            <h4 className="text-xs font-bold text-zinc-200">{t.transitions.educational.aerobicCapacities}</h4>
            <p className="text-[11px] text-zinc-400 mt-0.5 leading-relaxed">
              {locale === "pt-br" 
                ? "O amortecimento da esteira aliado ao plano de caminhada protege seus joelhos e coluna de impactos secos."
                : "Treadmill deck cushioning aligned with the custom walking protocol shields knees and lower back from harsh impact."}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3.5 bg-zinc-900/40 p-4 rounded-xl border border-zinc-900">
          <Award className="w-5 h-5 text-brand-lime mt-0.5" />
          <div>
            <h4 className="text-xs font-bold text-zinc-200">{t.transitions.educational.metabolismBoost}</h4>
            <p className="text-[11px] text-zinc-400 mt-0.5 leading-relaxed">
              {locale === "pt-br"
                ? "Ajuste de esforço baseado na sua resposta cardíaca atual para ganho de fôlego sustentável."
                : "Effort levels calibrated according to your current heart response for steady and sustainable stamina gains."}
            </p>
          </div>
        </div>
      </div>

      <Button
        onClick={() => onNext("loading-calculation")}
        className="w-full mt-2 bg-brand-lime text-zinc-950 hover:bg-brand-lime-hover font-heading font-bold text-sm tracking-wide py-6 rounded-2xl transition-all cursor-pointer"
      >
        {t.transitions.educational.cta}
      </Button>
    </div>
  );
}
