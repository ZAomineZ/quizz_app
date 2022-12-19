<template>
  <a href="#" class="btn btn__custom btn_sm mr_2 mb_2">
    <slot/>
    {{ label }}
  </a>
</template>

<script setup lang="ts">
  interface Props {
    label?: string
  }

  const props = withDefaults(defineProps<Props>(), {
    label: ""
  });
</script>

<style scoped>
  .btn__custom {
    color: #ffffff !important;
    background-color: var(--color-red) !important;
    border-color: var(--color-red) !important;
    border-radius: 0.5rem !important;
  }
</style>