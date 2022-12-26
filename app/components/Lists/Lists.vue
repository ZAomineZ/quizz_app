<template>
  <ul class="lists my_4">
    <ListItem :category="category" v-for="category in props.categories" />
  </ul>
</template>

<script setup lang="ts">
import ListItem from "~/components/Lists/ListItem.vue";
import { Category } from "~/types/Category";

interface Props {
  categories: Category[];
}

const props = withDefaults(defineProps<Props>(), {});
</script>

<style scoped>
.lists {
  padding: 0;
  list-style-position: inside;
  columns: 3;
}
</style>
