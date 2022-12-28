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

const route = useRoute();
const QuizAPI = new Quiz();

const quiz = ref<QuizType | null>(null);

onMounted(async () => {
  const quizCurrent = await QuizAPI.show(route.params.id as string);
  quiz.value = quizCurrent.quiz;
});
</script>

<style scoped></style>
