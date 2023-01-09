export type User = {
  id: number;
  username: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  image: string | null;
  meta?: {
    quizzes_count?: string | number;
  };
};
