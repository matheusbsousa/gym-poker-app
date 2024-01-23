<script setup lang="ts">

import {useDisplay} from "vuetify";
import {ref} from "vue";

const screen = ref(useDisplay())

const navbarButtons = [
  {
    icon: "",
    path: "/",
    title: "Home"
  }
]

</script>

<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-col cols="5">
        <router-link to="/" class="text-decoration-none text-center">
          <v-sheet elevation="4" max-width="150"
                   class="rounded-pill d-flex align-center w-50 max-width-sm" color="primary" height="50px">
            <v-app-bar-title v-if="screen.smAndUp" class="text-white">Gym Poker</v-app-bar-title>
            <v-app-bar-title v-else class="text-white">GP</v-app-bar-title>
          </v-sheet>
        </router-link>
      </v-col>
      <v-spacer/>
      <v-col cols="2" class="bg:">
        <v-hover v-slot="{isHovering, props}" open-delay="200">
          <router-link class="text-decoration-none" v-for="button of navbarButtons" :key="button.title"
                       :to="button.path" >
            <v-sheet :color="isHovering ? 'primary' : 'white'" >Home</v-sheet>
          </router-link>
        </v-hover>
      </v-col>
    </v-row>
  </v-container>
</template>

<style>
.menu-btn {
  color: grey;

}

.menu-btn:hover {
  color: red;
}


</style>