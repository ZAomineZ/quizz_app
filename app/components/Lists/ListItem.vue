<template>
  <li>
    <div class="mb_3">
      <a href="#" class="list__item">
        <div class="list__item_left">
          <img class="img__res shadow__sm" src="https://demo.ramsthemes.com/projects/animace/wp-content/uploads/2022/06/Aina-Suzuki-150x150.jpg" alt="">
        </div>
        <div class="list__item_right">Aina Suzuki</div>
      </a>
    </div>
  </li>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
.list__item {
  .list__item_left {
    display: inline-block;
    margin-right: 10px;
    width: 60px;
    height: 60px;
  }

  .list__item_right {
    display: inline-block;
    vertical-align: middle;
  }
}

@media (min-width: 1641px) {
  .list__item .list__item_right {
    width: 200px;
  }
}
</style>