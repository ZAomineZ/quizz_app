<template>
  <input
    :type="type"
    :placeholder="placeholder"
    :class="className"
    v-model.trim="value"
  />
</template>

<script setup lang="ts">
import { computed } from "vue";

interface Props {
  type?: string;
  className?: string;
  placeholder?: string;
  modelValue?: string;
  defaultValue?: string;
}

interface Events {
  (e: "update:modelValue", value: string): void;
}

const emit = defineEmits<Events>();

const props = withDefaults(defineProps<Props>(), {
  type: "text",
  className: "",
  placeholder: "",
  modelValue: "",
  defaultValue: ""
});

const value = computed({
  get() {
    return props.defaultValue.length !== 0
      ? props.defaultValue
      : props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  }
});
</script>

<style scoped></style>
