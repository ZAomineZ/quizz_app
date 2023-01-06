import { getAPI } from "~/utils/api/Fetch";
import { useRuntimeConfig } from "#app";

export default class Category {
  private runtimeConfig;

  constructor() {
    this.runtimeConfig = useRuntimeConfig();
  }

  public async list(page: number) {
    let url = `${this.runtimeConfig.public.apiURL}/api/category`;
    if (page > 1) {
      url += `?page=${page}`;
    }
    return await getAPI(url);
  }

  public async mostViews() {
    return await getAPI(
      `${this.runtimeConfig.public.apiURL}/api/category/mostViews`
    );
  }

  public async showSlug(categorySlug: string) {
    return await getAPI(
      `${this.runtimeConfig.public.apiURL}/api/category/${categorySlug}`
    );
  }

  public async quizzes(categorySlug: string, page: number) {
    let url = `${this.runtimeConfig.public.apiURL}/api/category/${categorySlug}/quizzes`;
    if (page > 1) {
      url += `?page=${page}`;
    }
    return await getAPI(url);
  }
}
