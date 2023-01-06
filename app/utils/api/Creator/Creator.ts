import { useRuntimeConfig } from "#app";
import { getAPI } from "~/utils/api/Fetch";

export default class Creator {
  private runtimeConfig;

  constructor() {
    this.runtimeConfig = useRuntimeConfig();
  }

  public async list(page: number) {
    let url = `${this.runtimeConfig.public.apiURL}/api/creator`;

    if (page > 1) url += `?page=${page}`;

    return getAPI(url);
  }

  public async show(id: number | string) {
    return getAPI(`${this.runtimeConfig.public.apiURL}/api/creator/${id}`);
  }

  public async quizzes(id: number | string, page: number) {
    let url = `${this.runtimeConfig.public.apiURL}/api/creator/${id}/quizzes`;

    if (page > 1) url += `?page=${page}`;

    return getAPI(url);
  }
}
