import reviews from "./escenarios-revisados.json";

export function escenarioReview(slug: string) {
  return reviews[slug as keyof typeof reviews];
}
