<template>
  <div class="col_12 quiz__bg_color">
    <div class="row">
      <div class="col_12">
        <div class="row justify_content_between">
          <div class="col_12">
            <h1 class="d_inline_block">Quiz: {{ quiz?.title }}</h1>
          </div>
        </div>
        <div class="line my_3"></div>
        <div class="row py_3">
          <div class="col_12 col_md_4">
            <div class="col_sticky_top mb_5">
              <img
                class="img__fluid w_100 shadow"
                width="600"
                height="900"
                :src="`${runtimeConfig.public.apiURL}${quiz?.image}`"
                alt=""
              />
            </div>
          </div>
          <div class="col_12 col_md_8">
            <div class="my_auto">
              <div class="d_inline_block">
                <ButtonBadge
                  label="Commencer le quiz"
                  @click.prevent="startQuiz"
                />
              </div>
            </div>
            <div class="row my_3">
              <div class="col_12">
                <Card class-name="mb_3">
                  <CardBody class-name="p_2">
                    <Table class-name="table__borderless">
                      <tr>
                        <th scope="row">Title</th>
                        <td>
                          <a
                            href="https://demo.ramsthemes.com/projects/animace/manga_authors/takehiko-inoue/"
                            >{{ quiz?.title }}</a
                          >
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">Difficulty</th>
                        <td>
                          <a
                            href="https://demo.ramsthemes.com/projects/animace/manga_authors/takehiko-inoue/"
                            >{{ quiz?.difficulty }}</a
                          >
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">Category</th>
                        <td>
                          <a
                            href="https://demo.ramsthemes.com/projects/animace/manga_authors/takehiko-inoue/"
                            >{{ quiz?.category.name }}</a
                          >
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">User</th>
                        <td>
                          <a
                            href="https://demo.ramsthemes.com/projects/animace/manga_authors/takehiko-inoue/"
                            >{{ quiz?.user.username }}</a
                          >
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">Author</th>
                        <td>
                          <a
                            href="https://demo.ramsthemes.com/projects/animace/manga_authors/takehiko-inoue/"
                            >Takehiko Inoue</a
                          >
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">Author</th>
                        <td>
                          <a
                            href="https://demo.ramsthemes.com/projects/animace/manga_authors/takehiko-inoue/"
                            >Takehiko Inoue</a
                          >
                        </td>
                      </tr>
                    </Table>
                  </CardBody>
                </Card>
                <Card class-name="mb_3">
                  <CardBody>
                    <h5>Description</h5>
                    <p>
                      {{ quiz?.description }}
                    </p>
                  </CardBody>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Card from "../Card/Card.vue";
import { Quiz } from "~/types/Quiz";
import { useRoute, useRouter } from "nuxt/app";
import { useRuntimeConfig } from "#app";
import QuizSessions from "~/utils/api/Quiz/QuizSessions";

interface Props {
  quiz?: Quiz;
}

const route = useRoute();
const router = useRouter();
const quizSessionsAPI = new QuizSessions();

const props = withDefaults(defineProps<Props>(), {});

const runtimeConfig = useRuntimeConfig();

// METHODS
const startQuiz = async () => {
  let quizSlug = route.params.id as string;
  const response = await quizSessionsAPI.start(quizSlug);
  if (response.success) {
    await router.push(`/quiz/${quizSlug}/start`);
  }
};
</script>

<style scoped>
.quiz__bg_color {
  background: linear-gradient(
    0deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(248, 247, 255, 1) 50%,
    rgba(255, 255, 255, 1) 100%
  );
}
</style>
