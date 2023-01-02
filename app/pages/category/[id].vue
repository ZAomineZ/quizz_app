<template>
  <AppLayout>
    <div class="page__content">
      <div class="col">
        <h1 class="my_3">Category "{{ categoryCurrent?.name }}"</h1>
        <div class="line my_3"></div>
      </div>
      <div class="col">
        <div class="row">
          <div class="col_6 col_md_4 col_xl_2 p_3" v-for="quiz in quizzes">
            <CardWrap :quiz="quiz" />
          </div>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import Category from "~/utils/api/Category/Category";
import { onMounted } from "#imports";
import { ref } from "vue";
import { Category as CategoryType } from "~/types/Category";
import { useRoute } from "nuxt/app";
import { Quiz as QuizType } from "~/types/Quiz";

const route = useRoute();
const params = route.params;
const categoryAPI = new Category();

const categoryCurrent = ref<CategoryType | null>(null);
const quizzes = ref<QuizType[]>([]);

onMounted(async () => {
  // Get category current
  let categorySlug = params?.id as string;
  const categoryBySlug = await categoryAPI.showSlug(categorySlug);
  categoryCurrent.value = categoryBySlug.category;

  // Get all quizzes for the current category
  const quizzesByCategorySlug = await categoryAPI.quizzes(categorySlug);
  quizzes.value = quizzesByCategorySlug.quizzes.data;
});
</script>

<style scoped></style>
