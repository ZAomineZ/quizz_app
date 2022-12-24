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
Route.get("/register", "AuthController.registerView").as("registerView");
Route.post("/register", "AuthController.register").as("register");
// Route login
Route.get("/login", "AuthController.logInView").as("loginView");
Route.post("/login", "AuthController.logIn").as("login");
// Routes settings
Route.get("/settings", "SettingsController.index").as("settings");
// Routes Dashboard
Route.get("/dashboard", "Admin/DashboardController.index").as("dashboard");
// Routes quiz
Route.resource("quiz", "Admin/QuizzesController").as("quiz");
// Routes category
Route.resource("category", "Admin/CategoriesController").as("category");

// API ROUTES
Route.post(
  "/api/question/:quizID/create",
  "Admin/QuestionsController.create"
).as("question.create");
Route.put("/api/:id/question", "Admin/QuestionsController.update").as(
  "question.update"
);
// ROUTES API QUIZ
Route.get("/api/quiz/latest", "Api/QuizController.latest");
