<template>
  <input :type="type" :placeholder="placeholder" :class="className" :value="value">
</template>

<script setup lang="ts">
interface Props {
  type?: string
  className?: string
  placeholder?: string
  value?: string
}

const props = withDefaults(defineProps<Props>(), {
  type: "text",
  className: "",
  placeholder: "",
  value: ""
});
</script>

<style scoped>

</style>