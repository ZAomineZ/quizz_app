import { Question } from "~/types/Question";

export enum QuizDifficulty {
  Easy = "Facile",
  Medium = "Moyen",
  Hard = "Difficile"
}

export interface Quiz {
  id: number;
  title: string;
  slug: string;
  difficulty: QuizDifficulty;
  description: string;
  image: string;
  questions?: Question[];
}
