import { useRuntimeConfig } from "#app";
import { postAPI, putAPI } from "~/utils/api/Fetch";

export default class ForgotPassword {
  private runtimeConfig;

  constructor() {
    this.runtimeConfig = useRuntimeConfig();
  }

  public async sendMail(data: object) {
    return await postAPI(
      `${this.runtimeConfig.public.apiURL}/api/forgot-password`,
      data
    );
  }

  public async confirmation(data: object, email: string, token: string) {
    return await putAPI(
      `${this.runtimeConfig.public.apiURL}/api/forgot-password/${email}/${token}`,
      data
    );
  }
}
