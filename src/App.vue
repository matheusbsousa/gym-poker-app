<script setup lang="ts">
import Navbar from "./components/Navbar.vue";
import WorkoutList from "./pages/workout/WorkoutList.vue";
</script>

<template>
  <v-container>
    <v-app class="justify-center">
      <Navbar/>
      <v-main>
        <v-container style="max-width: 1200px">
          <router-view/>
        </v-container>
      </v-main>
    </v-app>
  </v-container>
</template>

<style>
@import '@mdi/font/css/materialdesignicons.css';

</style>