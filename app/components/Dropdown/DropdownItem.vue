<template>
  <NuxtLink :href="href" class="dropdown__item">
    <slot />
  </NuxtLink>
</template>

<script setup lang="ts">
interface Props {
  href?: string;
}

const props = withDefaults(defineProps<Props>(), {
  href: ""
});
</script>

<style scoped>
.dropdown__item {
  display: block;
  width: 100%;
  padding: 0.25rem 1.5rem;
  font-weight: 400;
  color: var(--dark-body);
  text-align: inherit;
  white-space: nowrap;
  background-color: transparent;
  border: 0;
  clear: both;
}
</style>
