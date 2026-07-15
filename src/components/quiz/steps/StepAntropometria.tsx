"use client";

import React, { useState } from "react";
import { useQuizStore } from "@/core/store/quizStore";
import { QuizStep } from "@/core/types/quiz";
import { Button } from "@/components/ui/button";
import { useTranslations } from "@/core/i18n/translations";
import { useLocale } from "@/core/i18n/useLocale";
import { cn } from "@/lib/utils";

interface StepProps {
  onNext: (nextStep: QuizStep) => void;
}

export function StepAntropometria({ onNext }: StepProps) {
  const { data, updateData } = useQuizStore();
  const locale = useLocale();
  const t = useTranslations(locale);

  const [heightUnit, setHeightUnit] = useState<"cm" | "ft">(data.heightUnit || "cm");
  const [weightUnit, setWeightUnit] = useState<"kg" | "lb">(data.weightUnit || "kg");

  const [height, setHeight] = useState<string>(data.height ? String(data.height) : "");
  const [weight, setWeight] = useState<string>(data.weight ? String(data.weight) : "");
  const [targetWeight, setTargetWeight] = useState<string>(data.targetWeight ? String(data.targetWeight) : "");

  const [error, setError] = useState<string | null>(null);

  // Validação simples de campos
  const isValid = () => {
    const hVal = parseFloat(height);
    const wVal = parseFloat(weight);
    const tVal = parseFloat(targetWeight);

    if (isNaN(hVal) || isNaN(wVal) || isNaN(tVal)) return false;

    // Limites de segurança física
    if (heightUnit === "cm") {
      if (hVal < 100 || hVal > 250) return false;
    } else {
      if (hVal < 3 || hVal > 8) return false;
    }

    if (weightUnit === "kg") {
      if (wVal < 30 || wVal > 250) return false;
      if (tVal < 30 || tVal > 250) return false;
    } else {
      if (wVal < 65 || wVal > 550) return false;
      if (tVal < 65 || tVal > 550) return false;
    }

    return true;
  };

  const handleNext = () => {
    if (!isValid()) {
      setError(t.quiz.steps.antropometria.errorInvalid);
      return;
    }

    setError(null);
    updateData({
      heightUnit,
      weightUnit,
      height: parseFloat(height),
      weight: parseFloat(weight),
      targetWeight: parseFloat(targetWeight),
    });

    onNext("important-event");
  };

  // Conversões ao mudar unidades
  const toggleHeightUnit = (unit: "cm" | "ft") => {
    if (unit === heightUnit) return;
    setHeightUnit(unit);
    const val = parseFloat(height);
    if (!isNaN(val)) {
      if (unit === "ft") {
        setHeight((val / 30.48).toFixed(1));
      } else {
        setHeight(Math.round(val * 30.48).toString());
      }
    }
  };

  const toggleWeightUnit = (unit: "kg" | "lb") => {
    if (unit === weightUnit) return;
    setWeightUnit(unit);
    const wVal = parseFloat(weight);
    const tVal = parseFloat(targetWeight);
    if (!isNaN(wVal)) {
      if (unit === "lb") {
        setWeight(Math.round(wVal * 2.20462).toString());
      } else {
        setWeight(Math.round(wVal / 2.20462).toString());
      }
    }
    if (!isNaN(tVal)) {
      if (unit === "lb") {
        setTargetWeight(Math.round(tVal * 2.20462).toString());
      } else {
        setTargetWeight(Math.round(tVal / 2.20462).toString());
      }
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-center">
      {/* Coluna Esquerda: Texto e Inputs */}
      <div className="md:col-span-7 flex flex-col gap-5">
        <div className="text-left md:text-left">
          <span className="text-[10px] tracking-widest text-brand-lime font-heading font-extrabold uppercase bg-brand-lime/10 px-3 py-1 rounded-full">
            {t.quiz.steps.antropometria.badge}
          </span>
          <h2 className="text-xl md:text-2xl font-heading font-extrabold text-zinc-50 mt-3 leading-tight uppercase">
            {t.quiz.steps.antropometria.title}
          </h2>
          <p className="text-xs text-zinc-400 mt-2">
            {t.quiz.steps.antropometria.subtitle}
          </p>
        </div>

        <div className="flex flex-col gap-4 mt-1">
          {/* Altura */}
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center px-1">
              <label className="text-xs font-semibold text-zinc-300">{t.quiz.steps.antropometria.heightLabel}</label>
              <div className="flex bg-zinc-950 p-0.5 rounded-lg border border-zinc-900">
                <button
                  type="button"
                  onClick={() => toggleHeightUnit("cm")}
                  className={cn(
                    "px-2 py-0.5 text-[9px] font-black rounded-md transition-all cursor-pointer",
                    heightUnit === "cm" ? "bg-zinc-900 text-brand-lime" : "text-zinc-500"
                  )}
                >
                  CM
                </button>
                <button
                  type="button"
                  onClick={() => toggleHeightUnit("ft")}
                  className={cn(
                    "px-2 py-0.5 text-[9px] font-black rounded-md transition-all cursor-pointer",
                    heightUnit === "ft" ? "bg-zinc-900 text-brand-lime" : "text-zinc-500"
                  )}
                >
                  FT
                </button>
              </div>
            </div>
            <input
              type="number"
              step="any"
              value={height}
              onChange={(e) => {
                setHeight(e.target.value);
                if (error) setError(null);
              }}
              placeholder={heightUnit === "cm" ? "170" : "5.6"}
              className="w-full bg-zinc-950 border border-zinc-800 focus:border-brand-lime rounded-xl px-4 py-3.5 text-sm text-zinc-100 placeholder:text-zinc-700 focus:outline-none transition-colors animate-[fadeIn_0.3s_ease]"
            />
          </div>

          {/* Peso Atual */}
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center px-1">
              <label className="text-xs font-semibold text-zinc-300">{t.quiz.steps.antropometria.weightLabel}</label>
              <div className="flex bg-zinc-950 p-0.5 rounded-lg border border-zinc-900">
                <button
                  type="button"
                  onClick={() => toggleWeightUnit("kg")}
                  className={cn(
                    "px-2 py-0.5 text-[9px] font-black rounded-md transition-all cursor-pointer",
                    weightUnit === "kg" ? "bg-zinc-900 text-brand-lime" : "text-zinc-500"
                  )}
                >
                  KG
                </button>
                <button
                  type="button"
                  onClick={() => toggleWeightUnit("lb")}
                  className={cn(
                    "px-2 py-0.5 text-[9px] font-black rounded-md transition-all cursor-pointer",
                    weightUnit === "lb" ? "bg-zinc-900 text-brand-lime" : "text-zinc-500"
                  )}
                >
                  LB
                </button>
              </div>
            </div>
            <input
              type="number"
              step="any"
              value={weight}
              onChange={(e) => {
                setWeight(e.target.value);
                if (error) setError(null);
              }}
              placeholder={weightUnit === "kg" ? "75" : "165"}
              className="w-full bg-zinc-950 border border-zinc-800 focus:border-brand-lime rounded-xl px-4 py-3.5 text-sm text-zinc-100 placeholder:text-zinc-700 focus:outline-none transition-colors"
            />
          </div>

          {/* Peso Meta */}
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center px-1">
              <label className="text-xs font-semibold text-zinc-300">{t.quiz.steps.antropometria.targetWeightLabel}</label>
              <span className="text-[9px] font-bold text-zinc-600 uppercase tracking-wide">
                {weightUnit === "kg" ? "KG" : "LB"}
              </span>
            </div>
            <input
              type="number"
              step="any"
              value={targetWeight}
              onChange={(e) => {
                setTargetWeight(e.target.value);
                if (error) setError(null);
              }}
              placeholder={weightUnit === "kg" ? "68" : "150"}
              className="w-full bg-zinc-950 border border-zinc-800 focus:border-brand-lime rounded-xl px-4 py-3.5 text-sm text-zinc-100 placeholder:text-zinc-700 focus:outline-none transition-colors"
            />
          </div>

          {error && (
            <p className="text-xs text-red-500 font-semibold bg-red-500/10 p-3 rounded-lg border border-red-500/20 text-center animate-shake">
              {error}
            </p>
          )}
        </div>

        <Button
          onClick={handleNext}
          className="w-full mt-2 bg-brand-lime text-zinc-950 hover:bg-brand-lime-hover font-heading font-bold text-sm tracking-wide py-6 rounded-2xl transition-all cursor-pointer"
        >
          {t.quiz.steps.antropometria.cta}
        </Button>
      </div>

      {/* Coluna Direita: Ilustração Balança Premium (Layout D) */}
      <div className="md:col-span-5 hidden md:flex flex-col items-center justify-center p-4 bg-zinc-950/40 rounded-2xl border border-zinc-900/60 aspect-square relative overflow-hidden group select-none">
        <div className="absolute inset-0 bg-gradient-to-tr from-brand-lime/5 via-transparent to-brand-teal/5 opacity-80" />
        <svg className="w-36 h-36 relative z-10 drop-shadow-[0_0_20px_rgba(20,184,166,0.1)]" viewBox="0 0 100 100" fill="none">
          {/* Balança de Bioimpedância */}
          <rect x="25" y="25" width="50" height="50" rx="10" fill="#09090b" stroke="#18181b" strokeWidth="3.5" />
          <rect x="25" y="25" width="50" height="50" rx="10" stroke="rgba(255,255,255,0.03)" strokeWidth="1.5" />
          
          {/* Sensores Metálicos */}
          <rect x="30" y="32" width="10" height="36" rx="2" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
          <rect x="60" y="32" width="10" height="36" rx="2" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
          
          {/* Visor Digital */}
          <rect x="42" y="28" width="16" height="8" rx="2" fill="#000" stroke="#18181b" strokeWidth="1" />
          <line x1="45" y1="32" x2="55" y2="32" stroke="#bef264" strokeWidth="2" strokeLinecap="round" className="animate-pulse" />
          
          {/* Grid de Medidas (Luzes Circundantes) */}
          <circle cx="50" cy="50" r="16" stroke="rgba(20,184,166,0.2)" strokeWidth="1" strokeDasharray="3 3" />
          <circle cx="50" cy="50" r="10" stroke="#14b8a6" strokeWidth="1.5" />
        </svg>
        <span className="text-[10px] font-heading font-black text-brand-lime uppercase tracking-widest mt-4 relative z-10">
          {locale === "pt-br" ? "MÉTRICAS EXATAS" : "BODY COMPOSITION"}
        </span>
        <span className="text-[9px] text-zinc-500 font-medium text-center max-w-[120px] mt-1 relative z-10 leading-normal">
          {locale === "pt-br" ? "IMC calculado cientificamente" : "Scientific IMC calculations"}
        </span>
      </div>
    </div>
  );
}
