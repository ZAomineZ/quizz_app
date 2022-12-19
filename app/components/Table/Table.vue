<template>
  <table :class="`table table__capitalize ${className}`">
    <tbody>
      <slot/>
    </tbody>
  </table>
</template>

<script setup lang="ts">
  interface Props {
    className: string
  }

  const props = withDefaults(defineProps<Props>(), {
    className: ""
  });
</script>

<style scoped lang="scss">

</style>