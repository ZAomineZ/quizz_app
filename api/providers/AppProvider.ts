import type { ApplicationContract } from "@ioc:Adonis/Core/Application";
import UploadQuizImage from "../app/Services/UploadQuizImage";
import QuizCreateUsers from "../app/Services/Chart/QuizCreateUsers";
import UploadCategoryImage from "../app/Services/UploadCategoryImage";
import QuizByCategory from "../app/Services/Chart/QuizByCategory";
import UploadUserImage from "../app/Services/UploadUserImage";
import QuizPublic from "../app/Services/Chart/QuizPublic";
import QuizByMonthsPercentage from "../app/Services/Chart/QuizByMonthsPercentage";
import QuizByCategoryPercentage from "../app/Services/Chart/QuizByCategoryPercentage";
import QuizPublicByCategory from "../app/Services/Chart/QuizPublicByCategory";

export default class AppProvider {
  constructor(protected app: ApplicationContract) {}

  public register() {
    // Register your own bindings
    // this.app.container.bind("@ioc:Upload/QuizImage", () => {
    //   return new UploadQuizImage();
    // });
    // Upload Service
    this.app.container.bind("Upload/QuizImage", () => {
      return new UploadQuizImage();
    });
    this.app.container.bind("Upload/CategoryImage", () => {
      return new UploadCategoryImage();
    });
    this.app.container.bind("Upload/UserImage", () => {
      return new UploadUserImage();
    });
    // Chart Service
    this.app.container.bind("Chart/QuizCreateUsers", () => {
      return new QuizCreateUsers();
    });
    this.app.container.bind("Chart/QuizPublic", () => {
      return new QuizPublic();
    });
    this.app.container.bind("Chart/QuizPublicByCategory", () => {
      return new QuizPublicByCategory();
    });
    this.app.container.bind("Chart/QuizByCategory", () => {
      return new QuizByCategory();
    });
    this.app.container.bind("Chart/QuizByMonthsPercentage", () => {
      return new QuizByMonthsPercentage();
    });
    this.app.container.bind("Chart/QuizByCategoryPercentage", () => {
      return new QuizByCategoryPercentage();
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
