<script setup lang="ts">

import {useRouter} from "vue-router";

const router = useRouter()

</script>

<template>
    <v-sheet elevation="1" width="40" height="40"
             class=" back bg-primary d-flex justify-center align-center rounded-circle">
      <font-awesome-icon class="text-h4 text-white"
                         icon="plus"/>
    </v-sheet>
</template>

<style scoped>

.back{
  cursor: pointer
}

</style>