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
      <div class="col">
        <div class="col_12 py-2">
          <div class="my_3">
            <div class="row">
              <div class="col_12">
                <div class="my_3 text_center">
                  <Pagination
                    :totalPages="pagination?.last_page"
                    :currentPage="pagination?.current_page"
                    :handle-page="handlePage"
                    :next-page="nextPage"
                    :prev-page="prevPage"
                    v-if="pagination?.last_page !== 1"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import Category from "~/utils/api/Category/Category";
import { navigateTo, onMounted } from "#imports";
import { ref } from "vue";
import { Category as CategoryType } from "~/types/Category";
import { useRoute } from "nuxt/app";
import { Quiz as QuizType } from "~/types/Quiz";
import ViewCategory from "~/utils/api/View/ViewCategory";
import { PaginationType } from "~/types/Pagination";

const route = useRoute();
const params = route.params;
let categorySlug = params?.id as string;

const categoryAPI = new Category();
const viewCategoryAPI = new ViewCategory();

const categoryCurrent = ref<CategoryType | null>(null);
const quizzes = ref<QuizType[]>([]);
const pagination = ref<PaginationType | null>(null);

onMounted(async () => {
  // Get category current
  try {
    const categoryBySlug = await categoryAPI.showSlug(categorySlug);
    categoryCurrent.value = categoryBySlug.category;
  } catch (err) {
    return navigateTo("/category");
  }

  // Add views
  await viewCategoryAPI.addView(categorySlug);

  // Get all quizzes for the current category
  await list(1);
});

// Methods
const list = async (page: number) => {
  const quizzesByCategorySlug = await categoryAPI.quizzes(categorySlug, page);
  quizzes.value = quizzesByCategorySlug.quizzes.data;
  pagination.value = quizzesByCategorySlug.quizzes.meta;
};

const handlePage = async (page: number) => {
  await list(page);
};

const nextPage = async (page: number) => {
  await list(page);
};

const prevPage = async (page: number) => {
  await list(page);
};
</script>

<style scoped></style>
