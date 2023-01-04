import { useRuntimeConfig } from "#app";
import { getAPI } from "~/utils/api/Fetch";
import { useAuth } from "~/composables/auth";

export default class QuizSessions {
  private runtimeConfig;
  private readonly token: string;

  constructor() {
    const { token } = useAuth();
    this.runtimeConfig = useRuntimeConfig();
    this.token = (token.value as string) ?? "";
  }

  public async start(quizSlug: string) {
    return await getAPI(
      `${this.runtimeConfig.public.apiURL}/api/quiz-sessions/${quizSlug}/start`,
      this.token
    );
  }

  public async end(quizSlug: string) {
    return await getAPI(
      `${this.runtimeConfig.public.apiURL}/api/quiz-sessions/${quizSlug}/end`,
      this.token
    );
  }

  public async answerSuccess(quizSlug: string) {
    return await getAPI(
      `${this.runtimeConfig.public.apiURL}/api/quiz-sessions/${quizSlug}/answer-success`,
      this.token
    );
  }

  public async checkStarted(quizSlug: string) {
    return await getAPI(
      `${this.runtimeConfig.public.apiURL}/api/quiz-sessions/${quizSlug}/check-started`,
      this.token
    );
  }

  public async checkEnded(quizSlug: string) {
    return await getAPI(
      `${this.runtimeConfig.public.apiURL}/api/quiz-sessions/${quizSlug}/check-ended`,
      this.token
    );
  }
}
