import "vue-toastification/dist/index.css";
import { defineNuxtPlugin } from "#app";
import Toast, { POSITION, useToast } from "vue-toastification";

const toast = useToast();

export default defineNuxtPlugin((nuxt) => {
  nuxt.vueApp.use(Toast, {
    position: POSITION.TOP_RIGHT
  });
  nuxt.provide("showToast", (msg, type, time = 5000) =>
    toast[type](msg, { timeout: time })
  );
});
