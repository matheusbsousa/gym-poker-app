<script setup lang="ts">


import {ref} from "vue";

const selectedTab = ref("Home")

const navbarButtons = [
  {
    icon: "mdi-home",
    path: "/",
    title: "Home"
  }
]

</script>

<template>
  <v-app-bar height="70">
    <v-container>
      <v-row align="center">
        <v-col cols="5" lg="2" md="4">
          <router-link to="/" class="text-decoration-none text-center">
            <v-sheet elevation="4" class="rounded-pill d-flex align-center w-50" color="primary" height="50px">
              <v-app-bar-title class="text-white">Gym Poker</v-app-bar-title>
            </v-sheet>
          </router-link>
        </v-col>
        <v-spacer />
        <v-col cols="2" lg="1">
          <router-link v-for="button of navbarButtons" :key="button.title" :to="button.path">
            <v-btn height="70" :ripple="false" class="menu-btn">{{ button.title }}</v-btn>
          </router-link>
        </v-col>
        <v-col cols="2" lg="1">
          <v-btn variant="flat" height="70" prepend-icon="mdi-cog">Config</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-app-bar>

</template>

<style>
.menu-btn {
  color: grey;

}

.menu-btn:hover {
  color: red;
}


</style>