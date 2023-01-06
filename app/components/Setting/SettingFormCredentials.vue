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
        <div class="form__wrapper_headline">Vos paramètres</div>
        <div class="form__field_wrap">
          <div class="form_field_input">
            <Input
              type="text"
              placeholder="Username"
              :class="`form_control form__field${
                errorsValidation.find((error) => error.field === 'username')
                  ? ' form_invalid'
                  : ''
              }`"
              v-model="credentials.username"
            />
            <i class="fa fa-regular fa-face-smile"></i>
          </div>
          <div
            class="invalid_feedback"
            v-if="errorsValidation.find((error) => error.field === 'username')"
          >
            {{
              errorsValidation.find((error) => error.field === "username")
                .message
            }}
          </div>
        </div>
        <div class="form__field_wrap">
          <div class="form_field_input">
            <Input
              type="email"
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
              type="text"
              placeholder="First Name"
              :class="`form_control form__field${
                errorsValidation.find((error) => error.field === 'first_name')
                  ? ' form_invalid'
                  : ''
              }`"
              v-model="credentials.firstName"
            />
            <i class="fa fa-regular fa-face-smile"></i>
          </div>
          <div
            class="invalid_feedback"
            v-if="
              errorsValidation.find((error) => error.field === 'first_name')
            "
          >
            {{
              errorsValidation.find((error) => error.field === "first_name")
                .message
            }}
          </div>
        </div>
        <div class="form__field_wrap">
          <div class="form_field_input">
            <Input
              type="text"
              placeholder="Last Name"
              :class="`form_control form__field${
                errorsValidation.find((error) => error.field === 'last_name')
                  ? ' form_invalid'
                  : ''
              }`"
              v-model="credentials.lastName"
            />
            <i class="fa fa-regular fa-face-smile"></i>
          </div>
          <div
            class="invalid_feedback"
            v-if="errorsValidation.find((error) => error.field === 'last_name')"
          >
            {{
              errorsValidation.find((error) => error.field === "last_name")
                .message
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
import { reactive, ref } from "vue";
import Setting from "~/utils/api/Setting/Setting";
import { IValidationError } from "~/types/Error";
import { useAuthUser } from "~/composables/auth";

const settingAPI = new Setting();
const user = useAuthUser();

const credentials = reactive({
  username: user.value?.username ?? "",
  email: user.value?.email ?? "",
  firstName: user.value?.first_name ?? "",
  lastName: user.value?.last_name ?? ""
});
const message = ref<string | null>(null);
const messageError = ref<string | null>(null);
const errorsValidation = ref<IValidationError[]>([]);

// Methods
const handleSubmit = async () => {
  let formData = new FormData();
  formData.append("username", credentials.username);
  formData.append("email", credentials.email);
  formData.append("last_name", credentials.lastName);
  formData.append("first_name", credentials.firstName);

  const response = await settingAPI.changeCredentials(formData);

  if (response.errors) {
    // ERRORS VALIDATION
    errorsValidation.value = response.errors;
    return;
  }

  if (response.success) {
    message.value = response.message;
    // Change user credentials
    user.value = response.user;
  } else {
    messageError.value = response.message;
  }

  setTimeout(() => (message.value = null), 3000);
  setTimeout(() => (messageError.value = null), 3000);
};
</script>

<style scoped></style>
