"use client";

import React from "react";
import { useQuizNavigation } from "@/core/hooks/useQuizNavigation";
import { ProgressBar } from "./ProgressBar";
import { QuizLayout } from "./QuizLayout";
import { useLocale } from "@/core/i18n/useLocale";
import { cn } from "@/lib/utils";

// Importações dos Componentes Físicos de Etapa
import { StepOnboardingBasics } from "./steps/StepOnboardingBasics";
import { StepAgeSelection } from "./steps/StepAgeSelection";
import { StepGenderSelection } from "./steps/StepGenderSelection";
import { StepTreadmillFrequency } from "./steps/StepTreadmillFrequency";
import { StepCardioLevel } from "./steps/StepCardioLevel";
import { StepInclineProfile } from "./steps/StepInclineProfile";
import { StepInjuryTriage } from "./steps/StepInjuryTriage";
import { StepSleepQuality } from "./steps/StepSleepQuality";
import { StepWaterIntake } from "./steps/StepWaterIntake";
import { StepDailyActivity } from "./steps/StepDailyActivity";
import { StepDailyNutrition } from "./steps/StepDailyNutrition";
import { StepAntropometria } from "./steps/StepAntropometria";
import { StepImportantEvent } from "./steps/StepImportantEvent";
import { StepMindsetBlockers } from "./steps/StepMindsetBlockers";
import { StepEducationalTransition } from "./steps/StepEducationalTransition";
import { StepLoadingCalculation } from "./steps/StepLoadingCalculation";
import { StepReportProjection } from "./steps/StepReportProjection";
import { StepEmailCapture } from "./steps/StepEmailCapture";

export function QuizContainer() {
  const {
    currentStep,
    activeDotIndex,
    showProgressBar,
    navigateTo,
    navigateBack,
    navigateForward,
  } = useQuizNavigation();

  const locale = useLocale();

  // Dynamic card widths to support side-by-side structures on desktop
  const getCardWidthClass = () => {
    switch (currentStep) {
      case "onboarding-basics":
      case "treadmill-frequency":
      case "sleep-quality":
      case "water-intake":
      case "daily-nutrition":
      case "mindset-blockers":
      case "email-capture":
        return "max-w-3xl"; // Layout A: Lateral right image on desktop
      case "educational-transition":
        return "max-w-4xl"; // Wide educational layout
      case "age-selection":
      case "cardio-level":
      case "daily-activity":
      case "injury-triage":
        return "max-w-2xl"; // Layout B: Header image/grid options
      case "gender-selection":
      case "important-event":
        return "max-w-3xl"; // Layout C: Cards in grids with images
      case "incline-profile":
      case "antropometria":
        return "max-w-2xl"; // Layout D: Side icon/smaller forms
      default:
        return "max-w-md"; // Fallback standard
    }
  };

  // Mapeador do motor de renderização das etapas reais do quiz
  const renderStepContent = () => {
    switch (currentStep) {
      case "onboarding-basics":
        return <StepOnboardingBasics onNext={navigateTo} />;
      case "age-selection":
        return <StepAgeSelection onNext={navigateTo} />;
      case "gender-selection":
        return <StepGenderSelection onNext={navigateTo} />;
      case "treadmill-frequency":
        return <StepTreadmillFrequency onNext={navigateTo} />;
      case "cardio-level":
        return <StepCardioLevel onNext={navigateTo} />;
      case "incline-profile":
        return <StepInclineProfile onNext={navigateTo} />;
      case "injury-triage":
        return <StepInjuryTriage onNext={navigateTo} />;
      case "sleep-quality":
        return <StepSleepQuality onNext={navigateTo} />;
      case "water-intake":
        return <StepWaterIntake onNext={navigateTo} />;
      case "daily-activity":
        return <StepDailyActivity onNext={navigateTo} />;
      case "daily-nutrition":
        return <StepDailyNutrition onNext={navigateTo} />;
      case "antropometria":
        return <StepAntropometria onNext={navigateTo} />;
      case "important-event":
        return <StepImportantEvent onNext={navigateTo} />;
      case "mindset-blockers":
        return <StepMindsetBlockers onNext={navigateTo} />;
      case "educational-transition":
        return <StepEducationalTransition onNext={navigateTo} />;
      case "loading-calculation":
        return <StepLoadingCalculation onNext={navigateTo} />;
      case "report-projection":
        return <StepReportProjection onNext={navigateTo} />;
      case "email-capture":
        return <StepEmailCapture />;
      default:
        return (
          <div className="text-center p-4">
            <h2 className="text-lg font-bold text-zinc-300">
              {locale === "pt-br" ? "Etapa não encontrada" : "Step not found"}
            </h2>
          </div>
        );
    }
  };

  return (
    <div className="w-full flex-1 flex flex-col justify-between">
      {/* Barra de Progresso superior */}
      <ProgressBar
        activeDotIndex={activeDotIndex}
        onBack={navigateBack}
        onForward={navigateForward}
        showProgress={showProgressBar}
      />

      {/* Container de transição de tela animada com layout centralizado */}
      <QuizLayout stepKey={currentStep}>
        <div className={cn(
          "w-full p-5 md:p-8 bg-zinc-900/30 rounded-3xl border border-zinc-900/60 mx-auto shadow-2xl transition-all duration-300",
          getCardWidthClass()
        )}>
          {renderStepContent()}
        </div>
      </QuizLayout>

      {/* Espaçamento estético inferior para empurrar o layout */}
      <div className="h-6" />
    </div>
  );
}
