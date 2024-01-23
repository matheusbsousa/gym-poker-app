<script setup lang="ts">
import Navbar from "./components/Navbar.vue";
</script>

<template>
  <v-app class="justify-center">
    <Navbar/>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<style>
@import '@mdi/font/css/materialdesignicons.css';

</style>