<template>
  <NuxtLink :to="link" class="btn btn__custom btn_sm mr_2 mb_2">
    <slot />
    {{ label }}
  </NuxtLink>
</template>

<script setup lang="ts">
interface Props {
  label?: string;
  link?: string;
}

const props = withDefaults(defineProps<Props>(), {
  label: "",
  link: ""
});
</script>

<style scoped></style>
