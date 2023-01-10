<template>
  <div class="form__container">
    <Alert :message="messageError" v-if="messageError" />
    <form
      action="#"
      method="POST"
      enctype="multipart/form-data"
      @submit="handleSubmit"
    >
      <div class="form__wrapper">
        <div class="form__wrapper_headline">Sign in to Your Account</div>
        <div class="form__field_wrap">
          <div class="form_field_input">
            <Input
              type="text"
              placeholder="Email"
              :class="`form_control form__field${
                errorsValidation.find((error) => error.field === 'email')
                  ? ' form_invalid'
                  : ''
              }`"
              v-model="credentials.email"
            />
            <i class="fa fa-regular fa-face-smile"></i>
          </div>
          <div
            class="invalid_feedback"
            v-if="errorsValidation.find((error) => error.field === 'email')"
          >
            {{
              errorsValidation.find((error) => error.field === "email").message
            }}
          </div>
        </div>
        <div class="form__field_wrap">
          <div class="form_field_input">
            <Input
              type="password"
              placeholder="Password"
              :class="`form_control form__field${
                errorsValidation.find((error) => error.field === 'password')
                  ? ' form_invalid'
                  : ''
              }`"
              v-model="credentials.password"
            />
            <i class="fa fa-solid fa-eye"></i>
          </div>
          <div
            class="invalid_feedback"
            v-if="errorsValidation.find((error) => error.field === 'password')"
          >
            {{
              errorsValidation.find((error) => error.field === "password")
                .message
            }}
          </div>
        </div>
        <div class="form__field_button_wrap">
          <Input
            type="submit"
            class-name="btn btn_sm btn__custom"
            defaultValue="Log In"
          />
        </div>
      </div>
      <div class="form__bottom_links">
        <NuxtLink to="/register">Register</NuxtLink>
        <NuxtLink to="/forgot-password">| Lost your password ?</NuxtLink>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import Input from "~/components/Form/Input.vue";
import { reactive, ref } from "vue";
import { useAuth } from "~/composables/auth/useAuth";
import Alert from "~/components/Message/Alert.vue";
import { IValidationError } from "~/types/Error";
import { navigateTo, useNuxtApp } from "#app";

const { login } = useAuth();
const { $showToast } = useNuxtApp();

const credentials = reactive({
  email: "",
  password: ""
});
const messageError = ref<string | null>(null);
const errorsValidation = ref<IValidationError[]>([]);

// Methods
const handleSubmit = async (e: SubmitEvent) => {
  e.preventDefault();

  const response = await login(credentials.email, credentials.password, false);
  if (response.errors) {
    // ERRORS VALIDATION
    errorsValidation.value = response.errors;
    return;
  }
  if (response.message) {
    // MESSAGE ERROR
    messageError.value = response.message;
    return;
  }

  $showToast("You are connected !", "success", 2000);
  await navigateTo("/");
};
</script>

<style scoped></style>
