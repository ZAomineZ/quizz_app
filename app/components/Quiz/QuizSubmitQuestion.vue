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
              className="form_control form__field"
              v-model="credentials.question"
            />
            <i class="fa fa-regular fa-face-smile"></i>
          </div>
        </div>
        <div class="form__field_wrap">
          <div class="form_field_input">
            <Input
              type="text"
              placeholder="Bonne Réponse"
              className="form_control form__field"
              v-model="credentials.good_answer"
            />
            <i class="fa fa-solid fa-eye"></i>
          </div>
        </div>
        <div class="form__field_wrap">
          <div class="form_field_input">
            <Input
              type="text"
              placeholder="Mauvaise Réponse (1)"
              className="form_control form__field"
              v-model="credentials.bad_answer_1"
            />
            <i class="fa fa-solid fa-eye"></i>
          </div>
        </div>
        <div class="form__field_wrap">
          <div class="form_field_input">
            <Input
              type="text"
              placeholder="Mauvaise Réponse (2)"
              className="form_control form__field"
              v-model="credentials.bad_answer_2"
            />
            <i class="fa fa-solid fa-eye"></i>
          </div>
        </div>
        <div class="form__field_wrap">
          <div class="form_field_input">
            <Input
              type="text"
              placeholder="Mauvaise Réponse (3)"
              className="form_control form__field"
              v-model="credentials.bad_answer_3"
            />
            <i class="fa fa-solid fa-eye"></i>
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

const handleSubmit = async () => {
  const response = await quizSubmitAPI.submitQuestion(
    props.quizID,
    credentials
  );

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
