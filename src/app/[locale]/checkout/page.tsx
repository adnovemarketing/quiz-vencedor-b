"use client";

import React, { useState, useEffect } from "react";
import { useQuizStore } from "@/core/store/quizStore";
import { Header } from "@/components/common/Header";
import { Button } from "@/components/ui/button";
import { useTranslations } from "@/core/i18n/translations";
import { getMarketConfig, formatCurrency } from "@/core/i18n/config";
import { useParams } from "next/navigation";
import {
  ShieldCheck,
  CreditCard,
  Lock,
  ChevronDown,
  ChevronUp,
  Star,
  Users,
  CheckCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Componente de FAQ Accordion Unitário
function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-zinc-900 py-3.5">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left text-xs font-semibold text-zinc-200 hover:text-brand-lime transition-colors cursor-pointer select-none"
      >
        <span>{question}</span>
        {isOpen ? (
          <ChevronUp className="w-4 h-4 text-brand-lime shrink-0" />
        ) : (
          <ChevronDown className="w-4 h-4 text-zinc-500 shrink-0" />
        )}
      </button>
      {isOpen && (
        <p className="text-[11px] text-zinc-400 mt-2 leading-relaxed">
          {answer}
        </p>
      )}
    </div>
  );
}

export default function CheckoutPage() {
  const { data } = useQuizStore();
  const params = useParams();
  const locale = (params.locale as string) || "en-gb";
  const t = useTranslations(locale);
  const config = getMarketConfig(locale);

  const [selectedPlan, setSelectedPlan] = useState<"monthly" | "quarterly">("quarterly");
  const [timeLeft, setTimeLeft] = useState<number>(900); // 15 minutos padrão

  // Cronômetro persistido no sessionStorage para evitar reset ao dar F5
  useEffect(() => {
    const savedTime = sessionStorage.getItem("treadmill-method-timer");
    if (savedTime) {
      const parsedTime = parseInt(savedTime, 10);
      if (parsedTime > 0) setTimeLeft(parsedTime);
    }
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        const next = prev - 1;
        sessionStorage.setItem("treadmill-method-timer", String(next));
        return next;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const handleCheckout = () => {
    const selectedPrice = selectedPlan === "quarterly" 
      ? formatCurrency(config.prices.quarterly, locale)
      : formatCurrency(config.prices.monthly, locale);
    const planName = selectedPlan === "quarterly" ? t.offer.quarterlyLabel : t.offer.monthlyLabel;

    alert(
      locale === "pt-br" 
        ? `Redirecionando para o gateway de pagamento seguro.\nPlano Selecionado: ${planName} (${selectedPrice})`
        : `Redirecting to secure payment gateway.\nSelected Plan: ${planName} (${selectedPrice})`
    );
  };

  const qPrice = formatCurrency(config.prices.quarterly, locale);
  const qPriceOriginal = formatCurrency(config.prices.quarterlyOriginal, locale);
  const mPrice = formatCurrency(config.prices.monthly, locale);
  const mPriceOriginal = formatCurrency(config.prices.monthlyOriginal, locale);

  const qPerDayVal = (config.prices.quarterly / 90).toFixed(2);
  const mPerDayVal = (config.prices.monthly / 30).toFixed(2);
  const qPerDay = formatCurrency(parseFloat(qPerDayVal), locale);
  const mPerDay = formatCurrency(parseFloat(mPerDayVal), locale);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 flex flex-col pb-12">
      {/* Cabeçalho */}
      <Header />

      <main className="w-full max-w-lg mx-auto px-4 mt-6 flex flex-col gap-6">
        {/* Banner Parabéns */}
        <div className="border border-yellow-400/20 bg-yellow-400/5 p-4 rounded-2xl text-center">
          <span className="text-xs font-bold text-yellow-300">
            {t.offer.congratsBadge}
          </span>
        </div>

        {/* Cronômetro */}
        <div className="bg-zinc-900/40 border border-zinc-900 p-4 rounded-2xl text-center flex flex-col gap-1">
          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
            {t.offer.urgencyTitle}
          </span>
          <span className="text-xl font-heading font-black text-brand-lime tracking-widest animate-pulse">
            {formatTime(timeLeft)}
          </span>
        </div>

        {/* Seletor de Planos */}
        <div className="flex flex-col gap-3">
          <h2 className="text-xs font-heading font-extrabold text-zinc-400 uppercase tracking-wide px-1">
            {t.offer.planSectionTitle}
          </h2>

          {/* Plano Trimestral */}
          <button
            type="button"
            onClick={() => setSelectedPlan("quarterly")}
            className={cn(
              "w-full text-left p-5 rounded-2xl border transition-all cursor-pointer relative flex flex-col gap-2 select-none",
              selectedPlan === "quarterly"
                ? "bg-zinc-900 border-brand-lime shadow-lg shadow-lime-400/5"
                : "bg-zinc-900/40 border-zinc-900 hover:border-zinc-800"
            )}
          >
            {/* Tag Mais Popular */}
            <span className="absolute -top-2.5 right-4 bg-brand-lime text-zinc-950 text-[9px] font-black font-heading px-2 py-0.5 rounded-full uppercase tracking-wider">
              {t.offer.quarterlyBadge}
            </span>

            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "w-4 h-4 rounded-full border flex items-center justify-center transition-all",
                    selectedPlan === "quarterly" ? "border-brand-lime" : "border-zinc-700 bg-zinc-950"
                  )}
                >
                  {selectedPlan === "quarterly" && (
                    <div className="w-2.5 h-2.5 rounded-full bg-brand-lime" />
                  )}
                </div>
                <span className="text-sm font-bold text-zinc-100">{t.offer.quarterlyLabel}</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-zinc-500 line-through block">{qPriceOriginal}</span>
                <span className="text-base font-heading font-black text-brand-lime">{qPrice}</span>
              </div>
            </div>
            <div className="border-t border-zinc-900 pt-2 flex justify-between items-center text-[10px] text-zinc-400">
              <span>{t.offer.quarterlySub}</span>
              <span className="font-semibold text-brand-teal uppercase">
                {t.offer.quarterlyPerDay.replace("{price}", qPerDay)}
              </span>
            </div>
          </button>

          {/* Plano Mensal */}
          <button
            type="button"
            onClick={() => setSelectedPlan("monthly")}
            className={cn(
              "w-full text-left p-5 rounded-2xl border transition-all cursor-pointer relative flex flex-col gap-2 select-none",
              selectedPlan === "monthly"
                ? "bg-zinc-900 border-brand-lime shadow-lg shadow-lime-400/5"
                : "bg-zinc-900/40 border-zinc-900 hover:border-zinc-800"
            )}
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "w-4 h-4 rounded-full border flex items-center justify-center transition-all",
                    selectedPlan === "monthly" ? "border-brand-lime" : "border-zinc-700 bg-zinc-950"
                  )}
                >
                  {selectedPlan === "monthly" && (
                    <div className="w-2.5 h-2.5 rounded-full bg-brand-lime" />
                  )}
                </div>
                <span className="text-sm font-bold text-zinc-100">{t.offer.monthlyLabel}</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-zinc-500 line-through block">{mPriceOriginal}</span>
                <span className="text-base font-heading font-black text-zinc-100">{mPrice}</span>
              </div>
            </div>
            <div className="border-t border-zinc-900 pt-2 flex justify-between items-center text-[10px] text-zinc-400">
              <span>{t.offer.monthlySub}</span>
              <span className="font-semibold text-zinc-300 uppercase">
                {t.offer.monthlyPerDay.replace("{price}", mPerDay)}
              </span>
            </div>
          </button>
        </div>

        {/* Botão de Compra CTA */}
        <div className="flex flex-col gap-2.5">
          <Button
            onClick={handleCheckout}
            className="w-full bg-brand-lime text-zinc-950 hover:bg-brand-lime-hover font-heading font-bold text-sm tracking-wide py-7 rounded-2xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-lime-400/10"
          >
            <CreditCard className="w-4 h-4" />
            {t.offer.ctaButton}
          </Button>

          <div className="flex items-center justify-center gap-4 text-[9px] text-zinc-500 font-semibold uppercase tracking-wider mt-1">
            <span className="flex items-center gap-1">
              <Lock className="w-3 h-3 text-brand-teal" /> {t.offer.secureCheckout}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
            <span>{t.offer.sslEncrypted}</span>
          </div>
        </div>

        {/* Garantia */}
        <div className="bg-zinc-900/20 border border-zinc-900 p-5 rounded-3xl flex gap-4">
          <ShieldCheck className="w-8 h-8 text-brand-teal shrink-0 mt-0.5" />
          <div>
            <h3 className="text-xs font-bold text-zinc-200">{t.offer.guaranteeTitle}</h3>
            <p className="text-[10px] text-zinc-400 mt-1 leading-relaxed">
              {t.offer.guaranteeDesc}
            </p>
          </div>
        </div>

        {/* Entregáveis da Oferta */}
        <div className="bg-zinc-900/20 border border-zinc-900 p-5 rounded-3xl flex flex-col gap-4">
          <h3 className="text-xs font-heading font-extrabold text-zinc-200 uppercase tracking-wide">
            {t.offer.whatYouGetTitle}
          </h3>
          <ul className="flex flex-col gap-3 text-xs text-zinc-400 leading-normal pl-1">
            {t.offer.whatYouGetItems.map((item, idx) => {
              const parts = item.split(":");
              return (
                <li key={idx} className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-brand-lime shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-zinc-200 font-bold">{parts[0]}:</strong>
                    {parts.slice(1).join(":")}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Prova Social (Depoimentos) */}
        <div className="bg-zinc-900/20 border border-zinc-900 p-5 rounded-3xl flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-brand-lime" />
            <h3 className="text-xs font-heading font-extrabold text-zinc-200 uppercase tracking-wide">
              {t.offer.testimonialsTitle}
            </h3>
          </div>

          <div className="flex flex-col gap-4">
            {t.offer.testimonials.map((testi, idx) => (
              <div key={idx} className="bg-zinc-950 border border-zinc-900 p-4 rounded-2xl flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-zinc-200">{testi.name}</span>
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
                <p className="text-[10px] text-zinc-400 italic leading-relaxed">
                  &ldquo;{testi.text}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Acordeão */}
        <div className="bg-zinc-900/20 border border-zinc-900 p-5 rounded-3xl flex flex-col gap-3">
          <h3 className="text-xs font-heading font-extrabold text-zinc-200 uppercase tracking-wide mb-2">
            {t.offer.faqTitle}
          </h3>
          {t.offer.faq.map((item, idx) => (
            <FAQItem key={idx} question={item.q} answer={item.a} />
          ))}
        </div>

        {/* Footer Jurídico */}
        <div className="text-[9px] text-zinc-600 text-center leading-relaxed flex flex-col gap-2 mt-4 px-2">
          <p>{t.offer.legalDisclaimer}</p>
          <p>{t.offer.footerRights}</p>
        </div>
      </main>
    </div>
  );
}
