<template>
  <input :type="type" :placeholder="placeholder" :class="className">
</template>

<script setup lang="ts">
interface Props {
  type?: string
  className?: string
  placeholder?: string
}

const props = withDefaults(defineProps<Props>(), {
  type: "text",
  className: "",
  placeholder: ""
});
</script>

<style scoped>

</style>