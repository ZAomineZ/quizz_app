<template>
  <AppLayout>
    <div class="container__fluid">
      <div class="row">
        <div class="col_12 col_lg_5 col_xl_4 order_2 order_lg_1 my_auto">
          <div class="d_flex align_items_center my_3">
            <FormForgotPasswordConfirmation />
          </div>
        </div>
        <div class="col_12 col_lg_7 col_xl_8 order_1 order_lg_2 my_auto">
          <div class="d_flex align_items_center my_3">
            <img
              class="img__fluid w_100"
              width="1024"
              height="650"
              src="https://demo.ramsthemes.com/projects/animace/wp-content/uploads/2021/11/matt-popovich-0FZrPECK5cg-unsplash-1024x650.jpg"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import FormForgotPasswordConfirmation from "~/components/Auth/FormForgotPasswordConfirmation";
</script>

<style scoped></style>
