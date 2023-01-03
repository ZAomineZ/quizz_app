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
        <h1 class="my_3">Catégories Populaires</h1>
        <div class="line my_3"></div>
      </div>
      <div class="col">
        <Lists :categories="categoriesViews" />
      </div>
      <div class="col">
        <h1 class="my_3">Quiz Populaire</h1>
        <div class="line my_3"></div>
      </div>
      <div class="col">
        <div class="row">
          <div class="col_6 col_md_4 col_xl_3 p_3" v-for="quiz in quizzesViews">
            <CardWrap :quiz="quiz" />
          </div>
        </div>
      </div>
      <div class="col">
        <h1 class="my_3">Quiz "{{ categoryViewsFirstName }}" populaire</h1>
        <div class="line my_3"></div>
      </div>
      <div class="col">
        <div class="row">
          <div
            class="col_6 col_md_4 col_xl_3 p_3"
            v-for="quiz in quizzesViewsFirstCategory"
          >
            <CardWrap :quiz="quiz" />
          </div>
        </div>
      </div>
      <div class="col">
        <h1 class="my_3">Quiz "{{ categoryViewsSecondName }}" populaire</h1>
        <div class="line my_3"></div>
      </div>
      <div class="col">
        <div class="row">
          <div
            class="col_6 col_md_4 col_xl_3 p_3"
            v-for="quiz in quizzesViewsSecondCategory"
          >
            <CardWrap :quiz="quiz" />
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
import { Category as CategoryType } from "~/types/Category";
import CategoryAPI from "~/utils/api/Category/Category";

const Quiz = new QuizAPI();
const Category = new CategoryAPI();

const quizzes = ref<QuizType[]>([]);
const quizzesViews = ref<QuizType[]>();
const quizzesViewsFirstCategory = ref<QuizType[]>();
const quizzesViewsSecondCategory = ref<QuizType[]>();
const categoryViewsFirstName = ref<CategoryType | null>(null);
const categoryViewsSecondName = ref<CategoryType | null>(null);
const categoriesViews = ref<CategoryType[]>([]);
const categories = ref<CategoryType[]>([]);

onMounted(async () => {
  let quizzesLatest = await Quiz.latest();
  let categoriesList = await Category.list();
  let quizzesMostViews = await Quiz.mostViews();
  let categoriesMostViews = await Category.mostViews();
  let quizzesTwoCategoryMostViews = await Quiz.mostViewTwoCategory();

  quizzes.value = quizzesLatest.quizzes;
  categories.value = categoriesList.categories;
  quizzesViews.value = quizzesMostViews.quizzes;
  categoriesViews.value = categoriesMostViews.categories;
  quizzesViewsFirstCategory.value =
    quizzesTwoCategoryMostViews.quizzesFirstCategory;
  quizzesViewsSecondCategory.value =
    quizzesTwoCategoryMostViews.quizzesSecondCategory;
  categoryViewsFirstName.value = quizzesTwoCategoryMostViews.categoryFirstName;
  categoryViewsSecondName.value =
    quizzesTwoCategoryMostViews.categorySecondName;
});
</script>

<style scoped></style>
