/**
 * Utilitários de cálculos fisiológicos para o The Treadmill Method
 */

export function calculateIMC(
  weight: number,
  height: number,
  heightUnit: "cm" | "ft",
  weightUnit: "kg" | "lb"
): number {
  let w = weight;
  let h = height;

  // Converter para métrico se estiver em imperial
  if (weightUnit === "lb") {
    w = weight * 0.453592;
  }
  if (heightUnit === "ft") {
    h = height * 30.48;
  }

  const heightInMeters = h / 100;
  return parseFloat((w / (heightInMeters * heightInMeters)).toFixed(1));
}

export type IMCCategoryKey = 'underweight' | 'normal' | 'overweight' | 'obese';

export function getIMCCategoryKey(imc: number): IMCCategoryKey {
  if (imc < 18.5) return 'underweight';
  if (imc < 25.0) return 'normal';
  if (imc < 30.0) return 'overweight';
  return 'obese';
}

export function getIMCCategoryColor(key: IMCCategoryKey): string {
  switch (key) {
    case 'underweight':
      return "text-blue-400";
    case 'normal':
      return "text-brand-lime";
    case 'overweight':
      return "text-yellow-400";
    case 'obese':
      return "text-red-400";
  }
}

export function calculateTargetDate(
  currentWeight: number | null,
  targetWeight: number | null,
  weightUnit: "kg" | "lb",
  locale: string = "en-gb"
): { dateString: string; weeks: number } {
  const defaultWeeks = 8;
  const today = new Date();
  const localeTag = locale.toLowerCase() === "pt-br" ? "pt-BR" : "en-GB";

  if (!currentWeight || !targetWeight || currentWeight <= targetWeight) {
    const targetDate = new Date();
    targetDate.setDate(today.getDate() + defaultWeeks * 7);
    return {
      dateString: targetDate.toLocaleDateString(localeTag, { day: "numeric", month: "long", year: "numeric" }),
      weeks: defaultWeeks,
    };
  }

  // Estimativa saudável: 0.5kg por semana para KG, ou 1.1lbs por semana para LBs
  const diff = currentWeight - targetWeight;
  const ratePerWeek = weightUnit === "kg" ? 0.5 : 1.1;
  const weeks = Math.max(4, Math.ceil(diff / ratePerWeek));

  const targetDate = new Date();
  targetDate.setDate(today.getDate() + weeks * 7);

  return {
    dateString: targetDate.toLocaleDateString(localeTag, { day: "numeric", month: "long", year: "numeric" }),
    weeks,
  };
}
