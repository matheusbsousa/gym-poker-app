<script setup lang="ts">

import AddButton from "./AddButton.vue";
import EditButton from "./EditButton.vue";

defineProps<{
  title?: string
  underline?: boolean
}>();

</script>

<template>

  <v-sheet height="50" class="d-flex justify-center align-center">
    <p class="text-h5 title position-absolute ">{{ title }}</p>
    <div class="pointer ml-auto align-center">
      <slot name="button"></slot>
    </div>
  </v-sheet>

  <v-divider v-if="underline" class="ml-2 mr-2"></v-divider>
</template>

<style scoped>

</style>