"use client";

import React, { useState } from "react";
import { useQuizStore } from "@/core/store/quizStore";
import { QuizStep } from "@/core/types/quiz";
import { Button } from "@/components/ui/button";
import { useTranslations } from "@/core/i18n/translations";
import { useLocale } from "@/core/i18n/useLocale";
import { Mail, Shield, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export function StepEmailCapture() {
  const { data, updateData } = useQuizStore();
  const locale = useLocale();
  const t = useTranslations(locale);

  const [email, setEmail] = useState(data.email || "");
  const [consent, setConsent] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const validateEmail = (emailStr: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailStr);
  };

  const handleNext = () => {
    if (!validateEmail(email)) {
      setError(t.emailCapture.errorInvalid);
      return;
    }

    setError(null);
    updateData({ email });

    // Envia evento de Analytics (simulado) com parâmetros de i18n
    console.log("Lead captured:", { 
      email, 
      consent,
      locale,
      language_source: "url" 
    });

    // Redireciona o usuário para o Relatório Personalizado (/report)
    router.push(`/${locale}/report`);
  };

  const isValid = validateEmail(email);

  return (
    <div className="flex flex-col gap-6">
      <div className="text-center">
        <span className="text-[10px] tracking-widest text-brand-lime font-heading font-extrabold uppercase bg-brand-lime/10 px-3 py-1 rounded-full">
          {t.emailCapture.badge}
        </span>
        <h2 className="text-xl md:text-2xl font-heading font-extrabold text-zinc-50 mt-3 leading-tight uppercase">
          {t.emailCapture.title}
        </h2>
        <p className="text-xs text-zinc-400 mt-2">
          {t.emailCapture.subtitle}
        </p>
      </div>

      <div className="flex flex-col gap-4 mt-2">
        {/* Input Email */}
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (error) setError(null);
            }}
            placeholder={t.emailCapture.placeholder}
            className="w-full bg-zinc-950 border border-zinc-800 focus:border-brand-lime focus:ring-1 focus:ring-brand-lime rounded-xl pl-12 pr-4 py-4 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none transition-all"
          />
        </div>

        {error && (
          <p className="text-xs text-red-500 font-semibold bg-red-500/10 p-3 rounded-lg border border-red-500/20 text-center">
            {error}
          </p>
        )}

        {/* Consentimento de Marketing */}
        <button
          type="button"
          onClick={() => setConsent(!consent)}
          className="flex items-start gap-3 text-left hover:text-zinc-300 transition-colors p-1"
        >
          <div
            className={cn(
              "w-4 h-4 rounded border flex items-center justify-center transition-all mt-0.5 shrink-0",
              consent
                ? "bg-brand-lime border-brand-lime text-zinc-950"
                : "border-zinc-700 bg-zinc-950"
            )}
          >
            {consent && <Check className="w-3 h-3 stroke-[3]" />}
          </div>
          <span className="text-[10px] text-zinc-400 font-medium leading-relaxed">
            {t.emailCapture.consent}
          </span>
        </button>
      </div>

      {/* Botão de Envio */}
      <Button
        onClick={handleNext}
        disabled={!isValid}
        className={cn(
          "w-full mt-2 font-heading font-bold text-sm tracking-wide py-6 rounded-2xl transition-all cursor-pointer",
          isValid
            ? "bg-brand-lime text-zinc-950 hover:bg-brand-lime-hover"
            : "bg-zinc-800 text-zinc-500 cursor-not-allowed"
        )}
      >
        {t.emailCapture.cta}
      </Button>

      {/* Rodapé de Confiança */}
      <div className="flex items-center justify-center gap-2 text-zinc-600 border-t border-zinc-900/60 pt-4">
        <Shield className="w-3.5 h-3.5" />
        <span className="text-[9px] font-semibold tracking-wide uppercase">
          {locale === "pt-br" ? "POLÍTICA ANTI-SPAM COMPATÍVEL COM LGPD" : "GDPR COMPLIANT ANTI-SPAM POLICY"}
        </span>
      </div>
    </div>
  );
}
