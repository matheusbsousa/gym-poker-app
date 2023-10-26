<script setup lang="ts">

import {ExerciseDetail} from "../../models/ExerciseDetail";
import Title from "../../components/Title.vue";
import EditButton from "../../components/EditButton.vue";
import {router} from "../../configuration/Router";


interface Props {
  workoutId: number
  exercises?: ExerciseDetail[]
}
const props = defineProps<Props>();

function goToEditExercise(exerciseId: number | undefined) {
  router.push({name: 'EditExercise', params: {workoutId: props.workoutId, exerciseId: exerciseId}})
}


</script>

<template>

  <Title title="Exercises" :underline="true"></Title>

  <v-card rounded="4" v-for="exercise of exercises" :key="exercise.id" class="mb-4">

    <Title :title="exercise.name">
      <template #button>
        <EditButton @click="goToEditExercise(exercise.id)" class="mr-5"></EditButton>
      </template>
    </Title>

    <v-row class="pb-4">
      <v-col class="text-center pa-3">
        <v-card-text class="font-weight-bold pa-1 text-w">
          Series: {{ exercise.seriesNumber }}
        </v-card-text>
        <v-card-text class="font-weight-bold pa-1">
          Repetitions: {{ exercise.repetitionsMinimum }} - {{ exercise.repetitionsMaximum }}
        </v-card-text>
      </v-col>

      <v-col class="text-center pa-3">
        <v-card-text class="font-weight-bold pa-1">
          Weight: {{ exercise.weight }}kg
        </v-card-text>
        <v-card-text class="font-weight-bold pa-1">
          Rest time: {{ exercise.restTimeInMinutes }}m
        </v-card-text>
      </v-col>
    </v-row>

  </v-card>

  <div class="d-flex justify-center">
    <router-link :to="`/workouts/${workoutId}/exercises/edit-exercise-list`">
      <font-awesome-icon class="plus-icon" icon="plus"/>
    </router-link>
  </div>

</template>

<style>

.plus-icon {
  color: #434343;
  height: 50px;
}

</style>