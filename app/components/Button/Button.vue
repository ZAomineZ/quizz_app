<template>
  <button :class="`btn btn_sm ${className}`">
    {{ label }}
  </button>
</template>

<script setup lang="ts">
interface Props {
  label: string;
  className?: string;
}

const props = withDefaults(defineProps<Props>(), {
  className: "",
  label: ""
});
</script>

<style scoped></style>
