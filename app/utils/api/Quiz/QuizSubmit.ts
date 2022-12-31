import { useRuntimeConfig } from "#app";
import { useAuth } from "~/composables/auth";
import { postAPI } from "~/utils/api/Fetch";

export default class QuizSubmit {
  private runtimeConfig;

  constructor() {
    this.runtimeConfig = useRuntimeConfig();
  }

  public async submit(body: FormData) {
    const { token } = useAuth();
    return await postAPI(
      `${this.runtimeConfig.public.apiURL}/api/quiz/submit`,
      body,
      token.value,
      true
    );
  }
}
