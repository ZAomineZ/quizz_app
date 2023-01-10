<template>
  <div :class="`message__${status}`">{{ message }}</div>
</template>

<script lang="ts" setup>
interface Props {
  message: string;
  status: "danger" | "success";
}

const props = withDefaults(defineProps<Props>(), {
  message: "",
  status: "danger"
});
</script>

<style scoped>
.message__danger,
.message__success {
  padding: 10px;
  margin: 10px 0;
  max-width: 100%;
  border-radius: 5px;
  font-size: 16px;
  font-weight: normal;
  text-align: center;
  vertical-align: middle;
  line-height: 1.471;
  background-color: #e74c3c;
  color: #ffffff;
}

.message__success {
  background-color: var(--color-primary);
  color: #ffffff;
}
</style>
