<script setup lang="ts">

import {useRouter} from "vue-router";

const router = useRouter()


</script>

<template>
    <v-sheet  elevation="1" width="50" height="50"
             class=" back bg-primary d-flex justify-center align-center rounded-circle">
      <font-awesome-icon class="text-h4 text-white"
                         icon="check"/>
    </v-sheet>
</template>

<style scoped>

.back{
  cursor: pointer
}

</style>