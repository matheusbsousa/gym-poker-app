<script setup lang="ts">

import {useRouter} from "vue-router";

const router = useRouter()

</script>

<template>
    <v-sheet width="40" height="40"
             class="d-flex justify-center align-center rounded-circle pointer">
      <font-awesome-icon class="text-h4 text-primary"
                         icon="trash"/>
    </v-sheet>
</template>
