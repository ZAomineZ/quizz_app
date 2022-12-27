<template>
  <select class="select" v-model.trim="value">
    <slot />
  </select>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface Props {
  modelValue: string;
}

interface Events {
  (e: "update:modelValue", value: string): void;
}

const emit = defineEmits<Events>();

const props = withDefaults(defineProps<Props>(), {});

const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  }
});
</script>

<style scoped lang="scss">
.select {
  display: block;
  width: 100%;
  height: calc(1.5em + 0.5rem + 2px);
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
  line-height: 1.5;
  font-weight: 400;
  color: var(--color-gray-darker);
  background-color: #ffffff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
</style>
