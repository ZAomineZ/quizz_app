<template>
  <span aria-current="page" class="page__numbers current">1</span>
  <a href="#" class="page__numbers">2</a>
  <a href="#" class="page__numbers">
    <i class="fas fa-angle-right"></i>
  </a>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
.page__numbers,
.page__numbers a,
.page__numbers a:hover,
.page__numbers li.active a,
.page__numbers.disabled {
  display: inline-block;
  padding: .25rem .75rem;
  width: 35px;
  height: 35px;
  font-size: 16px;
  vertical-align: middle;
  cursor: pointer;
}

.page__numbers {
  color: #ffffff !important;
  background-color: var(--color-red);
  border-color: var(--color-red);
  border-radius: 2rem;
  margin-right: 3px;

  &.current {
    font-weight: 500;
  }
}
</style>