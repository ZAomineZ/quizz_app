<template>
  <form action="#" method="GET" role="search" class="navbar__search form__with_label form__right_icon">
    <label>
      <input type="search" name="s" class="navbar__search_input">
    </label>
  </form>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
  .navbar__search {
    position: relative;
    padding: 0 !important;
    line-height: 1;

    form {
      position: relative;
    }

    form .navbar__search_input {
      background-color: #ffffff;
      transition: all .5s;
    }
  }
</style>