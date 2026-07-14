import React from "react";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";
import { useTranslations } from "@/core/i18n/translations";
import { useLocale } from "@/core/i18n/useLocale";
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  activeDotIndex: number; // 0 a 4
  onBack?: () => void;
  onForward?: () => void;
  showProgress?: boolean; // Se false, oculta a barra (usado em relatórios/checkout)
}

export function ProgressBar({
  activeDotIndex,
  onBack,
  onForward,
  showProgress = true,
}: ProgressBarProps) {
  const locale = useLocale();
  const t = useTranslations(locale);

  if (!showProgress) return null;

  const totalDots = 5;

  return (
    <div className="w-full max-w-md mx-auto px-4 py-6 flex items-center justify-between gap-4 select-none">
      {/* Botão Voltar */}
      <div className="w-8 h-8 flex items-center justify-center">
        {onBack && (
          <button
            onClick={onBack}
            className="w-8 h-8 flex items-center justify-center rounded-full border border-zinc-800 text-zinc-400 hover:text-zinc-50 hover:border-zinc-700 bg-zinc-950 active:scale-95 transition-all cursor-pointer"
            aria-label={t.common.back}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Linha de progresso com círculos */}
      <div className="flex-1 flex items-center justify-between relative px-2">
        {/* Linha de fundo (inativa) */}
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-zinc-800 -translate-y-1/2 z-0" />

        {/* Linha ativa (preenchimento proporcional) */}
        <div
          className="absolute top-1/2 left-0 h-0.5 bg-brand-lime -translate-y-1/2 z-0 transition-all duration-300 ease-in-out"
          style={{
            width: `${(activeDotIndex / (totalDots - 1)) * 100}%`,
          }}
        />

        {/* Dots do progresso */}
        {Array.from({ length: totalDots }).map((_, index) => {
          const isCompleted = index < activeDotIndex;
          const isActive = index === activeDotIndex;

          return (
            <div
              key={index}
              className={cn(
                "w-6 h-6 rounded-full flex items-center justify-center z-10 transition-all duration-300",
                isCompleted
                  ? "bg-brand-lime text-zinc-950 scale-100"
                  : isActive
                  ? "bg-zinc-950 border-2 border-brand-lime text-brand-lime scale-110 shadow-lg shadow-lime-400/20"
                  : "bg-zinc-900 border-2 border-zinc-800 text-zinc-600"
              )}
            >
              {isCompleted ? (
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              ) : (
                <span className="text-[10px] font-bold font-heading">
                  {index + 1}
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Botão Avançar Rápido */}
      <div className="w-8 h-8 flex items-center justify-center">
        {onForward && (
          <button
            onClick={onForward}
            className="w-8 h-8 flex items-center justify-center rounded-full border border-zinc-800 text-zinc-400 hover:text-zinc-50 hover:border-zinc-700 bg-zinc-950 active:scale-95 transition-all cursor-pointer"
            aria-label={locale === "pt-br" ? "Avançar rápido" : "Fast forward"}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
