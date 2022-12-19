<template>
  <select class="select">
    <slot/>
  </select>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
  .select {
    display: block;
    width: 100%;
    height: calc(1.5em + 0.5rem + 2px);
    padding: 0.25rem 0.5rem;
    font-size: .875rem;
    line-height: 1.5;
    font-weight: 400;
    color: var(--color-gray-darker);
    background-color: #ffffff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    transition: border-color .15s ease-in-out, box-shadow .15s ease-in-out;
  }
</style>