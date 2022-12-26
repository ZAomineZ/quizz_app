<template>
  <AppLayout>
    <div class="page__content">
      <div class="col">
        <h1 class="my_3">Derniers Quiz</h1>
        <div class="line my_3"></div>
      </div>
      <div class="col">
        <div class="row">
          <div class="col_6 col_md_4 col_xl_3 p_3" v-for="quiz in quizzes">
            <CardWrap :quiz="quiz" />
          </div>
        </div>
      </div>
      <div class="col">
        <h1 class="my_3">Catégories</h1>
        <div class="line my_3"></div>
      </div>
      <div class="col">
        <Lists :categories="categories" />
      </div>
      <div class="col">
        <h1 class="my_3">Derniers Quiz</h1>
        <div class="line my_3"></div>
      </div>
      <div class="col">
        <div class="row">
          <div class="col_6 col_md_4 col_xl_3 p_3" v-for="item in [1, 1, 1, 1]">
            <CardWrap />
          </div>
        </div>
      </div>
      <div class="col">
        <h1 class="my_3">Derniers Quiz</h1>
        <div class="line my_3"></div>
      </div>
      <div class="col">
        <div class="row">
          <div class="col_6 col_md_4 col_xl_3 p_3" v-for="item in [1, 1, 1, 1]">
            <CardWrap />
          </div>
        </div>
      </div>
      <div class="col">
        <h1 class="my_3">Derniers Quiz</h1>
        <div class="line my_3"></div>
      </div>
      <div class="col">
        <div class="row">
          <div class="col_6 col_md_4 col_xl_3 p_3" v-for="item in [1, 1, 1, 1]">
            <CardWrap />
          </div>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import AppLayout from "~/components/AppLayout.vue";
import { onMounted, ref } from "vue";
import QuizAPI from "~/utils/api/Quiz/Quiz";
import { Quiz as QuizType } from "~/types/Quiz";
import CategoryAPI from "~/utils/api/Category/Category";

const Quiz = new QuizAPI();
const Category = new CategoryAPI();

const quizzes = ref<QuizType[]>([]);
const categories = ref([]);

onMounted(async () => {
  let quizzesLatest = await Quiz.latest();
  let categoriesList = await Category.list();

  quizzes.value = quizzesLatest.quizzes;
  categories.value = categoriesList.categories;
});
</script>

<style scoped></style>
