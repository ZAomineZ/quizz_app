/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from "@ioc:Adonis/Core/Route";

// Route register
Route.get("/register", "AuthController.registerView")
  .as("registerView")
  .middleware("guest");
Route.post("/register", "AuthController.register")
  .as("register")
  .middleware("guest");
// Route login
Route.get("/login", "AuthController.logInView")
  .as("loginView")
  .middleware("guest");
Route.post("/login", "AuthController.logIn").as("login").middleware("guest");
Route.post("/logout", "AuthController.logout")
  .as("logout")
  .middleware("auth:web");
// Routes settings
Route.get(
  "/settings/change-credentials",
  "SettingsController.changeCredentialsView"
)
  .as("settings.changeCredentialsView")
  .middleware(["auth:web", "adminRole"]);
Route.get("/settings/change-password", "SettingsController.changePasswordView")
  .as("settings.changePasswordView")
  .middleware(["auth:web", "adminRole"]);
Route.get("/settings/change-image", "SettingsController.changeImageView")
  .as("settings.changeImageView")
  .middleware(["auth:web", "adminRole"]);
Route.post(
  "/settings/change-credentials",
  "SettingsController.changeCredentials"
)
  .as("settings.changeCredentials")
  .middleware(["auth:web", "adminRole"]);
Route.post("/settings/change-password", "SettingsController.changePassword")
  .as("settings.changePassword")
  .middleware(["auth:web", "adminRole"]);
Route.post("/settings/change-image", "SettingsController.changeImage")
  .as("settings.changeImage")
  .middleware(["auth:web", "adminRole"]);
// Routes Dashboard
Route.get("/dashboard", "Admin/DashboardController.index")
  .as("dashboard")
  .middleware(["auth:web", "adminRole"]);
Route.get("/", "HomeController.index").as("home").middleware(["auth:web"]);
// Routes quiz
Route.resource("quiz", "Admin/QuizzesController")
  .as("quiz")
  .middleware({ "*": ["auth", "adminRole"] });
// Routes category
Route.resource("category", "Admin/CategoriesController")
  .as("category")
  .middleware({ "*": ["auth", "adminRole"] });
// Routes user
Route.resource("user", "Admin/UsersController")
  .except(["create", "store"])
  .as("user")
  .middleware({ "*": ["auth", "adminRole"] });
// Routes notifications
Route.get("/notifications", "Admin/NotificationsController.index")
  .as("notifications")
  .middleware(["auth:web", "adminRole"]);
// API ROUTES
Route.post("/api/question/:quizID/create", "Admin/QuestionsController.create")
  .as("question.create")
  .middleware(["auth:web", "adminRole"]);
Route.put("/api/:id/question", "Admin/QuestionsController.update")
  .as("question.update")
  .middleware(["auth:web", "adminRole"]);
// ROUTES API AUTH
Route.post("/api/register", "Api/AuthController.register");
Route.post("/api/login", "Api/AuthController.login");
Route.post("/api/forgot-password", "Api/ForgotController.store");
Route.put("/api/forgot-password/:email/:token", "Api/ForgotController.update");
Route.post(
  "/api/forgot-password/confirm/:token",
  "Api/ForgotController.confirm"
);
Route.post("/api/logout", "Api/AuthController.logout");
Route.get("/api/me", "Api/AuthController.me").middleware("auth:api");
// ROUTES API QUIZ
Route.get("/api/quiz/latest", "Api/QuizController.latest");
Route.get("/api/quiz/mostViews", "Api/Views/QuizViewController.mostViews");
Route.get(
  "/api/quiz/mostViewTwoCategory",
  "Api/Views/QuizViewController.mostViewTwoCategory"
);
Route.get("/api/quizzes/me", "Api/QuizController.me").middleware("auth:api");
Route.get("/api/quiz/sort", "Api/QuizSortController.index");
Route.get("/api/quiz/:slug", "Api/QuizController.show");
Route.get("/api/quiz/:slug/questions", "Api/QuizController.questions");
Route.post("/api/quiz/submit", "Api/QuizSubmitController.submit").middleware(
  "auth:api"
);
Route.post(
  "/api/quiz/:id/submit-question",
  "Api/QuizSubmitController.submitQuestion"
).middleware("auth:api");
// ROUTES API CATEGORY
Route.get("/api/category", "Api/CategoryController.list");
Route.get("/api/category/all", "Api/CategoryController.all");
Route.get(
  "/api/category/mostViews",
  "Api/Views/CategoryViewController.mostViews"
);
Route.get("/api/category/:categorySlug", "Api/CategoryController.showSlug");
Route.get(
  "/api/category/:categorySlug/quizzes",
  "Api/QuizController.byCategory"
);
// ROUTES API CREATOR
Route.get("/api/creator", "Api/CreatorController.list");
Route.get("/api/creator/:id", "Api/CreatorController.show");
Route.get("/api/creator/:id/quizzes", "Api/CreatorController.quizzes");
// ROUTES API VIEWS
Route.get(
  "/api/category/:slug/view",
  "Api/Views/CategoryViewController.createView"
);
Route.get("/api/quiz/:slug/view", "Api/Views/QuizViewController.createView");
// ROUTES API QUIZZES SESSIONS
Route.get(
  "/api/quiz-sessions/:quizSlug/start",
  "Api/QuizSessionsController.startQuiz"
).middleware("auth:api");
Route.get(
  "/api/quiz-sessions/:quizSlug/check-started",
  "Api/QuizSessionsController.startQuizChecked"
).middleware("auth:api");
Route.get(
  "/api/quiz-sessions/:quizSlug/end",
  "Api/QuizSessionsController.endQuiz"
).middleware("auth:api");
Route.get(
  "/api/quiz-sessions/:quizSlug/check-ended",
  "Api/QuizSessionsController.endQuizChecked"
).middleware("auth:api");
Route.get(
  "/api/quiz-sessions/:quizSlug/answer-success",
  "Api/QuizSessionsController.answerSuccess"
).middleware("auth:api");
// ROUTES API RANKING
Route.get("/api/ranking/scores", "Api/RankingController.scores");
Route.get(
  "/api/ranking/participations",
  "Api/RankingController.participations"
);
Route.get("/api/ranking/publications", "Api/RankingController.publications");
// ROUTES API SETTING
Route.post(
  "/api/setting/change-credentials",
  "Api/SettingController.changeCredentials"
).middleware("auth:api");
Route.post(
  "/api/setting/change-passwords",
  "Api/SettingController.changePasswords"
).middleware("auth:api");
Route.post(
  "/api/setting/change-image",
  "Api/SettingController.changeImage"
).middleware("auth:api");
// ROUTES API NOTIFICATIONS
// Route.get(
//   "/api/notification/latest",
//   "Api/NotificationController.latest"
// ).middleware("auth:web");
Route.get(
  "/api/notification/read",
  "Api/NotificationController.read"
).middleware(["auth:web", "adminRole"]);
