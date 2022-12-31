<template>
  <AppLayout>
    <div class="page__content">
      <div class="col">
        <h1 class="my_3">Proposer un quiz</h1>
        <div class="line my_3"></div>
      </div>
      <div class="col">
        <div class="d_flex align_items_center my_3">
          <QuizSubmitForm :categories="categories" />
        </div>
        <div class="d_flex align_items_center my_3">
          <QuizSubmitQuestion />
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

onMounted(async () => {
  const response = await categoryAPI.list();
  categories.value = response.categories;
});
</script>

<style scoped></style>
