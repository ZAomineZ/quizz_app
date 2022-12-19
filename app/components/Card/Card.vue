<template>
  <div :class="`card border_0 shadow__sm ${className}`">
    <slot/>
  </div>
</template>

<script setup lang="ts">
interface Props {
  className: string
}

const props = withDefaults(defineProps<Props>(), {
  className: ""
});
</script>

<style scoped>
  .card {
    display: flex;
    position: relative;
    flex-direction: column;
    min-width: 0;
    word-break: break-word;
    background: #ffffff;
    border-radius: 0.5rem !important;
  }
</style>