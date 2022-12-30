import { useAuth } from "~/composables/auth";
import { defineNuxtPlugin } from "#app";

export default defineNuxtPlugin(async () => {
  const { me } = useAuth();

  await me();
});
