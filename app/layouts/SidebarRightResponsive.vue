<template>
  <div :class="`sidebar_right bg_sidenav${show ? ' sidenav_w_right' : ''}`">
    <div class="buttons_sidenav">
      <span title="Close Menu" class="close_btn" @click="emit('close')">
        <i class="fas fa-times fa-lg"></i>
      </span>
    </div>
    <div class="sidenav_margin_top">
      <nav>
        <div class="navigation_sticky_top scrollbar_sidenav">
          <div class="simplebar__wrapper">
            <div class="simplebar__mask">
              <div class="simplebar__offset">
                <div class="simplebar__content_wrapper">
                  <div class="simplebar__content">
                    <div class="sidebar_nav_container_res">
                      <div class="mb_4">
                        <ul class="sidenav__menu">
                          <li class="sidenav__menu_item">
                            <NuxtLink to="/">Accueil</NuxtLink>
                          </li>
                          <li class="sidenav__menu_item">
                            <NuxtLink to="/quiz/search">Tout les quiz</NuxtLink>
                          </li>
                          <li class="sidenav__menu_item">
                            <NuxtLink to="/quiz/submit_quiz"
                              >Proposer un quiz</NuxtLink
                            >
                          </li>
                          <li class="sidenav__menu_item">
                            <NuxtLink href="/category">Categories</NuxtLink>
                          </li>
                          <li class="sidenav__menu_item">
                            <NuxtLink href="/ranking">Classement</NuxtLink>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  show?: boolean;
}

const emit = defineEmits(["close"]);

const props = withDefaults(defineProps<Props>(), {
  show: false
});
</script>

<style scoped lang="scss">
.bg_sidenav {
  background-color: #ffffff;
}

.sidenav_w,
.sidenav_w_right {
  width: 312px !important;
}

.sidebar_right {
  right: -1px;
  padding-top: 25px;
  box-shadow: -15px 0 15px -7px rgb(0 0 0 / 5%);
}

.sidebar_right,
.sidebar_left {
  position: fixed;
  height: 100%;
  width: 0;
  z-index: 10000;
  top: 0;
  overflow: hidden;
  transition: 0.5s;

  .close_btn {
    position: absolute;
    right: 12px;
    z-index: 999;
    cursor: pointer;
  }
}

.buttons_sidenav {
  position: absolute;
  width: 260px;
  margin: 0 25px;
  padding: 0 10px;
  height: 20px;
  z-index: 99;
}

.sidenav_margin_top {
  margin-top: 3em;
}
</style>
