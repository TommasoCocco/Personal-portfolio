<script setup lang="ts">
import Navbar from './components/Navbar.vue'
import Home from './components/HomePage.vue'
import Works from './components/WorkPage.vue'
import About from './components/AboutPage.vue'
import Mail from './components/MailBox.vue'
import Footer from './components/Footer.vue'
</script>

<template>
  <Navbar>
    <template #links>
      <RouterLink to="#home">Home</RouterLink>
      <RouterLink to="#works">Works</RouterLink>
      <RouterLink to="#about">About</RouterLink>
      <RouterLink to="#mail">Mail</RouterLink>
      <RouterLink to="#footer">Footer</RouterLink>
    </template>
  </Navbar>

  <div id="home"><Home /></div>
  <div id="works"><Works /></div>
  <div id="about"><About /></div>
  <div id="mail"><Mail /></div>
  <div id="footer"><Footer /></div>

</template>

<style scoped>

</style>
