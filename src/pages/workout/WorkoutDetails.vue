<script setup lang="ts">

import {useRoute} from "vue-router";
import {ref} from "vue";
import {router} from '../../configuration/Router'
import ExerciseList from "../exercise/ExerciseList.vue";
import BackButton from "../../components/BackButton.vue";
import Title from "../../components/Title.vue";
import EditButton from "../../components/EditButton.vue";
import EditWorkout from "./EditWorkout.vue";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {workouts} from "../../constants/DATA";
import {Workout} from "../../models/Workout";

const route = useRoute();
const workoutId = Number(route.params.workoutId)

const workout = ref<Workout>(fetchWorkoutDetails())

const editButton = EditButton;

function fetchWorkoutDetails(): Workout {
  return workouts[0]
}

function goToEditWorkout() {
  router.push({name: 'EditWorkout', params: {workoutId: workoutId}})
}

</script>

<template>

  <v-container fluid class="max-container">

    <v-sheet elevation="1" class="rounded pa-4 mb-1">

      <v-row align="center">
        <v-col cols="8" offset="2">
          <Title :title="workout.name"></Title>
        </v-col>
        <v-col cols="2">
          <EditButton class="float-end" @click="goToEditWorkout"></EditButton>
        </v-col>
      </v-row>

      <div class="mt-2 mb-2 d-flex align-baseline">
        <p class="text-h6 mr-2">Name: </p>
        <p class="text-body-1">{{ workout.name }}</p>
      </div>

      <div class="mt-2 mb-2 d-flex align-center">
        <p class="text-h6 mr-2">Type: </p>
        <font-awesome-icon class="text-red text-h5" :icon="workout.type"/>
      </div>

      <div class="mt-2 mb-2 d-flex align-baseline">
        <p class="text-h6 mr-2">Workout Days: </p>
        <p class="text-body-1">{{ workout.days }}</p>
      </div>

      <div class="mt-2 mb-2 d-flex align-baseline">
        <p class="text-h6 mr-2">Status: </p>
        <p class="text-body-1">{{ workout.active === true ? 'Active' : 'Inactive' }}</p>
      </div>

    </v-sheet>

    <ExerciseList :exercises="workout.exercises" :workoutId="workoutId"></ExerciseList>

    <div class="d-flex justify-space-between pl-5 pr-5">
      <BackButton :path="'/'"></BackButton>
    </div>
  </v-container>

</template>

<style scoped>

</style>