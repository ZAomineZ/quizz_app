import { useRuntimeConfig } from "#app";
import { getAPI } from "~/utils/api/Fetch";

export default class Ranking {
  private runtimeConfig;

  constructor() {
    this.runtimeConfig = useRuntimeConfig();
  }

  public async scores() {
    return await getAPI(
      `${this.runtimeConfig.public.apiURL}/api/ranking/scores`
    );
  }

  public async participations() {
    return await getAPI(
      `${this.runtimeConfig.public.apiURL}/api/ranking/participations`
    );
  }

  public async publications() {
    return await getAPI(
      `${this.runtimeConfig.public.apiURL}/api/ranking/publications`
    );
  }
}
