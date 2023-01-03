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
import { definePageMeta } from "#imports";

definePageMeta({
  middleware: ["auth"]
});

const route = useRoute();
const quizAPI = new Quiz();

const quiz = ref<QuizType | null>(null);

onMounted(async () => {
  let quizCurrent = await quizAPI.withQuestions(route.params.id as string);
  quiz.value = quizCurrent.quiz;
});
</script>

<style scoped></style>
