<template>
  <div class="img__wrap">
    <NuxtLink :to="`/quiz/${props.quiz?.slug}`">
      <img
        class="img__fluid shadow__sm"
        width="500"
        height="347"
        src="https://demo.ramsthemes.com/projects/animace/wp-content/uploads/2022/03/action-500x347.jpg"
        alt=""
      />
    </NuxtLink>
  </div>
  <div class="p_2 text_center">
    <h6>
      <NuxtLink :to="`/quiz/${props.quiz?.slug}`">{{
        props.quiz?.title
      }}</NuxtLink>
    </h6>
  </div>
</template>

<script setup lang="ts">
import { Quiz } from "~/types/Quiz";

interface Props {
  quiz: Quiz;
}

const props = withDefaults(defineProps<Props>(), {});
</script>

<style scoped></style>
