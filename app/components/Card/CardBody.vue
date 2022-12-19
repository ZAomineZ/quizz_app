<template>
  <div :class="`card__body ${className}`">
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
.card__body {
  flex: 1 1 auto;
  min-height: 1px;
  padding: 1.25rem;
  border-radius: .5rem !important;
}
</style>