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
Route.post(
  "/settings/change-credentials",
  "SettingsController.changeCredentials"
)
  .as("settings.changeCredentials")
  .middleware(["auth:web", "adminRole"]);
Route.post("/settings/change-password", "SettingsController.changePassword")
  .as("settings.changePassword")
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
Route.post("/api/logout", "Api/AuthController.logout");
Route.get("/api/me", "Api/AuthController.me").middleware("auth:api");
// ROUTES API QUIZ
Route.get("/api/quiz/latest", "Api/QuizController.latest");
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
