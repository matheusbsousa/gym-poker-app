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
    <v-sheet class="d-flex flex-fill">
      <v-sheet class="ml-10 d-flex align-center" height="70">
        <router-link to="/">
          <v-app-bar-title>Workout Poker</v-app-bar-title>
        </router-link>
      </v-sheet>

      <v-sheet class="flex-1-1 ml-10">
        <router-link v-for="button of navbarButtons" :key="button.title" :to="button.path">
            <v-btn height="70" :ripple="false" class="menu-btn">{{ button.title }} </v-btn>
        </router-link>
      </v-sheet>

      <v-sheet>
        <v-btn variant="flat" height="70" prepend-icon="mdi-cog">Config</v-btn>
      </v-sheet>
    </v-sheet>
  </v-app-bar>

</template>

<style>
.menu-btn{
  color: grey;

}

.menu-btn:hover{
  color: red;
}



</style>