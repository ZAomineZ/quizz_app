import { useRuntimeConfig } from "#app";
import { useAuth } from "~/composables/auth";
import { postAPI } from "~/utils/api/Fetch";

export default class Setting {
  private runtimeConfig;

  constructor() {
    this.runtimeConfig = useRuntimeConfig();
  }

  public async changeCredentials(body: FormData) {
    const { token } = useAuth();
    return postAPI(
      `${this.runtimeConfig.public.apiURL}/api/setting/change-credentials`,
      body,
      token.value,
      true
    );
  }

  public async changePasswords(body: FormData) {
    const { token } = useAuth();
    return postAPI(
      `${this.runtimeConfig.public.apiURL}/api/setting/change-passwords`,
      body,
      token.value,
      true
    );
  }
}
