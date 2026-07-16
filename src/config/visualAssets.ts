// Manifesto centralizado e tipado para os assets estáticos do Quiz
export const VISUAL_ASSETS = {
  demographics: {
    age30_39: "/assets/images/demographics/age-30-39-uk.webp.png",
    age40_49: "/assets/images/demographics/age-40-49-uk.webp.png",
    age50_59: "/assets/images/demographics/age-50-59-uk.webp.png",
    age60_plus: "/assets/images/demographics/age-60-plus-uk.webp.png",
    genderFemale: "/assets/images/demographics/gender-female-uk.webp.png",
    genderMale: "/assets/images/demographics/gender-male-uk.webp.png",
  },
  treadmill: {
    experienceMan: "/assets/images/treadmill/treadmill-experience-man-uk.webp.png",
    intensityLight: "/assets/images/treadmill/treadmill-intensity-light-uk.webp.png",
    intensityModerate: "/assets/images/treadmill/treadmill-intensity-moderate-uk.webp.png",
    intensityBrisk: "/assets/images/treadmill/treadmill-intensity-brisk-uk.webp.png",
    inclineWalking: "/assets/images/treadmill/treadmill-incline-walking-uk.webp.png",
    locationHome: "/assets/images/treadmill/training-location-home-uk.webp.png",
    locationGym: "/assets/images/treadmill/training-location-gym-uk.webp.png",
    socialProofGroup: "/assets/images/treadmill/social-proof-walking-group-uk.webp.png",
  },
  lifestyle: {
    balancedMeal: "/assets/images/lifestyle/balanced-meal-uk.webp.png",
    bodyTypesDiverse: "/assets/images/lifestyle/body-types-diverse-uk.webp.png",
    currentWeightScale: "/assets/images/lifestyle/current-weight-scale-uk.webp.png",
    exerciseMotivation: "/assets/images/lifestyle/exercise-motivation-uk.webp.png",
    heightMeasurement: "/assets/images/lifestyle/height-measurement-uk.webp.png",
    importantLifeEvents: "/assets/images/lifestyle/important-life-events-uk.webp.png",
    sleepDuration: "/assets/images/lifestyle/sleep-duration-uk.webp.png",
    trainingTimeAfternoon: "/assets/images/lifestyle/training-time-afternoon-uk.webp.png",
    trainingTimeEvening: "/assets/images/lifestyle/training-time-evening-uk.webp.png",
    trainingTimeMorning: "/assets/images/lifestyle/training-time-morning-uk.webp.png",
    waterIntake: "/assets/images/lifestyle/water-intake-uk.webp.png",
    weightGoalProgress: "/assets/images/lifestyle/weight-goal-progress-uk.webp.png",
    workActivityMostlySeated: "/assets/images/lifestyle/work-activity-mostly-seated-uk.webp.png",
    workActivityModeratelyActive: "/assets/images/lifestyle/work-activity-moderately-active-uk.webp.png",
    workActivityVeryActive: "/assets/images/lifestyle/work-activity-very-active-uk.webp.png",
  },
  health: {
    consultation: "/assets/images/health/health-consultation-uk.webp.png",
  },
  characters: {
    man38: "/assets/images/characters/character-man-38-uk.webp.png",
    man52: "/assets/images/characters/character-man-52-uk.webp.png",
    man66: "/assets/images/characters/character-man-66-uk.webp.png",
    woman35: "/assets/images/characters/character-woman-35-uk.webp.png",
    woman48: "/assets/images/characters/character-woman-48-uk.webp.png",
    woman63: "/assets/images/characters/character-woman-63-uk.webp.png",
  },
  results: {
    walkingPlanProcessing: "/assets/results/walking-plan-processing-uk.webp.png",
    resultProjection: "/assets/results/result-projection-uk.webp.png",
    emailCaptureWalkingPlan: "/assets/results/email-capture-walking-plan-uk.webp.png",
  },
  mockups: {
    offerProduct: "/assets/mockups/offer-product-mockup-uk.webp.png",
  },
  offer: {
    benefitPersonalised: "/assets/offer/benefit-personalised-plan-uk.webp.png",
    benefitProgress: "/assets/offer/benefit-progress-tracking-uk.webp.png",
    benefitHome: "/assets/offer/benefit-home-workouts-uk.webp.png",
    benefitFlexible: "/assets/offer/benefit-flexible-routine-uk.webp.png",
  },
  trust: {
    securePayment: "/assets/icons/trust/icon-secure-payment.svg.png",
    guarantee: "/assets/icons/trust/icon-guarantee.svg.png",
    instantAccess: "/assets/icons/trust/icon-instant-access.svg.png",
    personalisedPlan: "/assets/icons/trust/icon-personalised-plan.svg.png",
  },
} as const;

export type VisualAssetsType = typeof VISUAL_ASSETS;
