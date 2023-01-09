<template>
  <AppLayout>
    <div class="page__content">
      <div class="col">
        <h1 class="my_3">Créateurs</h1>
        <div class="line my_3"></div>
      </div>
      <div class="col">
        <div class="row">
          <div class="col_12 mb_3" v-for="creator in creators">
            <div class="row">
              <div class="col_4 col_sm_3 col_md_2">
                <div class="img__wrap">
                  <NuxtLink :href="`/creator/${creator.id}`">
                    <img
                      class="img__fluid shadow"
                      :src="`${runtimeConfig.public.apiURL}${creator?.image}`"
                      alt=""
                    />
                  </NuxtLink>
                </div>
              </div>
              <div class="col">
                <div class="py_3">
                  <h6>{{ creator.username }}</h6>
                  {{ creator?.meta?.quizzes_count }} results
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

<script setup lang="ts">
import Creator from "~/utils/api/Creator/Creator";
import { onMounted, ref } from "vue";
import { User as UserType } from "~/types/User";
import { PaginationType } from "~/types/Pagination";
import { useRuntimeConfig } from "#app";

const creatorAPI = new Creator();

const creators = ref<UserType[]>([]);
const pagination = ref<PaginationType | null>(null);

const runtimeConfig = useRuntimeConfig();

onMounted(async () => {
  await list(1);
});

// Methods
const list = async (page: number) => {
  const creatorsList = await creatorAPI.list(page);

  creators.value = creatorsList.creators.data;
  pagination.value = creatorsList.creators.meta;
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
