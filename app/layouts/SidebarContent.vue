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
                          <NuxtLink href="/categories">Categories</NuxtLink>
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
.sidenav {
  background-color: #ffffff;

  .sidenav__menu {
    padding: 0;
    list-style: none;
  }

  .sidenav__menu .sidenav__menu_item {
    border-radius: 0.5rem !important;
  }

  .sidenav__menu li {
    position: relative;
    display: block;
    padding: 0.75rem;
    z-index: 9;
  }

  .sidenav__menu li {
    font-size: 14px;
  }

  .sidenav__menu_item:hover {
    background: var(--hover-blue) !important;
  }

  .sidenav__menu li a {
    display: block;
    text-decoration: none;
    color: #323232;
  }
}

#sidebar {
  position: relative;
  padding: 1em;
  min-width: 295px;
  max-width: 295px;
}

.simplebar__wrapper {
  overflow: hidden;
  width: inherit;
  height: inherit;
  max-width: inherit;
  max-height: inherit;

  .simplebar__mask {
    position: absolute;
    direction: inherit;
    overflow: hidden;
    padding: 0;
    margin: 0;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    width: auto !important;
    height: auto !important;
    z-index: 0;
  }

  .simplebar__offset {
    direction: inherit;
    position: absolute;
    resize: none !important;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    padding: 0;
    margin: 0;
  }
  .simplebar__content_wrapper {
    display: block;
    position: relative;
    direction: inherit;
    height: 100%;
    width: auto;
    max-width: 100%;
    max-height: 100%;
  }

  .simplebar__content {
    padding: 0;
  }

  .simplebar__content:before {
    content: "";
    display: table;
  }

  .sidebar_nav_container {
    width: 260px;
    padding: 0 0.5rem;
  }
}

@media only screen and (max-height: 450px) {
  .sidenav .sidenav__menu a {
    font-size: 18px;
  }
}
</style>
