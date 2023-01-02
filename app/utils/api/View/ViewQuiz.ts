import { useRuntimeConfig } from "#app";
import { getAPI } from "~/utils/api/Fetch";

export default class ViewQuiz {
  private runtimeConfig;

  constructor() {
    this.runtimeConfig = useRuntimeConfig();
  }

  public async addView(quizID: string) {
    return await getAPI(
      `${this.runtimeConfig.public.apiURL}/api/quiz/${quizID}/view`
    );
  }
}
