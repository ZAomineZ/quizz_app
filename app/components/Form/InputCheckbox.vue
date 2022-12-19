<template>
  <div class="input__checkbox">
    <span class="input__checkbox_value">{{ label }}</span>
    <span class="input__checkbox_counter">({{ count }})</span>
  </div>
</template>

<script setup lang="ts">
  interface Props {
    label?: string
    count?: number
  }

  const props = withDefaults(defineProps<Props>(), {
    label: "",
    count: 0
  });
</script>

<style scoped lang="scss">
  .input__checkbox {
    background: url("/img/checkbox.png") 0 50% no-repeat;
    background-size: 14px 14px;
    margin-bottom: 4px;
    padding-left: 20px;
    cursor: pointer;

    .input__checkbox_value {
      padding-right: 5px;
    }
  }
</style>