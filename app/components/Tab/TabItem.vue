<template>
  <li class="nav_item" role="presentation">
    <a href="#" :class="`nav_link${active ? ' active' : ''}`" role="tab">{{
      title
    }}</a>
  </li>
</template>

<script setup lang="ts">
interface Props {
  title: string;
  active: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  title: "",
  active: false
});
</script>

<style scoped></style>
