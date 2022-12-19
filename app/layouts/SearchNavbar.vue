<template>
  <form action="#" method="GET" role="search" class="navbar__search form__with_label form__right_icon">
    <label>
      <input type="search" name="s" class="navbar__search_input" placeholder="Search here..." autocomplete="off">
    </label>
    <button type="submit" class="navbar__search_submit">
      <span class="navbar__search_icon">
        <SearchIcon/>
      </span>
    </button>
  </form>
</template>

<script setup lang="ts">
import SearchIcon from '../components/Icons/SearchIcon.vue'
</script>

<style scoped lang="scss">
  .navbar__search {
    position: relative;
    padding: 0 !important;
    line-height: 1;

    &.form__right_icon .navbar__search_input {
      border-right: 0 !important;
    }

    .navbar__search_input{
      background-color: #ffffff;
      background-image: none !important;
      color: var(--color-dark);
      padding: 0 12px;
      margin: 0;
      outline: 0 !important;
      font-size: 14px !important;
      height: 36px;
      min-height: 0;
      line-height: 1;
      border-radius: 15px 0 0 15px;
      border: 1px solid #ccc !important;
      width: 100%;
      transition: all .5s;
    }

    .navbar__search_submit {
      background: 0 0;
      border: 0;
      opacity: 1;
      padding: 0 !important;
      margin: 0;
      line-height: 0;
      outline: 0;
      vertical-align: middle;
      width: 36px;
      height: 36px;
      border-radius: 0 15px 15px 0;
      background-color: #ffffff !important;
      box-shadow: none !important;
    }

    .navbar__search_icon {
      display: inline-block !important;
      color: #666;
      outline: 0;
      margin: 0;
      font-size: 14px !important;
      border: 1px solid #ccc;
      line-height: 1;
      height: 36px;
      text-transform: capitalize;
      vertical-align: middle;
      transition: background-color .1s ease-in-out;
      background-color: #ffffff !important;
      border-radius: 0 15px 15px 0;
      padding-top: 6px;
      width: 36px;
      box-shadow: none !important;
    }

    .navbar__search_icon svg  {
      display: inline;
      width: 22px;
    }
  }
</style>