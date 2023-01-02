import { useRuntimeConfig } from "#app";
import { getAPI } from "~/utils/api/Fetch";

export default class ViewCategory {
  private runtimeConfig;

  constructor() {
    this.runtimeConfig = useRuntimeConfig();
  }

  public async addView(categoryID: number) {
    return await getAPI(
      `${this.runtimeConfig.public.apiURL}/api/category/${categoryID}/view`
    );
  }
}
