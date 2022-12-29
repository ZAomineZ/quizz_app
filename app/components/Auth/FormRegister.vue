<template>
  <div class="form__container">
    <form action="#" method="POST" enctype="multipart/form-data">
      <div class="form__wrapper">
        <div class="form__wrapper_headline">Create an account</div>
        <div class="form__field_wrap">
          <div class="form_field_input">
            <Input
              type="text"
              placeholder="Username"
              class="form_control form__field"
            />
            <i class="fa fa-regular fa-face-smile"></i>
          </div>
        </div>
        <div class="form__field_wrap">
          <div class="form_field_input">
            <Input
              type="text"
              placeholder="Email Address"
              class="form_control form__field"
            />
            <i class="fa fa-sharp fa-solid fa-envelope"></i>
          </div>
        </div>
        <div class="form__field_wrap">
          <div class="form_field_input">
            <Input
              type="password"
              placeholder="Password"
              class="form_control form__field"
            />
            <i class="fa fa-solid fa-eye"></i>
          </div>
        </div>
        <div class="form__field_wrap">
          <div class="form_field_input">
            <Input
              type="text"
              placeholder="First Name"
              class="form_control form__field"
            />
            <i class="fa fa-solid fa-user"></i>
          </div>
        </div>
        <div class="form__field_wrap">
          <div class="form_field_input">
            <Input
              type="text"
              placeholder="Last Name"
              class="form_control form__field"
            />
            <i class="fa fa-solid fa-user"></i>
          </div>
        </div>
        <div class="form__field_button_wrap">
          <Input
            type="submit"
            class-name="btn btn_sm btn__custom"
            default-value="Register"
          />
        </div>
      </div>
      <div class="form__bottom_links">
        <NuxtLink to="/login">Have an account ? Login</NuxtLink>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import Input from "~/components/Form/Input.vue";
</script>

<style scoped lang="scss"></style>
