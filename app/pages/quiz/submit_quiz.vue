<template>
  <AppLayout>
    <div class="page__content">
      <div class="col">
        <h1 class="my_3">Proposer un quiz</h1>
        <div class="line my_3"></div>
      </div>
      <div class="col">
        <div
          :class="`d_flex align_items_center my_3${
            !quizSubmitFormState ? ' d_none' : ''
          }`"
        >
          <QuizSubmitForm
            :categories="categories"
            @afterQuizSubmit="afterQuizSubmit"
          />
        </div>
      </div>
      <div class="col" v-if="!quizSubmitFormState">
        <ButtonBadge label="Ajouter une question" @click="addNewQuestion" />
      </div>
      <div class="col" v-for="question in questionsQuiz">
        <div
          :class="`d_flex align_items_center my_3${
            quizSubmitFormState ? ' d_none' : ''
          }`"
        >
          <QuizSubmitQuestion :key="question" :quizID="quizID" />
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script lang="ts" setup>
import QuizSubmitForm from "~/components/Quiz/QuizSubmitForm.vue";
import { definePageMeta } from "#imports";
import { onMounted, ref } from "vue";
import { Category as CategoryType } from "~/types/Category";
import Category from "~/utils/api/Category/Category";

definePageMeta({
  middleware: ["auth"]
});

const categoryAPI = new Category();

const categories = ref<CategoryType[]>([]);
const questionsQuiz = ref([1]);
const quizID = ref<number | null>(null);
const quizSubmitFormState = ref<boolean>(true);

onMounted(async () => {
  const response = await categoryAPI.all();
  categories.value = response.categories;
});

// Methods
const afterQuizSubmit = (quiz_id: number) => {
  quizID.value = quiz_id;
  quizSubmitFormState.value = false;
};

const addNewQuestion = () => {
  let lastValue = questionsQuiz.value[questionsQuiz.value.length - 1] as number;
  questionsQuiz.value.push(lastValue + 1);
};
</script>

<style scoped></style>
