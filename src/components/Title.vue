<script setup lang="ts">

defineProps<{
  title?: string
  underline?: boolean
}>();

</script>

<template>
  <v-sheet height="50" class="d-flex justify-center align-center">
    <p class="text-h5 title position-absolute ">{{ title }}</p>
  </v-sheet>
  <v-divider v-if="underline" class="ml-2 mr-2"></v-divider>
</template>
