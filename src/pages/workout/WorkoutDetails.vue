<script setup lang="ts">

import {useWorkoutStore} from "../../stores/WorkoutStore";
import {useRoute} from "vue-router";
import {ref} from "vue";
import {router} from '../../configuration/Router'
import ExerciseList from "../exercise/ExerciseList.vue";
import BackButton from "../../components/BackButton.vue";
import {WorkoutDetails} from "../../models/WorkoutDetails";
import Title from "../../components/Title.vue";
import EditButton from "../../components/EditButton.vue";
import EditWorkout from "./EditWorkout.vue";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

const route = useRoute();
const workoutId = Number(route.params.id)

const workoutDetails = ref<WorkoutDetails>()

const workoutStore = useWorkoutStore();
workoutStore.getWorkoutById(workoutId, callback);

const editButton = EditButton;

function callback(response: any) {
  if (response.status === 200) {
    workoutDetails.value = response.data;
  }
}

function goToEditWorkout() {
  router.push({name: 'EditWorkout', params: {id: workoutId}})
}

</script>

<template>

  <Title :title="workoutDetails?.workout.name">
    <template #button>
      <EditButton @click="goToEditWorkout"></EditButton>
    </template>
  </Title>

  <v-sheet elevation="1" class="rounded pa-4 mb-1">

    <div class="mt-2 mb-2 d-flex align-baseline">
      <p class="text-h6 mr-2">Name: </p>
      <p class="text-body-1">{{ workoutDetails?.workout.name }}</p>
    </div>

    <div class="mt-2 mb-2 d-flex align-center">
      <p class="text-h6 mr-2">Type: </p>
      <font-awesome-icon class="text-red text-h5" :icon="workoutDetails?.workout.type" />
    </div>

    <div class="mt-2 mb-2 d-flex align-baseline">
      <p class="text-h6 mr-2">Workout Days: </p>
      <p class="text-body-1">{{ workoutDetails?.workout.days }}</p>
    </div>

    <div class="mt-2 mb-2 d-flex align-baseline">
      <p class="text-h6 mr-2">Status: </p>
      <p class="text-body-1">{{ workoutDetails?.workout.active === true ? 'Active' : 'Inactive' }}</p>
    </div>

  </v-sheet>

  <ExerciseList :exercises="workoutDetails?.exercises" :workoutId="workoutId"></ExerciseList>

  <div class="d-flex justify-space-between pl-5 pr-5">
    <BackButton :path="'/'"></BackButton>
  </div>

</template>

<style scoped>

</style>