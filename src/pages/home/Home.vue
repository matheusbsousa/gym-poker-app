<script setup lang="ts">

import WorkoutsList from "../workout/WorkoutList.vue";
</script>

<template>

  <Suspense>
    <template #default>
      <WorkoutsList></WorkoutsList>
    </template>
    <template #fallback>
      <v-progress-linear
          color="red"
          indeterminate
          rounded
          height="5"
      ></v-progress-linear>
    </template>
  </Suspense>
</template>
