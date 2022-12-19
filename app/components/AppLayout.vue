<template>
  <Head>
    <Title>Quizz App</Title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="">
    <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@100;200;300;400;500;600;700&display=swap"
          rel="stylesheet">
    <link rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css"
          integrity="sha512-MV7K8+y+gLIBoVD59lQIYicR65iaqukzvf/nwasF0nqhPay5w/9lJmVM2hMDcnK1OnMGCdVK+iQrJ7lzPJQd1w=="
          crossorigin="anonymous" referrerpolicy="no-referrer" />
  </Head>
  <Navbar />
  <main class="pt_fixed">
    <div class="container__general">
      <div class="wrapper">
        <SidebarContent v-if="route.name !== 'login' && route.name !== 'register'"/>
        <slot />
      </div>
    </div>
    <Footer />
  </main>
</template>

<script setup>
import Navbar from "../layouts/Navbar";
import SidebarContent from "~/layouts/SidebarContent";
import Footer from "~/layouts/Footer";
import "assets/index.scss";
import { useRoute } from "nuxt/app";

const route = useRoute()
</script>

<style scoped>

</style>