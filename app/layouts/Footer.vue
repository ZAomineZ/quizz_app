<template>
  <footer class="">
    <div class="line"></div>
    <div class="container__fluid footer__width py_3">
      <div class="row">
        <div class="col_12 col_sm_6">
          <div class="p_3">
            <div class="mb_4">
              <h6 class="footer__title">Our Work is</h6>
              <div class="footer__text">
                <p>Designed, crafted and built with WordPress, Bootstrap and ACF Pro.</p>
              </div>
            </div>
          </div>
        </div>
        <div class="col_12 col_sm_6">
          <div class="p_3">
            <div class="mb_4">
              <div class="footer__title">About</div>
              <div class="footer__text">
                <i class="far fa-copyright"></i> 2022 ANIMACE . All Rights Reserved
                <p></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
  .footer__title {
    color: var(--color-dark-footer);
  }

  @media only screen and (min-width: 1699px) {
    .footer__width {
      width: auto;
      max-width: 1170px;
    }
  }
</style>