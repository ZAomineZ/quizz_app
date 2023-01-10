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
  <QuizEnd :quiz="quiz" :quizSession="quizSession" />
</template>

<script lang="ts" setup>
import { definePageMeta, navigateTo, onMounted } from "#imports";
import { useRoute, useRouter } from "nuxt/app";
import QuizSessions from "~/utils/api/Quiz/QuizSessions";
import { ref } from "vue";
import {
  Quiz as QuizType,
  QuizSessions as QuizSessionsType
} from "~/types/Quiz";
import { useNuxtApp } from "#app";

definePageMeta({
  middleware: ["auth"]
});

const route = useRoute();
const { $showToast } = useNuxtApp();

const quizSessionsAPI = new QuizSessions();

const quiz = ref<QuizType | null>(null);
const quizSession = ref<QuizSessionsType | null>(null);

onMounted(async () => {
  let quizSlug = route.params.id as string;
  // Check authorization
  const checkEndedResponse = await quizSessionsAPI.checkEnded(quizSlug);
  if (!checkEndedResponse.success) {
    $showToast(checkEndedResponse.message, "error", 2000);
    return navigateTo(`/quiz/${quizSlug}`);
  }
  quiz.value = checkEndedResponse.quiz;
  quizSession.value = checkEndedResponse.quizSession;
});
</script>

<style scoped></style>
