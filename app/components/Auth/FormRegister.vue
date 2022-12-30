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
        <div class="form__wrapper_headline">Create an account</div>
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
              type="text"
              placeholder="Email Address"
              :class="`form_control form__field${
                errorsValidation.find((error) => error.field === 'email')
                  ? ' form_invalid'
                  : ''
              }`"
              v-model="credentials.email"
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
              v-model="credentials.first_name"
            />
            <i class="fa fa-solid fa-user"></i>
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
              v-model="credentials.last_name"
            />
            <i class="fa fa-solid fa-user"></i>
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
import { reactive, ref } from "vue";
import Auth from "~/utils/api/Auth/Auth";
import Alert from "~/components/Message/Alert.vue";
import { useRouter } from "nuxt/app";
import { IValidationError } from "~/types/Error";

const userAPI = new Auth();
const router = useRouter();

const credentials = reactive({
  username: "",
  email: "",
  password: "",
  first_name: "",
  last_name: ""
});
const messageError = ref<string | null>(null);
const errorsValidation = ref<IValidationError[]>([]);

// Methods
const handleSubmit = async (e: SubmitEvent) => {
  e.preventDefault();

  const response = await userAPI.register(credentials);
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
  await router.push("/login");
};
</script>

<style scoped lang="scss"></style>
