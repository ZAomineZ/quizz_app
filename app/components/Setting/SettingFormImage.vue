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
        <div class="form__wrapper_headline">Changer votre image de profile</div>
        <div class="form__field_wrap">
          <div class="form_field_input">
            <InputFile
              @change="handleFileUpload"
              :class="`form_control form__field${
                errorsValidation.find((error) => error.field === 'image_upload')
                  ? ' form_invalid'
                  : ''
              }`"
            />
          </div>
          <div
            class="invalid_feedback"
            v-if="
              errorsValidation.find((error) => error.field === 'image_upload')
            "
          >
            {{
              errorsValidation.find((error) => error.field === "image_upload")
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
import InputFile from "~/components/Form/InputFile.vue";
import { ref } from "vue";
import Setting from "~/utils/api/Setting/Setting";
import { IValidationError } from "~/types/Error";
import { useAuthUser } from "~/composables/auth/useAuthUser";

const settingAPI = new Setting();
const user = useAuthUser();

const file = ref(null);
const message = ref<string | null>(null);
const messageError = ref<string | null>(null);
const errorsValidation = ref<IValidationError[]>([]);

// Methods
const handleFileUpload = (e: any) => {
  file.value = e.target?.files[0];
};

const handleSubmit = async () => {
  let formData = new FormData();
  formData.append("image_upload", file.value ?? "");

  const response = await settingAPI.changeImage(formData);

  if (response.errors) {
    // ERRORS VALIDATION
    errorsValidation.value = response.errors;
    return;
  }

  if (response.success) {
    message.value = response.message;
    // Change image user
    if (user.value) {
      user.value.image = response.image ?? null;
    }
  } else {
    messageError.value = response.message;
  }

  setTimeout(() => (message.value = null), 3000);
  setTimeout(() => (messageError.value = null), 3000);
};
</script>

<style scoped></style>
