<template>
  <div class="form__container">
    <form action="#" method="POST" enctype="multipart/form-data">
      <div class="form__wrapper">
        <div class="form__wrapper_headline">Sign in to Your Account</div>
        <div class="form__field_wrap">
          <div class="form_field_input">
            <Input type="text" placeholder="Username or Email" class="form_control form__field"/>
            <i class="fa fa-regular fa-face-smile"></i>
          </div>
        </div>
        <div class="form__field_wrap">
          <div class="form_field_input">
            <Input type="password" placeholder="Password" class="form_control form__field"/>
            <i class="fa fa-solid fa-eye"></i>
          </div>
        </div>
        <div class="form__field_button_wrap">
          <Input type="submit" class-name="btn btn_sm btn__custom" value="Log In"/>
        </div>
      </div>
      <div class="form__bottom_links">
        <NuxtLink to="/register">Register | Lost your password ?</NuxtLink>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import Input from '~/components/Form/Input.vue'
</script>

<style scoped>

</style>