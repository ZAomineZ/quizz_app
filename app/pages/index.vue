<template>
  <AppLayout>
    <div class="page__content">
      <div class="col">
        <h1 class="my_3">Derniers Quiz</h1>
        <div class="line my_3"></div>
      </div>
      <div class="col">
        <div class="row">
          <div class="col_6 col_md_4 col_xl_3 p_3" v-for="item in [1, 1, 1, 1]">
            <CardWrap/>
          </div>
        </div>
      </div>
      <div class="col">
        <h1 class="my_3">Catégories</h1>
        <div class="line my_3"></div>
      </div>
      <div class="col">
        <Lists/>
      </div>
      <div class="col">
        <h1 class="my_3">Derniers Quiz</h1>
        <div class="line my_3"></div>
      </div>
      <div class="col">
        <div class="row">
          <div class="col_6 col_md_4 col_xl_3 p_3" v-for="item in [1, 1, 1, 1]">
            <CardWrap/>
          </div>
        </div>
      </div>
      <div class="col">
        <h1 class="my_3">Derniers Quiz</h1>
        <div class="line my_3"></div>
      </div>
      <div class="col">
        <div class="row">
          <div class="col_6 col_md_4 col_xl_3 p_3" v-for="item in [1, 1, 1, 1]">
            <CardWrap/>
          </div>
        </div>
      </div>
      <div class="col">
        <h1 class="my_3">Derniers Quiz</h1>
        <div class="line my_3"></div>
      </div>
      <div class="col">
        <div class="row">
          <div class="col_6 col_md_4 col_xl_3 p_3" v-for="item in [1, 1, 1, 1]">
            <CardWrap/>
          </div>
        </div>
      </div>
<!--      <div class="col">-->
<!--        <div class="col_12 py-2">-->
<!--          <div class="my_3">-->
<!--            <div class="row">-->
<!--              <div class="col_12">-->
<!--                <div class="my_3 text_center">-->
<!--                  <Pagination/>-->
<!--                </div>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import AppLayout from "~/components/AppLayout.vue";
import Pagination from "~/components/Pagination/Pagination.vue";
</script>

<style scoped>

</style>