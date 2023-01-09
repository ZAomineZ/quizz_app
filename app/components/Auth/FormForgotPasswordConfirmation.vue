<template>
  <div class="form__container">
    <Alert :message="messageError" v-if="messageError" />
    <form action="#" method="POST" @submit.prevent="handleSubmit">
      <div class="form__wrapper">
        <div class="form__wrapper_headline">Forgot Password ?</div>
        <div class="form__field_wrap">
          <div class="form_field_input">
            <Input
              type="password"
              placeholder="New password"
              :class="`form_control form__field${
                errorsValidation.find((error) => error.field === 'new_password')
                  ? ' form_invalid'
                  : ''
              }`"
              v-model="credentials.new_password"
            />
            <i class="fa fa-sharp fa-solid fa-envelope"></i>
          </div>
          <div
            class="invalid_feedback"
            v-if="
              errorsValidation.find((error) => error.field === 'new_password')
            "
          >
            {{
              errorsValidation.find((error) => error.field === "new_password")
                .message
            }}
          </div>
        </div>
        <div class="form__field_wrap">
          <div class="form_field_input">
            <Input
              type="password"
              placeholder="New password confirmation"
              :class="`form_control form__field${
                errorsValidation.find(
                  (error) => error.field === 'new_password_confirmation'
                )
                  ? ' form_invalid'
                  : ''
              }`"
              v-model="credentials.new_password_confirmation"
            />
            <i class="fa fa-sharp fa-solid fa-envelope"></i>
          </div>
          <div
            class="invalid_feedback"
            v-if="
              errorsValidation.find(
                (error) => error.field === 'new_password_confirmation'
              )
            "
          >
            {{
              errorsValidation.find(
                (error) => error.field === "new_password_confirmation"
              ).message
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
    </form>
  </div>
</template>

<script setup lang="ts">
import ForgotPassword from "~/utils/api/Auth/ForgotPassword";
import { reactive, ref } from "vue";
import { IValidationError } from "~/types/Error";
import { useRoute } from "nuxt/app";
import Input from "~/components/Form/Input.vue";
import Alert from "~/components/Message/Alert.vue";
import { navigateTo } from "#imports";

let route = useRoute();
let params = route.params;
let email = params?.email as string;
let token = params?.token as string;

const forgotPasswordAPI = new ForgotPassword();
const credentials = reactive({
  new_password: "",
  new_password_confirmation: ""
});
const messageError = ref<string | null>(null);
const errorsValidation = ref<IValidationError[]>([]);

// methods
const handleSubmit = async (e: SubmitEvent) => {
  e.preventDefault();

  const response = await forgotPasswordAPI.confirmation(
    credentials,
    email,
    token
  );
  if (response.errors) {
    // ERRORS VALIDATION
    errorsValidation.value = response.errors;
    return;
  }
  if (response.message && !response.success) {
    // MESSAGE ERROR
    messageError.value = response.message;
    return;
  }
  if (response.success) {
    await navigateTo("/login");
  }
};
</script>

<style scoped></style>
