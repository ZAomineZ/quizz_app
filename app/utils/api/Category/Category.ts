import { getAPI } from "~/utils/api/Fetch";
import { useRuntimeConfig } from "#app";

export default class Category {
  private runtimeConfig;

  constructor() {
    this.runtimeConfig = useRuntimeConfig();
  }

  public async list() {
    return await getAPI(`${this.runtimeConfig.public.apiURL}/api/category`);
  }
}
