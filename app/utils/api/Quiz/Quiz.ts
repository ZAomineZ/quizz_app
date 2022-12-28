import { getAPI } from "~/utils/api/Fetch";
import { useRuntimeConfig } from "#app";

export default class Quiz {
  private runtimeConfig;

  constructor() {
    this.runtimeConfig = useRuntimeConfig();
  }

  public async latest() {
    return await getAPI(`${this.runtimeConfig.public.apiURL}/api/quiz/latest`);
  }

  public async sort(query: string) {
    return await getAPI(
      `${this.runtimeConfig.public.apiURL}/api/quiz/sort?${query}`
    );
  }

  public async show(slug: string) {
    return await getAPI(`${this.runtimeConfig.public.apiURL}/api/quiz/${slug}`);
  }

  public async withQuestions(slug: string) {
    return await getAPI(
      `${this.runtimeConfig.public.apiURL}/api/quiz/${slug}/questions`
    );
  }
}
