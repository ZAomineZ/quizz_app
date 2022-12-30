import { defineNuxtRouteMiddleware, navigateTo } from "#app";
import { useAuth } from "~/composables/auth";

export default defineNuxtRouteMiddleware(async (_to, _from) => {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn.value) return navigateTo("/login");
});
