<template>
  <nav id="sidebar" class="sidenav">
    <div class="navigation_sticky_top scrollbar_sidenav">
      <div class="simplebar__wrapper">
        <div class="simplebar__mask">
          <div class="simplebar__offset">
            <div class="simplebar__content_wrapper" style="height: 100%">
              <div class="simplebar__content">
                <div class="sidebar_nav_container">
                  <div class="mb_4">
                    <div>
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
                          <NuxtLink href="/creator">Créateurs</NuxtLink>
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
    </div>
  </nav>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
#sidebar {
  position: relative;
  padding: 1em;
  min-width: 295px;
  max-width: 295px;
}

@media only screen and (max-width: 1385px) {
  #sidebar {
    display: none;
    margin-left: -270px;
  }
}
</style>
