// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      apiURL: process.env.API_URL || "default_api_url"
    }
  }
});
