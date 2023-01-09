<template>
  <AppLayout>
    <div class="page__content">
      <div class="container__fluid my_3">
        <div class="my_3">
          <div class="row">
            <QuizDetails :quiz="quiz" />
          </div>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import QuizDetails from "/components/Quiz/QuizDetails.vue";
import { onMounted, ref } from "vue";
import { Quiz as QuizType } from "~/types/Quiz";
import Quiz from "~/utils/api/Quiz/Quiz";
import { useRoute } from "nuxt/app";
import ViewQuiz from "~/utils/api/View/ViewQuiz";
import { navigateTo } from "#imports";

const route = useRoute();
const QuizAPI = new Quiz();
const viewQuizAPI = new ViewQuiz();

const quiz = ref<QuizType | null>(null);

onMounted(async () => {
  const quizID = route.params.id as string;
  try {
    const quizCurrent = await QuizAPI.show(quizID);
    quiz.value = quizCurrent.quiz;
  } catch (err) {
    return navigateTo("/");
  }

  // ViewQuiz action api
  await viewQuizAPI.addView(quizID);
});
</script>

<style scoped></style>
