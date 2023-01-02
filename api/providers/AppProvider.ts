import type { ApplicationContract } from "@ioc:Adonis/Core/Application";
import UploadQuizImage from "../app/Services/UploadQuizImage";
import QuizCreateUsers from "../app/Services/Chart/QuizCreateUsers";

export default class AppProvider {
  constructor(protected app: ApplicationContract) {}

  public register() {
    // Register your own bindings
    this.app.container.bind("@ioc:Upload/QuizImage", () => {
      return new UploadQuizImage();
    });
    this.app.container.bind("Upload/QuizImage", () => {
      return new UploadQuizImage();
    });
    this.app.container.bind("Chart/QuizCreateUsers", () => {
      return new QuizCreateUsers();
    });
  }

  public async boot() {
    // IoC container is ready
  }

  public async ready() {
    // App is ready
  }

  public async shutdown() {
    // Cleanup, since app is going down
  }
}
