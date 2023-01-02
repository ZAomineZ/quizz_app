<template>
  <AppLayout>
    <div class="page__content">
      <div class="col">
        <h1 class="my_3">Search Quiz</h1>
        <div class="line my_3"></div>
      </div>
      <div class="col">
        <ButtonBadge label="Filters" @click="toggleFilters">
          <i class="fa fa-solid fa-arrow-down-wide-short"></i>
        </ButtonBadge>
        <div class="collapse show" v-if="showFilter">
          <Card class-name="mb_3">
            <CardBody>
              <div class="row">
                <div class="col_12">
                  <div class="d_inline_block">
                    <span class="mr_3">Select one or more Filters below</span>
                  </div>
                  <div class="d_inline_block">
                    <div class="input_group_search">
                      <Button
                        class-name="btn_secondary border_class"
                        label="Reset all Filters"
                      />
                    </div>
                  </div>
                </div>
                <div class="line my_3"></div>
                <div class="col_12 col_md_6 col_lg_3">
                  <div>
                    <h6>Search</h6>
                    <div class="input_group_search">
                      <span class="input_group_search_wrap">
                        <i></i>
                        <Input
                          placeholder="Search..."
                          type="text"
                          className="form_control form_control_sm rounded"
                          v-model="search"
                        />
                      </span>
                    </div>
                  </div>
                </div>
                <div class="col_12 col_md_6 col_lg_3">
                  <div>
                    <h6>Catégories</h6>
                    <div class="input_group_search">
                      <InputCheckbox
                        :label="category.name"
                        count="20"
                        v-for="category in categories"
                        :checked="category.id.toString() === categoryField"
                        @click="handleCategory(category.id.toString())"
                      />
                      <a href="#" class="input_group_toggle">See more</a>
                      <a href="#" class="input_group_toggle input_group_hidden"
                        >See less</a
                      >
                    </div>
                  </div>
                </div>
                <div class="col_12 col_md_6 col_lg_3">
                  <div>
                    <h6>Sort</h6>
                    <div class="input_group_search">
                      <Select class="form_control" v-model="sortField">
                        <option value="">Sort by</option>
                        <option value="title_a_z">Title (A-Z)</option>
                        <option value="title_z_a">Title (Z-A)</option>
                        <option value="date_newest">Date (Newest)</option>
                        <option value="date_oldest">Date (Oldest)</option>
                        <option value="update_newest">Update (Newest)</option>
                        <option value="update_oldest">Update (Oldest)</option>
                        <option value="questions_desc">Questions (Desc)</option>
                        <option value="questions_asc">Questions (Asc)</option>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <h6>Difficulty</h6>
                    <div class="input_group_search">
                      <Select class="form_control" v-model="difficultyField">
                        <option value="">Sort by</option>
                        <option :value="QuizDifficulty.Easy">
                          {{ QuizDifficulty.Easy }}
                        </option>
                        <option :value="QuizDifficulty.Medium">
                          {{ QuizDifficulty.Medium }}
                        </option>
                        <option :value="QuizDifficulty.Hard">
                          {{ QuizDifficulty.Hard }}
                        </option>
                      </Select>
                    </div>
                  </div>
                </div>
                <div class="col_12 col_md_6 col_lg_3">
                  <div>
                    <h6>Years</h6>
                    <div class="input_group_search">
                      <Select class="form_control" v-model="yearField">
                        <option value="">Sort by</option>
                        <option :value="year" v-for="year in years">
                          {{ year }}
                        </option>
                      </Select>
                    </div>
                  </div>
                </div>
                <div class="col_12">
                  <div class="d_inline_block">
                    <Button
                      class-name="btn_primary border_class"
                      label="Submit"
                      @click="handleSubmit"
                    />
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
      <div class="col">
        <div class="row">
          <div class="col_6 col_md_4 col_xl_2 p_3" v-for="quiz in quizzes">
            <CardWrap :quiz="quiz" />
          </div>
        </div>
      </div>
      <div class="col">
        <div class="col_12 py-2">
          <div class="my_3">
            <div class="row">
              <div class="col_12">
                <div class="my_3 text_center">
                  <Pagination
                    :totalPages="pagination?.last_page"
                    :currentPage="pagination?.current_page"
                    :handle-page="handlePage"
                    :next-page="nextPage"
                    :prev-page="prevPage"
                    v-if="pagination?.last_page !== 1"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import Card from "~/components/Card/Card.vue";
import CardBody from "~/components/Card/CardBody.vue";
import ButtonBadge from "~/components/Button/ButtonBadge.vue";
import Button from "~/components/Button/Button.vue";
import Input from "~/components/Form/Input.vue";
import InputCheckbox from "~/components/Form/InputCheckbox.vue";
import Select from "~/components/Form/Select.vue";
import { onMounted, ref } from "vue";
import { Quiz as QuizType } from "~/types/Quiz";
import { Category as CategoryType } from "~/types/Category";
import Quiz from "~/utils/api/Quiz/Quiz";
import { PaginationType } from "~/types/Pagination";
import Category from "~/utils/api/Category/Category";
import { QuizDifficulty } from "~/types/Quiz";

type Query = {
  value: string;
  key: string;
};

const quiz = new Quiz();
const category = new Category();

const quizzes = ref<QuizType[]>([]);
const showFilter = ref<boolean>(true);
const years = ref<string[]>([]);
const categories = ref<CategoryType[]>();
const pagination = ref<PaginationType | null>(null);
const queries = ref<Query[]>([]);
const search = ref<string>("");
const categoryField = ref<string>("");
const sortField = ref<string>("");
const yearField = ref<string>("");
const difficultyField = ref<QuizDifficulty | string>("");

onMounted(async () => {
  // Get category list
  const categoriesList = await category.list();
  categories.value = categoriesList.categories;

  await sort();
});

// Methods
const toggleFilters = async () => {
  showFilter.value = !showFilter.value;
};

const handleSubmit = async () => {
  await sort();
};

const handleCategory = (category: string) => {
  if (categoryField.value === category) categoryField.value = "";
  else categoryField.value = category;
};

const sort = async (page = 1) => {
  queries.value = [];
  let query = queryData();
  const quizzesSort = await quiz.sort(query, page);

  quizzes.value = quizzesSort.quizzes.data;
  if (years.value.length === 0) {
    years.value = quizzesSort.years;
  }
  pagination.value = quizzesSort.quizzes.meta;
};

const queryData = () => {
  if (search.value.length !== 0) {
    queries.value.push({ value: search.value, key: "s" });
  }

  if (sortField.value.length !== 0) {
    queries.value.push({ value: sortField.value, key: "sort" });
  }

  if (yearField.value.length !== 0) {
    queries.value.push({ value: yearField.value, key: "year" });
  }

  if (difficultyField.value.length !== 0) {
    queries.value.push({ value: difficultyField.value, key: "difficulty" });
  }

  if (categoryField.value.length !== 0) {
    queries.value.push({ value: categoryField.value, key: "categoryId" });
  }

  let resultQuery = "";
  queries.value.forEach((query, index) => {
    resultQuery += `${query.key}=${query.value}`;
    if (index !== queries.value.length - 1) {
      resultQuery += "&";
    }
  });

  return resultQuery;
};

const handlePage = async (page: number) => {
  await sort(page);
};

const nextPage = async (page: number) => {
  await sort(page);
};

const prevPage = async (page: number) => {
  await sort(page);
};
</script>

<style scoped lang="scss">
.input_group_search {
  margin-bottom: 1.5rem;
}

.input_group_search_wrap {
  display: inline-block;
  position: relative;

  i {
    position: absolute;
    right: 0;
    line-height: 1;
    opacity: 0.5;
    height: 100%;
    cursor: pointer;

    &:before {
      content: "";
      display: inline-block;
      width: 30px;
      height: 100%;
      background: url("/img/icon-search.png") no-repeat 5px 50%;
      background-size: 20px 20px;
    }
  }

  input {
    min-width: 240px;
    margin: 0;
    padding-right: 30px;
  }
}

.input_group_hidden {
  display: none;
}

.input_group_toggle {
  cursor: pointer;
}
</style>
