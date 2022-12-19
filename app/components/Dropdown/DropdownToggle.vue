<template>
  <a href="#" role="button" class="dropdown__toggle">
    <i class="fas fa-user fa-lg"></i>
  </a>
  <div class="dropdown__menu dropdown__menu_right">
    <a href="#" class="dropdown__item">
      <i class="fas fa-user-plus mr_2"></i>
    </a>
    <a href="#" class="dropdown__item">
      <i class="fas fa-sign-in-alt mr_2"></i>
    </a>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
  .dropdown__toggle {
    display: table-row;
    white-space: nowrap;

    &:after {
      display: inline-block;
      padding: 0;
      margin-left: .255em;
      font-family: "Font Awesome 6 Free", sans-serif;
      font-weight: 900;
      content: "\f142";
      vertical-align: middle;
      border: 0;
    }
  }

  .dropdown__menu {
    display: none;
    position: absolute;
    top: 100%;
    float: left;
    padding: .5rem 0;
    margin: 0.25rem 0;
    font-size: unset;
    color: var(--dark-body);
    text-align: left;
    list-style: none;
    background-color: #ffffff;
    background-clip: padding-box;
    border-radius: .25rem;
    min-width: auto;
    box-shadow: 0 15px 20px 0 rgb(0 0 0 / 8%), 0 1px 4px 0 rgb(0 0 0 / 8%);
    z-index: 1000;

    &.show {
      display: block;
     }

    .dropdown__item {
      display: block;
      width: 100%;
      padding: .25rem 1.5rem;
      font-weight: 400;
      color: var(--dark-body);
      text-align: inherit;
      white-space: nowrap;
      background-color: transparent;
      border: 0;
      clear: both;
    }
  }
</style>