<template>
  <AppLayout>
    <div class="page__content">
      <div class="col">
        <h1 class="my_3">Catégories</h1>
        <div class="line my_3"></div>
      </div>
      <div class="col">
        <div class="row">
          <div class="col_12 mb_3">
            <Lists :categories="categories" />
          </div>
        </div>
      </div>
      <div class="col">
        <div class="col_12 py-2">
          <div class="my_3">
            <div class="row">
              <div class="col_12">
                <div class="my_3 text_center">
                  <Pagination />
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
import Lists from "~/components/Lists/Lists.vue";
import { onMounted, ref } from "vue";
import { Category as CategoryType } from "~/types/Category";
import Category from "~/utils/api/Category/Category";

const categoryAPI = new Category();

const categories = ref<CategoryType[]>([]);

onMounted(async () => {
  const categoriesList = await categoryAPI.list();

  categories.value = categoriesList.categories;
});
</script>

<style scoped></style>
