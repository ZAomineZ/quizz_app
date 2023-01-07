<template>
  <div class="form__container form__container_submit_quiz">
    <Alert :message="message" v-if="message" />
    <Alert :message="messageError" v-if="messageError" />
    <form action="#" method="POST" @submit.prevent="handleSubmit">
      <div class="form__wrapper">
        <div class="form__wrapper_headline">Question</div>
        <div class="form__field_wrap">
          <div class="form_field_input">
            <Input
              type="text"
              placeholder="Question"
              :class="`form_control form__field${
                errorsValidation.find((error) => error.field === 'question')
                  ? ' form_invalid'
                  : ''
              }`"
              v-model="credentials.question"
            />
            <i class="fa fa-regular fa-face-smile"></i>
          </div>
          <div
            class="invalid_feedback"
            v-if="errorsValidation.find((error) => error.field === 'question')"
          >
            {{
              errorsValidation.find((error) => error.field === "question")
                .message
            }}
          </div>
        </div>
        <div class="form__field_wrap">
          <div class="form_field_input">
            <Input
              type="text"
              placeholder="Bonne Réponse"
              :class="`form_control form__field${
                errorsValidation.find((error) => error.field === 'good_answer')
                  ? ' form_invalid'
                  : ''
              }`"
              v-model="credentials.good_answer"
            />
            <i class="fa fa-solid fa-eye"></i>
          </div>
          <div
            class="invalid_feedback"
            v-if="
              errorsValidation.find((error) => error.field === 'good_answer')
            "
          >
            {{
              errorsValidation.find((error) => error.field === "good_answer")
                .message
            }}
          </div>
        </div>
        <div class="form__field_wrap">
          <div class="form_field_input">
            <Input
              type="text"
              placeholder="Mauvaise Réponse (1)"
              :class="`form_control form__field${
                errorsValidation.find((error) => error.field === 'bad_answer_1')
                  ? ' form_invalid'
                  : ''
              }`"
              v-model="credentials.bad_answer_1"
            />
            <i class="fa fa-solid fa-eye"></i>
          </div>
          <div
            class="invalid_feedback"
            v-if="
              errorsValidation.find((error) => error.field === 'bad_answer_1')
            "
          >
            {{
              errorsValidation.find((error) => error.field === "bad_answer_1")
                .message
            }}
          </div>
        </div>
        <div class="form__field_wrap">
          <div class="form_field_input">
            <Input
              type="text"
              placeholder="Mauvaise Réponse (2)"
              :class="`form_control form__field${
                errorsValidation.find((error) => error.field === 'bad_answer_2')
                  ? ' form_invalid'
                  : ''
              }`"
              v-model="credentials.bad_answer_2"
            />
            <i class="fa fa-solid fa-eye"></i>
          </div>
          <div
            class="invalid_feedback"
            v-if="
              errorsValidation.find((error) => error.field === 'bad_answer_2')
            "
          >
            {{
              errorsValidation.find((error) => error.field === "bad_answer_2")
                .message
            }}
          </div>
        </div>
        <div class="form__field_wrap">
          <div class="form_field_input">
            <Input
              type="text"
              placeholder="Mauvaise Réponse (3)"
              :class="`form_control form__field${
                errorsValidation.find((error) => error.field === 'bad_answer_3')
                  ? ' form_invalid'
                  : ''
              }`"
              v-model="credentials.bad_answer_3"
            />
            <i class="fa fa-solid fa-eye"></i>
          </div>
          <div
            class="invalid_feedback"
            v-if="
              errorsValidation.find((error) => error.field === 'bad_answer_3')
            "
          >
            {{
              errorsValidation.find((error) => error.field === "bad_answer_3")
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
import { reactive, ref } from "vue";
import QuizSubmit from "~/utils/api/Quiz/QuizSubmit";
import Alert from "~/components/Message/Alert.vue";
import { IValidationError } from "~/types/Error";

interface Props {
  quizID: number;
}

const props = withDefaults(defineProps<Props>(), {});

const quizSubmitAPI = new QuizSubmit();

const credentials = reactive({
  question: "",
  good_answer: "",
  bad_answer_1: "",
  bad_answer_2: "",
  bad_answer_3: ""
});
const message = ref<string | null>(null);
const messageError = ref<string | null>(null);
const errorsValidation = ref<IValidationError[]>([]);

const handleSubmit = async () => {
  const response = await quizSubmitAPI.submitQuestion(
    props.quizID,
    credentials
  );

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
