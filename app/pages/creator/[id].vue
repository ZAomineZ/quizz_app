<template>
  <AppLayout>
    <div class="page__content">
      <div class="col">
        <h1 class="my_3">Créateur "{{ creatorCurrent?.username }}"</h1>
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
import { useRoute } from "nuxt/app";
import Creator from "~/utils/api/Creator/Creator";
import { onMounted, ref } from "vue";
import { User as UserType } from "~/types/User";
import { Quiz as QuizType } from "~/types/Quiz";
import { PaginationType } from "~/types/Pagination";
import { navigateTo } from "#imports";

const route = useRoute();
const params = route.params;
let creatorID = params?.id as string;

let creatorAPI = new Creator();

const creatorCurrent = ref<UserType | null>(null);
const quizzes = ref<QuizType[]>([]);
const pagination = ref<PaginationType | null>(null);

onMounted(async () => {
  // Get creator current
  try {
    const creatorResponse = await creatorAPI.show(creatorID);
    creatorCurrent.value = creatorResponse.creator;
  } catch (err) {
    navigateTo("/creator");
  }

  // Get all quizzes for the current creator
  await list(1);
});

// Methods
const list = async (page: number) => {
  const quizzesResponse = await creatorAPI.quizzes(creatorID, page);
  quizzes.value = quizzesResponse.quizzes.data;
  pagination.value = quizzesResponse.quizzes.meta;
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
