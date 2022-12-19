<template>
  <ul class="lists my_4">
    <ListItem/>
    <ListItem/>
    <ListItem/>
    <ListItem/>
    <ListItem/>
    <ListItem/>
    <ListItem/>
    <ListItem/>
    <ListItem/>
  </ul>
</template>

<script setup lang="ts">
import ListItem from "~/components/Lists/ListItem.vue";
</script>

<style scoped>
  .lists {
    padding: 0;
    list-style-position: inside;
    columns: 3;
  }
</style>