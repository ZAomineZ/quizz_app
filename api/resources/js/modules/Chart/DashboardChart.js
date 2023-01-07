export default class DashboardChart {
  constructor() {}

  init() {
    window.addEventListener("DOMContentLoaded", () => {
      this.chartQuizData = document.querySelector("#chart_quiz_data");
      this.chartQuizDataByCategory = document.querySelector(
        "#chart_quiz_by_category_data"
      );

      if (this.chartQuizData) {
      }

      if (this.chartQuizDataByCategory) {
      }
    });
  }
}
new DashboardChart().init();
