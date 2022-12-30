import { useRuntimeConfig } from "#app";
import { postAPI } from "~/utils/api/Fetch";
import { useAuth } from "~/composables/auth/useAuth";

export default class Auth {
  private runtimeConfig;

  constructor() {
    this.runtimeConfig = useRuntimeConfig();
  }

  public async login(data: object) {
    return await postAPI(`${this.runtimeConfig.public.apiURL}/api/login`, data);
  }

  public async register(data: object) {
    return await postAPI(
      `${this.runtimeConfig.public.apiURL}/api/register`,
      data
    );
  }

  public async logout() {
    const { token } = useAuth();
    return await postAPI(
      `${this.runtimeConfig.public.apiURL}/api/logout`,
      {},
      token.value
    );
  }
}
