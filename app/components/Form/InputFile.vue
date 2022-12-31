<template>
  <input type="file" :class="className" />
</template>

<script setup lang="ts">
interface Props {
  className?: string;
}
const props = withDefaults(defineProps<Props>(), {
  className: ""
});
</script>

<style scoped></style>
