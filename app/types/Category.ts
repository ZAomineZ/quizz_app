export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  image: string;
  meta?: {
    quizzes_count?: string | number;
  };
}
