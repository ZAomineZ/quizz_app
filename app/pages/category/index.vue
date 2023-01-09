<template>
  <AppLayout>
    <div class="page__content">
      <div class="col">
        <h1 class="my_3">Catégories</h1>
        <div class="line my_3"></div>
      </div>
      <div class="col">
        <div class="row">
          <div class="col_12 mb_3" v-for="category in categories">
            <div class="row">
              <div class="col_4 col_sm_3 col_md_2">
                <div class="img__wrap">
                  <NuxtLink :href="`/category/${category.slug}`">
                    <img
                      class="img__fluid shadow"
                      :src="`${runtimeConfig.public.apiURL}${category?.image}`"
                      alt=""
                    />
                  </NuxtLink>
                </div>
              </div>
              <div class="col">
                <div class="py_3">
                  <h6>{{ category.name }}</h6>
                  {{ category?.meta?.quizzes_count }} results
                </div>
              </div>
            </div>
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

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { Category as CategoryType } from "~/types/Category";
import Category from "~/utils/api/Category/Category";
import { useRuntimeConfig } from "#app";
import { PaginationType } from "~/types/Pagination";

const categoryAPI = new Category();

const categories = ref<CategoryType[]>([]);
const pagination = ref<PaginationType | null>(null);

const runtimeConfig = useRuntimeConfig();

onMounted(async () => {
  await list(1);
});

// Methods
const list = async (page: number) => {
  const categoriesList = await categoryAPI.list(page);

  categories.value = categoriesList.categories.data;
  pagination.value = categoriesList.categories.meta;
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
