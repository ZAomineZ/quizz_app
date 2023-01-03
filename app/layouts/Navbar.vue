<template>
  <nav class="navbar navbar__height bg__navbar fixed__header">
    <div
      class="navbar__position navbar__container container__fluid position__relative"
    >
      <div class="row w_100 d_flex align_items_center mx_0">
        <div class="col_2 col_xl_3">
          <NuxtLink to="/" class="navbar__logo_left">
            <img
              class="logo logo__loaded logo__light"
              src="https://demo.ramsthemes.com/projects/animace/wp-content/uploads/2021/11/a-logo-red.svg"
              alt=""
            />
            <img
              class="logo logo__loaded logo__dark"
              src="https://demo.ramsthemes.com/projects/animace/wp-content/uploads/2021/11/a-logo-red-w.svg"
              alt=""
            />
          </NuxtLink>
        </div>
        <div class="col_5 col_xl_6">
          <SearchNavbar />
        </div>
        <div class="col_5 col_xl_3 my_auto">
          <div class="row d_flex align_items_center justify_content_end pr_3">
            <div class="col_auto px_1">
              <ButtonSwitch @clickButton="handleModeDark" />
            </div>
            <div class="col_auto px_1">
              <DropdownToggle>
                <DropdownItem href="/register" v-if="!currentUser">
                  <i class="fas fa-user-plus mr_2"></i>
                  Register
                </DropdownItem>
                <DropdownItem href="/login" v-if="!currentUser">
                  <i class="fas fa-sign-in-alt mr_2"></i>
                  Login
                </DropdownItem>
                <DropdownItem
                  href="/logout"
                  v-if="currentUser"
                  @click.prevent="handleLogout"
                >
                  <i class="fa fa-solid fa-right-from-bracket"></i>
                  Logout
                </DropdownItem>
              </DropdownToggle>
            </div>
            <div class="col_auto px_2">
              <div class="d_flex align_middle" @click="emit('hamburgerClick')">
                <i class="fas fa-bars fa-lg hamburger_menu_right"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="line bottom__grid"></div>
  </nav>
</template>

<script lang="ts" setup>
import SearchNavbar from "~/layouts/SearchNavbar.vue";
import ButtonSwitch from "~/components/Button/ButtonSwitch.vue";
import DropdownToggle from "~/components/Dropdown/DropdownToggle.vue";
import DropdownItem from "~/components/Dropdown/DropdownItem.vue";
import { useAuth, useAuthUser } from "~/composables/auth";
import { useRouter } from "nuxt/app";

const router = useRouter();
const currentUser = useAuthUser();
const { logout } = useAuth();

const emit = defineEmits(["hamburgerClick"]);

// Methods
const handleModeDark = () => {
  let body = document.querySelector("body");
  body?.classList.toggle("is_dark");
};

const handleLogout = async () => {
  await logout();
  await router.push("/login");
};
</script>

<style lang="scss" scoped>
.navbar {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 1rem;

  .navbar__container {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    margin: 0 1em;
  }

  .navbar__position {
    width: 1700px !important;
    margin: 0 auto;
    left: 0;
    right: 0;
  }

  .navbar .container,
  .navbar .container__fluid,
  .navbar .container__lg,
  .navbar .container__md,
  .navbar .container__sm,
  .navbar .container__xl {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
  }

  .navbar__logo_left {
    float: left;
  }

  .logo {
    height: 50px;
    transition: 0.3s;
  }

  .logo__loaded {
    display: block;
  }

  .logo__loaded.logo__dark {
    display: none;
  }
}

.hamburger_menu_right {
  position: relative;
  cursor: pointer;
}

@media only screen and (min-width: 1386px) {
  .navbar .logo {
    width: 215px;
  }
}
</style>
