export type ReviewedScenario = {
  title: string;
  description: string;
  h1: string;
  reviewedAt: string;
  headings: string[];
  questions: string[];
  requiredLinks: string[];
  requiredTerms: string[];
};
export const REVIEWS: Record<string, ReviewedScenario>;
export function validateReviewed(slug: string, raw: string): {
  errors: string[];
  answers: { q: string; body: string }[];
  total: number;
};
