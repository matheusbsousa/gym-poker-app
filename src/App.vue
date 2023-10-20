<script setup lang="ts">
import Navbar from "./components/Navbar.vue";
import WorkoutList from "./pages/workout/WorkoutList.vue";
</script>

<template>
  <div class="container">
    <v-layout class="justify-center">
      <Navbar/>
      <v-main style="max-width: 1200px">
        <v-container>
          <router-view/>
        </v-container>
      </v-main>
    </v-layout>
  </div>
</template>

<style>
@import '@mdi/font/css/materialdesignicons.css';

</style>