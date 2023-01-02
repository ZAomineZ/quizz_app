<template>
  <a
    class="page__numbers"
    v-if="currentPage !== 1"
    @click="prevPage(currentPage - 1)"
  >
    <i class="fas fa-angle-left"></i>
  </a>
  <a
    class="page__numbers"
    v-for="page in totalPages"
    v-if="page !== currentPage"
    @click="handlePage(page)"
    >{{ page }}</a
  >
  <span aria-current="page" class="page__numbers current" v-else>{{
    currentPage
  }}</span>
  <a
    class="page__numbers"
    v-if="currentPage !== totalPages"
    @click="nextPage(currentPage + 1)"
  >
    <i class="fas fa-angle-right"></i>
  </a>
</template>

<script setup lang="ts">
interface Props {
  totalPages: number;
  currentPage: number;
  handlePage: (page: number) => void;
  nextPage: (page: number) => void;
  prevPage: (page: number) => void;
}

const props = withDefaults(defineProps<Props>(), {
  totalPages: 1,
  currentPage: 1
});
</script>

<style scoped lang="scss">
.page__numbers,
.page__numbers a,
.page__numbers a:hover,
.page__numbers li.active a,
.page__numbers.disabled {
  display: inline-block;
  padding: 0.25rem 0.75rem;
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
