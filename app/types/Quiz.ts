import { Question } from "~/types/Question";
import { Category } from "~/types/Category";
import { User } from "~/types/User";

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
  category?: Category;
  questions?: Question[];
  questions_count?: string | number;
  user?: User;
}

export interface QuizSessions {
  id: number;
  start: boolean;
  end: boolean;
  score: number;
}
