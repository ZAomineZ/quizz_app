<template>
  <section class="thankyou__page">
    <div class="row">
      <div class="col_md_6 mx_auto">
        <div class="thankyou__page_inner">
          <div class="thankyou__page_wrapper">
            <!-- Tick  -->
            <div class="tick">
              <div class="done_tick"></div>
              <i class="fa fa-solid fa-check"></i>
            </div>
            <h2>Score {{ quizSession?.score }}/{{ quiz?.questions_count }}</h2>
            <p>
              Bravo tu as terminé le quiz "{{ quiz?.title }}", vous pouvez
              trouver encore plus de quiz en retournant à l'accueil
            </p>
            <div>
              <button class="back_home" @click.prevent="backHome">
                Back Home
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import {
  Quiz as QuizType,
  QuizSessions as QuizSessionsType
} from "~/types/Quiz";
import { useRouter } from "nuxt/app";

const router = useRouter();

interface Props {
  quiz: QuizType;
  quizSession: QuizSessionsType;
}

const props = withDefaults(defineProps<Props>(), {});

// Methods
const backHome = async () => {
  await router.push("/");
};
</script>

<style scoped lang="scss">
.thankyou__page {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  background-color: rgb(243, 247, 254);

  .thankyou__page_inner {
    position: relative;
    background: rgb(255, 255, 255);
    border-radius: 90px;
    width: 100%;
    top: 30%;
    text-align: center;
  }

  .thankyou__page_inner h2 {
    font-size: 45px;
    color: rgb(5, 17, 51);
    margin-top: 20px;
    font-weight: bold;
  }

  .thankyou__page_inner p {
    color: rgb(170, 170, 170);
    font-size: 16px;
    margin-top: 20px;
  }

  .thankyou__page_wrapper {
    padding: 80px 290px;
  }

  .tick {
    position: relative;
  }

  .tick i {
    position: absolute;
    font-weight: 900;
    font-size: 50px;
    color: rgb(34, 208, 136);
    top: 30%;
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
    opacity: 0;
    animation-delay: 0.5s;
    animation: tick_icon 0.8s linear forwards;
  }

  .done_tick {
    width: 120px;
    height: 120px;
    border: solid 1px transparent;
    text-align: center;
    margin-left: auto;
    margin-right: auto;
    border-left-color: rgb(34, 208, 136);
    animation: rotate_circle 0.5s linear forwards;
    animation-delay: 0.5s;
    border-radius: 50%;
    background-color: transparent;
  }

  .back_home {
    border: 0;
    border-radius: 50px;
    background-image: -webkit-linear-gradient(
      3deg,
      rgb(255, 81, 47) 0%,
      rgb(240, 152, 25) 100%
    );
    font-size: 17px;
    color: rgb(255, 255, 255);
    font-weight: bold;
    text-transform: uppercase;
    width: 100%;
    height: 67px;
  }
}

.thankyou__circle {
  animation: circle 0.5s linear forwards;
}

@keyframes circle {
  0% {
    clip-path: circle(0%);
  }

  100% {
    clip-path: circle(100%);
  }
}

@keyframes rotate_circle {
  25% {
    border-left-color: rgb(34, 208, 136);
  }

  50% {
    border-left-color: rgb(34, 208, 136);
    border-top-color: rgb(34, 208, 136);
  }

  75% {
    border-left-color: rgb(34, 208, 136);
    border-top-color: rgb(34, 208, 136);
    border-right-color: rgb(34, 208, 136);
  }

  100% {
    transform: rotate(360deg);
    border-color: rgb(34, 208, 136);
  }
}

@keyframes tick_icon {
  0% {
    font-size: 0;
    opacity: 1;
    top: 50%;
  }

  20% {
    font-size: 10px;
    top: 45%;
  }

  40% {
    font-size: 20px;
    top: 40%;
  }

  70% {
    font-size: 200px;
    top: 0;
  }

  100% {
    font-size: 50px;
    opacity: 1;
    top: 30%;
  }
}
</style>
