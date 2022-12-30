import { useRuntimeConfig } from "#app";
import { getAPI } from "~/utils/api/Fetch";
import { useAuth } from "~/composables/auth";

export default class User {
  private runtimeConfig;

  constructor() {
    this.runtimeConfig = useRuntimeConfig();
  }

  public async me() {
    const { token } = useAuth();
    return getAPI(`${this.runtimeConfig.public.apiURL}/api/me`, token.value);
  }
}
