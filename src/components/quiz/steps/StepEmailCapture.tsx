"use client";

import React, { useState } from "react";
import { useQuizStore } from "@/core/store/quizStore";
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
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-center">
      {/* Coluna Esquerda: Texto e Input */}
      <div className="md:col-span-7 flex flex-col gap-6">
        <div className="text-left md:text-left">
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

        <div className="flex flex-col gap-4 mt-1">
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
            <p className="text-xs text-red-500 font-semibold bg-red-500/10 p-3 rounded-lg border border-red-500/20 text-center animate-shake">
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
            "w-full font-heading font-bold text-sm tracking-wide py-6 rounded-2xl transition-all cursor-pointer",
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

      {/* Coluna Direita: Mockup do Relatório de PDF no Smartphone (Layout A) */}
      <div className="md:col-span-5 hidden md:flex flex-col items-center justify-center p-4 bg-zinc-950/40 rounded-2xl border border-zinc-900/60 aspect-square relative overflow-hidden group select-none">
        <div className="absolute inset-0 bg-gradient-to-tr from-brand-lime/5 via-transparent to-brand-teal/5 opacity-80" />
        <svg className="w-36 h-48 relative z-10 drop-shadow-[0_15px_30px_rgba(0,0,0,0.5)]" viewBox="0 0 100 130" fill="none">
          {/* Corpo do Celular */}
          <rect x="20" y="5" width="60" height="120" rx="10" fill="#09090b" stroke="#18181b" strokeWidth="4" />
          {/* Tela Interna */}
          <rect x="23" y="8" width="54" height="114" rx="8" fill="#18181b" />
          
          {/* Header do App do Celular */}
          <rect x="23" y="8" width="54" height="18" rx="0" fill="#09090b" />
          <circle cx="50" cy="14" r="1.5" fill="#bef264" />
          
          {/* Símbolo App */}
          <text x="50" y="22" fill="#fff" fontSize="3" fontWeight="bold" textAnchor="middle" letterSpacing="0.5">THE TREADMILL METHOD</text>

          {/* Gráfico do Report Interno */}
          <rect x="28" y="32" width="44" height="28" rx="4" fill="#09090b" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
          
          {/* Pequena Curva */}
          <path d="M 32 52 Q 50 42 68 38" stroke="#bef264" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="68" cy="38" r="1.5" fill="#14b8a6" />

          {/* Linhas de Texto Simuladas */}
          <rect x="28" y="66" width="30" height="2.5" rx="1" fill="rgba(255,255,255,0.1)" />
          <rect x="28" y="72" width="44" height="2" rx="1" fill="rgba(255,255,255,0.05)" />
          <rect x="28" y="76" width="40" height="2" rx="1" fill="rgba(255,255,255,0.05)" />
          <rect x="28" y="80" width="35" height="2" rx="1" fill="rgba(255,255,255,0.05)" />

          {/* Botão de Liberação mock */}
          <rect x="28" y="90" width="44" height="8" rx="3" fill="#bef264" />
          <rect x="36" y="93" width="28" height="2" rx="1" fill="#09090b" />

          {/* Selo Garantia flutuante de fundo */}
          <circle cx="75" cy="100" r="14" fill="#14b8a6" fillOpacity="0.9" stroke="#09090b" strokeWidth="2" />
          <text x="75" y="103" fill="#09090b" fontSize="6.5" fontWeight="black" textAnchor="middle">100%</text>
        </svg>
        <span className="text-[10px] font-heading font-black text-brand-lime uppercase tracking-widest mt-4 relative z-10">
          {locale === "pt-br" ? "ACESSO INSTANTÂNEO" : "INSTANT DELIVERY"}
        </span>
        <span className="text-[9px] text-zinc-500 font-medium text-center max-w-[120px] mt-1 relative z-10 leading-normal">
          {locale === "pt-br" ? "Receba seu relatório detalhado em segundos" : "Personal plan sent straight to your inbox"}
        </span>
      </div>
    </div>
  );
}
