import { getAPI } from "~/utils/api/Fetch";
import { useRuntimeConfig } from "#app";
import { useAuth } from "~/composables/auth";

export default class Quiz {
  private runtimeConfig;

  constructor() {
    this.runtimeConfig = useRuntimeConfig();
  }

  public async latest() {
    return await getAPI(`${this.runtimeConfig.public.apiURL}/api/quiz/latest`);
  }

  public async mostViews() {
    return await getAPI(
      `${this.runtimeConfig.public.apiURL}/api/quiz/mostViews`
    );
  }

  public async mostViewTwoCategory() {
    return await getAPI(
      `${this.runtimeConfig.public.apiURL}/api/quiz/mostViewTwoCategory`
    );
  }

  public async sort(query: string, page: number = 1) {
    let uri = `${this.runtimeConfig.public.apiURL}/api/quiz/sort?`;
    if (page !== 1) {
      uri += `page=${page}&`;
    }
    uri += `${query}`;

    return await getAPI(uri);
  }

  public async me(page: number = 1) {
    const { token } = useAuth();

    let uri = `${this.runtimeConfig.public.apiURL}/api/quizzes/me`;
    if (page > 1) {
      uri += `?page=${page}`;
    }

    return await getAPI(uri, token.value);
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
