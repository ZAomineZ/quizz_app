<template>
  <Head>
    <Title>Quizz App</Title>
    <link rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css"
          integrity="sha512-MV7K8+y+gLIBoVD59lQIYicR65iaqukzvf/nwasF0nqhPay5w/9lJmVM2hMDcnK1OnMGCdVK+iQrJ7lzPJQd1w==" crossorigin="anonymous" referrerpolicy="no-referrer" />
  </Head>
  <Navbar/>
  <main class="pt_fixed">
    <div class="container__general">
      <div class="wrapper">
        <SidebarContent/>
        <slot/>
      </div>
    </div>
    <Footer/>
  </main>
</template>

<script setup>
import Navbar from "../layouts/Navbar";
import SidebarContent from "~/layouts/SidebarContent";
import Footer from "~/layouts/Footer";
import 'assets/index.scss'
</script>

<style scoped>

</style>