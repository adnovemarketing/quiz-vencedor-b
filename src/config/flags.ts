/**
 * Feature Flags para os experimentos de CRO da Fase 5.
 * Altere o valor para true (ativado) ou false (revertido/controle) conforme necessário.
 */
export const CRO_FLAGS = {
  /**
   * Mudança 1 — Landing page:
   * Exibir uma pequena indicação de tempo de quiz ("⏱ Takes ~2 minutes" / "⏱ Leva ~2 minutos") abaixo do botão CTA.
   * Reduz o atrito de tempo percebido.
   */
  landingDurationHint: true,

  /**
   * Mudança 2 — Quiz:
   * Exibir contador de progresso textual ("Step N of 16" / "Etapa N de 16") na barra superior.
   * Reduz abandono por incerteza de progresso.
   */
  quizStepCounter: true,

  /**
   * Mudança 3 — Email Capture:
   * Alterar o texto do CTA de envio para orientar o utilizador quando o e-mail for inválido
   * ("Enter your email to continue" / "Digite seu e-mail para continuar").
   */
  emailContextualCta: true,

  /**
   * Mudança 4 — Relatório (Report):
   * Exibir um botão CTA outline menor logo no topo da página (acima da dobra),
   * permitindo conversão rápida sem forçar o utilizador a scrollar toda a página.
   */
  reportTopCtaAnchor: true,

  /**
   * Mudança 5 — Checkout/Oferta:
   * Substituir ou estender o banner de congratulações com o nome do plano de treino
   * calculado dinamicamente baseado no perfil do utilizador (Incline HIIT, Active Recovery, etc.).
   */
  checkoutPersonalisedHeadline: true,
};
