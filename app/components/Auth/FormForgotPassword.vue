<template>
  <div class="form__container">
    <Alert :message="messageError" v-if="messageError" />
    <form
      action="#"
      method="POST"
      enctype="multipart/form-data"
      @submit.prevent="handleSubmit"
    >
      <div class="form__wrapper">
        <div class="form__wrapper_headline">Forgot Password ?</div>
        <div class="form__field_wrap">
          <div class="form_field_input">
            <Input
              type="text"
              placeholder="Email Address"
              :class="`form_control form__field${
                errorsValidation.find((error) => error.field === 'email')
                  ? ' form_invalid'
                  : ''
              }`"
              v-model="email"
            />
            <i class="fa fa-sharp fa-solid fa-envelope"></i>
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
        <div class="form__field_button_wrap">
          <Input
            type="submit"
            class-name="btn btn_sm btn__custom"
            default-value="Envoyer"
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
import { ref } from "vue";
import { IValidationError } from "~/types/Error";
import Alert from "~/components/Message/Alert.vue";
import ForgotPassword from "~/utils/api/Auth/ForgotPassword";
import Input from "~/components/Form/Input.vue";

const forgotPasswordAPI = new ForgotPassword();
const email = ref<string>("");
const messageError = ref<string | null>(null);
const errorsValidation = ref<IValidationError[]>([]);

// Methods
const handleSubmit = async (e: SubmitEvent) => {
  e.preventDefault();

  const response = await forgotPasswordAPI.sendMail({ email: email.value });
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
};
</script>

<style scoped></style>
