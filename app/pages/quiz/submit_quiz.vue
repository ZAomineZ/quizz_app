<template>
  <AppLayout>
    <div class="page__content">
      <div class="col">
        <h1 class="my_3">Proposer un quiz</h1>
        <div class="line my_3"></div>
      </div>
      <div class="col">
        <div class="d_flex align_items_center my_3">
          <QuizSubmitForm/>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script lang="ts" setup>
import QuizSubmitForm from "~/components/Quiz/QuizSubmitForm.vue";
</script>

<style scoped>

</style>