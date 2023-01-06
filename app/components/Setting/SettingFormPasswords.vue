<template>
  <div class="form__container form__container_setting">
    <Alert :message="message" v-if="message" />
    <Alert :message="messageError" v-if="messageError" />
    <form
      action="#"
      method="POST"
      enctype="multipart/form-data"
      @submit.prevent="handleSubmit"
    >
      <div class="form__wrapper">
        <div class="form__wrapper_headline">Changer votre mot de passe</div>
        <div class="form__field_wrap">
          <div class="form_field_input">
            <Input
              type="password"
              placeholder="Mot de passe actuel"
              :class="`form_control form__field${
                errorsValidation.find(
                  (error) => error.field === 'password_current'
                )
                  ? ' form_invalid'
                  : ''
              }`"
              v-model="credentials.password_current"
            />
            <i class="fa fa-solid fa-eye"></i>
          </div>
          <div
            class="invalid_feedback"
            v-if="
              errorsValidation.find(
                (error) => error.field === 'password_current'
              )
            "
          >
            {{
              errorsValidation.find(
                (error) => error.field === "password_current"
              ).message
            }}
          </div>
        </div>
        <div class="form__field_wrap">
          <div class="form_field_input">
            <Input
              type="password"
              placeholder="Nouveau mot de passe"
              :class="`form_control form__field${
                errorsValidation.find((error) => error.field === 'new_password')
                  ? ' form_invalid'
                  : ''
              }`"
              v-model="credentials.new_password"
            />
            <i class="fa fa-solid fa-eye"></i>
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
              placeholder="Confirmation nouveau mot de passe"
              :class="`form_control form__field${
                errorsValidation.find(
                  (error) => error.field === 'new_password_confirmation'
                )
                  ? ' form_invalid'
                  : ''
              }`"
              v-model="credentials.new_password_confirmation"
            />
            <i class="fa fa-solid fa-eye"></i>
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
            default-value="Enregistrer"
          />
        </div>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import Input from "~/components/Form/Input.vue";
import Alert from "~/components/Message/Alert.vue";
import Setting from "~/utils/api/Setting/Setting";
import { reactive, ref } from "vue";
import { IValidationError } from "~/types/Error";

const settingAPI = new Setting();

const credentials = reactive({
  password_current: "",
  new_password: "",
  new_password_confirmation: ""
});
const message = ref<string | null>(null);
const messageError = ref<string | null>(null);
const errorsValidation = ref<IValidationError[]>([]);

// Methods
const handleSubmit = async () => {
  let formData = new FormData();
  formData.append("password_current", credentials.password_current);
  formData.append("new_password", credentials.new_password);
  formData.append(
    "new_password_confirmation",
    credentials.new_password_confirmation
  );

  const response = await settingAPI.changePasswords(formData);

  if (response.errors) {
    // ERRORS VALIDATION
    errorsValidation.value = response.errors;
    return;
  }

  if (response.success) {
    message.value = response.message;
  } else {
    messageError.value = response.message;
  }

  setTimeout(() => (message.value = null), 3000);
  setTimeout(() => (messageError.value = null), 3000);
};
</script>

<style scoped></style>
