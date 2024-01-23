<script setup lang="ts">

import {useRouter} from "vue-router";

const router = useRouter()

</script>

<template>
    <v-sheet width="25" height="25"
             class="d-flex justify-center align-center rounded-circle pointer">
      <font-awesome-icon class="text-h6 text-primary"
                         icon="trash"/>
    </v-sheet>
</template>
