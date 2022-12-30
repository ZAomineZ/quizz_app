import { useRuntimeConfig } from "#app";

export default class QuizSubmit {
  private runtimeConfig;

  constructor() {
    this.runtimeConfig = useRuntimeConfig();
  }

  public async submit() {}
}
