<template>
  <AppLayout>
    <div class="page__content">
      <div class="container__fluid my_3">
        <div class="my_3">
          <div class="row">
            <div class="col_12">
              <Card class-name="card_custom">
                <CardBody class-name="p_3">
                  <Table class-name="table_bordered">
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Category</th>
                      <th>Description</th>
                      <th>Difficulty</th>
                      <th>Valider(?)</th>
                      <th>Lien</th>
                    </tr>
                    <tr v-for="(quiz, index) in quizzes">
                      <th>{{ index }}</th>
                      <th>{{ quiz.title }}</th>
                      <th>{{ quiz?.category?.name }}</th>
                      <th>{{ quiz?.description }}</th>
                      <th>{{ quiz?.difficulty }}</th>
                      <th>{{ quiz?.is_public ? "Oui" : "Non" }}</th>
                      <th>
                        <NuxtLink :to="`/quiz/${quiz.slug}`">Lien</NuxtLink>
                      </th>
                    </tr>
                  </Table>
                </CardBody>
              </Card>
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
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import { definePageMeta } from "#imports";
import { onMounted, ref } from "vue";
import Quiz from "~/utils/api/Quiz/Quiz";
import { Quiz as QuizType } from "~/types/Quiz";
import { PaginationType } from "~/types/Pagination";

definePageMeta({
  middleware: ["auth"]
});

const quizAPI = new Quiz();

const quizzes = ref<QuizType[]>([]);
const pagination = ref<PaginationType | null>(null);

onMounted(async () => {
  await list(1);
});

// Methods
const list = async (page: number) => {
  const response = await quizAPI.me(page);

  quizzes.value = response.quizzes.data;
  pagination.value = response.quizzes.meta;
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
