<template>
  <div class="form__container form__container_submit_quiz">
    <form action="#" method="POST" enctype="multipart/form-data">
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
              <option value="facile">Facile</option>
              <option value="moyen">Moyen</option>
              <option value="difficile">Difficile</option>
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
import { reactive } from "vue";
import { Category as CategoryType } from "~/types/Category";

interface Props {
  categories: CategoryType[];
}

const props = withDefaults(defineProps<Props>(), {});

console.log(props.categories);

const credentials = reactive({
  title: "",
  description: "",
  difficulty: "",
  category: ""
});

// Methods
const handleSubmit = () => {};
</script>

<style scoped></style>
