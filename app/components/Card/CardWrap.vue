<template>
  <div class="img__wrap">
    <NuxtLink :to="`/quiz/${props.quiz?.slug}`">
      <img
        class="img__fluid shadow__sm"
        width="500"
        height="347"
        :src="`${runtimeConfig.public.apiURL}${quiz?.image}`"
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
import { useRuntimeConfig } from "#app";

interface Props {
  quiz: Quiz;
}

const props = withDefaults(defineProps<Props>(), {});

const runtimeConfig = useRuntimeConfig();
</script>

<style scoped></style>
