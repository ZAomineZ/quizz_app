import { User } from "~/types/User";

export type RankingScores = {
  user?: User;
  meta: {
    scoreTotal: number | string;
  };
};

export type RankingParticipations = {
  user?: User;
  meta: {
    count_participations: number | string;
  };
};

export type RankingPublications = {
  user?: User;
  meta: {
    count_publications: number | string;
  };
};
