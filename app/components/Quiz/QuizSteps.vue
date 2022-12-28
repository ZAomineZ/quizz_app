<template>
  <section class="quiz__steps">
    <div class="container">
      <div class="mx_auto col_md_12 col_lg_7">
        <form action="#" id="quiz_steps" method="POST" class="quiz__steps_form">
          <section
            :class="`quiz__step_inner${
              index + 1 !== currentQuestion ? ' d_none' : ''
            }`"
            v-for="(question, index) in quiz?.questions"
          >
            <div class="quiz__step_wrapper">
              <div class="quiz__step_heading">
                <h2>Quiz</h2>
                <p>Fill out this Trivia quiz for fun!</p>
              </div>
              <div class="quiz__step_bar">
                <span class="quiz__step_counter"
                  >Question {{ currentQuestion }} /
                  {{ quiz?.questions.length }}</span
                >
                <div class="quiz__step_bar_inner">
                  <div class="quiz__step_bar_move"></div>
                </div>
              </div>
              <div>
                <div class="quiz__step_form_heading">
                  {{ question.question }}
                </div>
                <div class="quiz__step_form_inner pop_slide_quiz">
                  <label
                    :class="`quiz__step_form_input${
                      selectedAnswer === answer ? ' active__input' : ''
                    }${goodAnswer === answer && submitAnswer ? ' valid' : ''}${
                      selectedAnswer !== goodAnswer &&
                      selectedAnswer === answer &&
                      submitAnswer
                        ? ' invalid'
                        : ''
                    }`"
                    v-for="answer in answers"
                  >
                    <input
                      type="radio"
                      :value="answer"
                      name="answer"
                      @click="handleSelectedAnswer(answer)"
                      :disabled="submitAnswer"
                    />
                    {{ answer }}
                  </label>
                </div>
                <div class="quiz__step_form_buttons">
                  <button
                    type="button"
                    class="next"
                    :disabled="!selectedAnswer"
                    @click="confirmAnswer"
                    v-if="!submitAnswer"
                  >
                    Confirm
                    <i class="fa fa-solid fa-arrow-right"></i>
                  </button>
                  <button
                    type="button"
                    class="next"
                    v-if="
                      selectedAnswer &&
                      submitAnswer &&
                      currentQuestion !== quiz?.questions.length - 1
                    "
                    @click="nextQuestion"
                  >
                    Next Question
                    <i class="fa fa-solid fa-arrow-right"></i>
                  </button>
                  <button
                    type="button"
                    class="next"
                    @click="endQuiz"
                    v-if="currentQuestion === quiz?.questions.length - 1"
                    :disabled="!selectedAnswer"
                  >
                    Finish
                    <i class="fa fa-solid fa-arrow-right"></i>
                  </button>
                </div>
              </div>
            </div>
          </section>
        </form>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { Quiz } from "~/types/Quiz";
import { ref, watch } from "vue";
import { shuffle } from "~/utils/array/Array";
import { Question } from "~/types/Question";
import { useRouter } from "nuxt/app";

interface Props {
  quiz: Quiz;
}

const route = useRouter();

const props = withDefaults(defineProps<Props>(), {});

const currentQuestion = ref<number>(1);
const selectedAnswer = ref<string | null>(null);
const submitAnswer = ref<boolean>(false);
let goodAnswer = ref<string | null>(null);
let answers = ref<string[]>([]);

watch(
  () => props.quiz,
  (newValue) => {
    // Clear state
    clearState();

    let quiz = newValue as Quiz;
    let answersData = [] as string[];
    let questions = quiz?.questions;
    let questionCurrent = questions
      ? (questions[currentQuestion.value - 1] as Question)
      : null;
    if (questionCurrent) {
      goodAnswer.value = questionCurrent.good_answer;
      answersData = [
        questionCurrent.good_answer,
        questionCurrent.bad_answer_1,
        questionCurrent.bad_answer_2,
        questionCurrent.bad_answer_3
      ];
    }
    answers.value = shuffle<string>(answersData as string[]);
  }
);

watch(
  () => currentQuestion.value,
  (newValue) => {
    // Clear state
    clearState();

    let quiz = props.quiz as Quiz;
    let answersData = [] as string[];
    let questions = quiz?.questions;
    let questionCurrent = questions
      ? (questions[newValue - 1] as Question)
      : null;
    if (questionCurrent) {
      goodAnswer.value = questionCurrent.good_answer;
      answersData = [
        questionCurrent.good_answer,
        questionCurrent.bad_answer_1,
        questionCurrent.bad_answer_2,
        questionCurrent.bad_answer_3
      ];
    }
    answers.value = shuffle<string>(answersData as string[]);
  }
);

// Methods
const clearState = () => {
  goodAnswer.value = null;
  selectedAnswer.value = null;
  submitAnswer.value = false;
};

const handleSelectedAnswer = (answer: string) => {
  selectedAnswer.value = answer;
};

const confirmAnswer = () => {
  submitAnswer.value = true;
};

const nextQuestion = () => {
  let questions = props.quiz?.questions;
  if (!questions || !currentQuestion.value) return;

  if (questions.length - 1 === currentQuestion.value) {
    //
  } else {
    currentQuestion.value++;
  }
};

const prevQuestion = () => {
  let questions = props.quiz?.questions;
  if (!questions || !currentQuestion.value) return;

  if (currentQuestion.value === 1) {
  } else {
    currentQuestion.value--;
  }
};

const endQuiz = () => {
  let fullPath = route.currentRoute.value.fullPath;
  route.push(fullPath.replace("start", "end"));
};
</script>

<style scoped lang="scss">
.quiz__steps {
  display: grid;
  position: relative;
  place-items: center;
  background-size: cover;
  background-repeat: no-repeat;
  min-height: 100vh;
  background-color: #dcdadb;
  background-image: url(https://images.alphacoders.com/109/1099923.jpg);

  .quiz__step_inner {
    position: relative;
    overflow: hidden;
    min-height: 300px;
    border-radius: 9px;
    background-color: rgb(255, 255, 255);
    margin: 50px 0;
    z-index: 5;
  }

  .quiz__step_wrapper {
    padding: 70px 100px;
  }

  .quiz__step_heading h2 {
    font-size: 35px;
    color: rgb(0, 10, 56);
    font-weight: bold;
    text-transform: uppercase;
  }

  .quiz__step_heading p {
    font-size: 22px;
    color: rgb(0, 10, 56);
  }

  .quiz__step_bar .quiz__step_counter {
    display: block;
    font-size: 20px;
    font-weight: bold;
    color: rgb(0, 10, 56);
    text-align: right;
  }

  .quiz__step_bar_inner {
    background-color: rgb(233, 233, 233);
    width: 100%;
    height: 16px;
    border-radius: 9px;
    margin-top: 0.5rem;
  }

  .quiz__step_bar_inner .quiz__step_bar_move {
    background-color: #fa4729;
    border-radius: inherit;
    height: inherit;
  }

  .quiz__step_form_heading {
    font-size: 28px;
    color: rgb(0, 10, 56);
    font-weight: bold;
    margin-top: 1.5rem;
  }

  .quiz__step_form_inner {
    margin-top: 1rem;
  }

  .quiz__step_form_inner .quiz__step_form_input {
    display: flex;
    align-items: center;
    width: 100%;
    height: 66px;
    font-size: 19px;
    font-weight: 500;
    color: rgb(0, 10, 56);
    padding: 12px;
    border-radius: 30px;
    transition: 0.5s all ease;
  }

  .quiz__step_form_inner .quiz__step_form_input.active__input {
    background-color: rgb(233, 233, 233);
    transition: 0.5s all ease;
  }

  .quiz__step_form_inner .quiz__step_form_input.valid {
    background-color: rgb(159 243 193) !important;
  }

  .quiz__step_form_inner .quiz__step_form_input.invalid {
    background-color: #ff8a80 !important;
  }

  .quiz__step_form_inner .quiz__step_form_input input {
    -webkit-appearance: none;
    border: solid 2px rgb(233, 233, 233);
    width: 33px;
    height: 33px;
    cursor: pointer;
    margin-right: 20px;
    border-radius: 50%;
    transition: 0.5s all ease;
  }

  .quiz__step_form_inner .quiz__step_form_input input:checked,
  .quiz__step_form_inner .quiz__step_form_input.valid input,
  .quiz__step_form_inner .quiz__step_form_input.invalid input {
    position: relative;
    background-color: #fa4729;
  }

  .quiz__step_form_inner .quiz__step_form_input.valid input {
    background-color: #78d394 !important;
  }

  .quiz__step_form_inner .quiz__step_form_input input:checked:after,
  .quiz__step_form_inner .quiz__step_form_input.valid input:after,
  .quiz__step_form_inner .quiz__step_form_input.invalid input:after {
    content: "\f00c";
    position: absolute;
    width: 100%;
    height: 100%;
    line-height: 30px;
    text-align: center;
    font-size: 15px;
    font-family: "Font Awesome 5 Free", sans-serif;
    font-weight: 900;
    color: rgb(255, 255, 255);
  }

  .quiz__step_form_inner .quiz__step_form_input.invalid input:after {
    content: "\f00d";
  }

  .quiz__step_form_buttons {
    display: flex;
    justify-content: space-between;
    margin-top: 4rem;
    width: 100%;
    text-align: center;
  }

  .quiz__step_form_buttons button {
    position: relative;
    border-radius: 34px;
    width: 46%;
    height: 68px;
    border: none;
    font-size: 18px;
    font-weight: bold;
    text-transform: uppercase;
    color: rgb(255, 255, 255);
    transition: 0.5s all ease;
  }

  .quiz__step_form_buttons .next {
    background-color: #fa4729;
  }

  .quiz__step_form_buttons .prev {
    background-color: rgb(44, 42, 42);
  }

  .pop_slide_quiz {
    animation: pop_slide_quiz 0.5s ease forwards;
  }
}

@keyframes pop_slide_quiz {
  0% {
    transform: translateX(500px) scale(0.5);
  }

  70% {
    transform: translate(0px) scale(0.5);
  }

  100% {
    transform: translate(0px) scale(1);
  }
}
</style>
