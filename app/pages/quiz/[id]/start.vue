<template>
  <Head>
    <Title>Quizz App</Title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="" />
    <link
      href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@100;200;300;400;500;600;700&display=swap"
      rel="stylesheet"
    />
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css"
      integrity="sha512-MV7K8+y+gLIBoVD59lQIYicR65iaqukzvf/nwasF0nqhPay5w/9lJmVM2hMDcnK1OnMGCdVK+iQrJ7lzPJQd1w=="
      crossorigin="anonymous"
      referrerpolicy="no-referrer"
    />
  </Head>
  <QuizSteps :quiz="quiz" />
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import Quiz from "~/utils/api/Quiz/Quiz";
import { Quiz as QuizType } from "~/types/Quiz";
import { useRoute } from "nuxt/app";
import { definePageMeta, navigateTo } from "#imports";
import QuizSessions from "~/utils/api/Quiz/QuizSessions";
import { useNuxtApp } from "#app";

definePageMeta({
  middleware: ["auth"]
});

const route = useRoute();
const { $showToast } = useNuxtApp();

const quizAPI = new Quiz();
const quizSessionsAPI = new QuizSessions();

const quiz = ref<QuizType | null>(null);

onMounted(async () => {
  let quizSlug = route.params.id as string;
  // Check authorization
  const checkStartedResponse = await quizSessionsAPI.checkStarted(quizSlug);
  if (!checkStartedResponse.success) {
    $showToast(checkStartedResponse.message, "error", 2000);
    return navigateTo(`/quiz/${quizSlug}`);
  }

  let quizCurrent = await quizAPI.withQuestions(quizSlug);
  quiz.value = quizCurrent.quiz;
});
</script>

<style scoped></style>
