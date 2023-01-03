import type { ApplicationContract } from "@ioc:Adonis/Core/Application";
import UploadQuizImage from "../app/Services/UploadQuizImage";
import QuizCreateUsers from "../app/Services/Chart/QuizCreateUsers";
import UploadCategoryImage from "../app/Services/UploadCategoryImage";
import QuizByCategory from "../app/Services/Chart/QuizByCategory";

export default class AppProvider {
  constructor(protected app: ApplicationContract) {}

  public register() {
    // Register your own bindings
    // this.app.container.bind("@ioc:Upload/QuizImage", () => {
    //   return new UploadQuizImage();
    // });
    this.app.container.bind("Upload/QuizImage", () => {
      return new UploadQuizImage();
    });
    this.app.container.bind("Upload/CategoryImage", () => {
      return new UploadCategoryImage();
    });
    this.app.container.bind("Chart/QuizCreateUsers", () => {
      return new QuizCreateUsers();
    });
    this.app.container.bind("Chart/QuizByCategory", () => {
      return new QuizByCategory();
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
