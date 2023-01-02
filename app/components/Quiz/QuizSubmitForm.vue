<template>
  <div class="form__container form__container_submit_quiz">
    <Alert :message="message" v-if="message" />
    <Alert :message="messageError" v-if="messageError" />
    <form
      action="#"
      method="POST"
      enctype="multipart/form-data"
      @submit.prevent="handleSubmit"
    >
      <div class="form__wrapper">
        <div class="form__wrapper_headline">Proposer un quiz</div>
        <div class="form__field_wrap">
          <div class="form_field_input">
            <Input
              type="text"
              placeholder="Nom du quiz"
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
              placeholder="Description du quiz"
              className="form_control form__field"
              v-model="credentials.description"
            />
            <i class="fa fa-solid fa-eye"></i>
          </div>
        </div>
        <div class="form__field_wrap">
          <div class="form_field_input">
            <Select v-model="credentials.difficulty">
              <option value="">Choisissez</option>
              <option value="Facile">Facile</option>
              <option value="Moyen">Moyen</option>
              <option value="Difficile">Difficile</option>
            </Select>
          </div>
        </div>
        <div class="form__field_wrap">
          <div class="form_field_input">
            <Select v-model="credentials.category">
              <option value="">Choisissez une catégorie</option>
              <option :value="category.slug" v-for="category in categories">
                {{ category.name }}
              </option>
            </Select>
          </div>
        </div>
        <div class="form__field_wrap">
          <div class="form_field_input">
            <InputFile
              @change="handleFileUpload"
              className="form_control form__field"
            />
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
      <div class="form__bottom_links">
        <NuxtLink to="/register">Register | Lost your password ?</NuxtLink>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
import Input from "~/components/Form/Input.vue";
import Select from "~/components/Form/Select.vue";
import { reactive, ref } from "vue";
import { Category as CategoryType } from "~/types/Category";
import QuizSubmit from "~/utils/api/Quiz/QuizSubmit";
import Alert from "~/components/Message/Alert.vue";
import InputFile from "~/components/Form/InputFile.vue";

interface Props {
  categories: CategoryType[];
}

const props = withDefaults(defineProps<Props>(), {});

const emit = defineEmits(["afterQuizSubmit"]);

const quizSubmitAPI = new QuizSubmit();

const credentials = reactive({
  title: "",
  description: "",
  difficulty: "",
  category: ""
});
const file = ref(null);
const message = ref<string | null>(null);
const messageError = ref<string | null>(null);

// Methods
const handleFileUpload = (e: any) => {
  file.value = e.target?.files[0];
};

const handleSubmit = async () => {
  let formData = new FormData();
  formData.append("title", credentials.title);
  formData.append("description", credentials.description);
  formData.append("difficulty", credentials.difficulty);
  formData.append("category", credentials.category);
  formData.append("image_upload", file.value ?? "");

  const response = await quizSubmitAPI.submit(formData);

  if (response.success) {
    message.value = response.message;
    emit("afterQuizSubmit", response?.quizID);
  } else {
    messageError.value = response.message;
  }

  setTimeout(() => (message.value = null), 3000);
  setTimeout(() => (messageError.value = null), 3000);
};
</script>

<style scoped></style>
