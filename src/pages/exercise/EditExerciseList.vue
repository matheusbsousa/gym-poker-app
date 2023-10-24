<script setup lang="ts">

import {Exercise} from "../../models/Exercise";
import {ref} from "vue";
import BackButton from "../../components/BackButton.vue";
import SubmitButton from "../../components/SubmitButton.vue";
import {useRoute, useRouter} from "vue-router";
import AddButton from "../../components/AddButton.vue";
import Title from "../../components/Title.vue";
import {AxiosResponse} from "axios";
import {useWorkoutStore} from "../../stores/WorkoutStore";
import {Workout} from "../../models/Workout";
import {WorkoutExercises} from "../../models/WorkoutExercises";

const router = useRouter();
const workoutId = useRoute().params.id;

const workoutStore = useWorkoutStore();
workoutStore.getExercisesByWorkoutId(Number(workoutId), getExercisesByWorkoutIdCallback);

const workoutExercises = ref<WorkoutExercises>();

function getExercisesByWorkoutIdCallback(response: AxiosResponse<WorkoutExercises>) {
  if (response.status === 200) {
    workoutExercises.value = response.data;
  }
}

function select(exercise: Exercise) {
  exercise.isSelected = !exercise.isSelected
}

function newExercice() {
  router.push({name: 'NewExercise', params: {id: workoutId}})
}

function afterLinkExercises(response: AxiosResponse<WorkoutExercises>) {

  router.push({name: 'WorkoutDetails', params: {id: workoutId}})
}

function linkSelectedExercisesToWorkout() {

  if (workoutExercises.value === undefined) {
    console.log("Workout object is null!")
    return;
  }

  let workoutId = workoutExercises.value.workout.id

  let exerciseIds: number[] = workoutExercises.value.exercises
      .filter(exercise => exercise.isSelected)
      .map(exercise => exercise.id);
  console.log(workoutId + '-' + exerciseIds)
  workoutStore.linkExercisesToWorkout(workoutId!!, exerciseIds, afterLinkExercises)
}

</script>


<template>

  <Title title="Exercise List">
    <template #button>
      <AddButton @click="newExercice"></AddButton>
    </template>
  </Title>

  <v-sheet class="pa-4">

    <v-sheet v-for="exercise of workoutExercises?.exercises" :key="exercise.id"
             :class="{ 'bg-primary' : exercise.isSelected }"
             class="d-flex justify-space-between align-center mb-5 pointer" rounded elevation="2"
             @click="select(exercise)">
      <div class="w-25 ml-5">
        <v-checkbox class="d-flex"
                    v-model="exercise.isSelected"
                    :value="true"
        ></v-checkbox>
      </div>

      <div class="w-25 text-center">
        <p class="font-weight-bold"> {{ exercise.name }}</p>
      </div>

      <div class="w-25 text-right mr-5">
        <font-awesome-icon
            style="cursor: default; z-index: 999"
            :class="{'text-white' : exercise.isSelected, 'text-secondary' : !exercise.isSelected }"
            icon="circle-info"/>
      </div>

    </v-sheet>
  </v-sheet>

  <div class="d-flex justify-space-between pl-5 pr-5">
    <BackButton></BackButton>
    <SubmitButton @click="linkSelectedExercisesToWorkout"></SubmitButton>
  </div>


</template>