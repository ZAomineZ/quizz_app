<template>
  <div class="form_container form__container_submit_quiz">
    <form action="#" method="POST">
      <div class="form__wrapper">
        <div class="form__wrapper_headline">Proposer un quiz</div>
        <div class="form__field_wrap">
          <div class="form_field_input">
            <Input
              type="text"
              placeholder="Question"
              className="form_control form__field"
              v-model="credentials.title"
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
              v-model="credentials.description"
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
              v-model="credentials.description"
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
              v-model="credentials.description"
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
              v-model="credentials.description"
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

const credentials = reactive({
  question: "",
  good_answer: "",
  bad_answer_1: "",
  bad_answer_2: "",
  bad_answer_3: ""
});
const message = ref<string | null>(null);
const messageError = ref<string | null>(null);

const handleSubmit = async () => {};
</script>

<style scoped></style>
