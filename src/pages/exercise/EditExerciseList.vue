<script setup lang="ts">

import {Exercise} from "../../models/Exercise";
import {ref} from "vue";
import BackButton from "../../components/BackButton.vue";
import SubmitButton from "../../components/SubmitButton.vue";
import {useRoute, useRouter} from "vue-router";
import AddButton from "../../components/AddButton.vue";
import Title from "../../components/Title.vue";
import {WorkoutDetails} from "../../models/WorkoutDetails";
import {useExerciseStore} from "../../stores/ExerciseStore";

const router = useRouter();
const workoutId = Number(useRoute().params.workoutId);
const exerciseStore = useExerciseStore();
const exercises = ref<Exercise[]>(exerciseStore.getExercises(workoutId))

const dialog = ref(false);

function select(exercise: Exercise) {
  exercise.isSelected = !exercise.isSelected
}

function newExercice() {
  router.push({name: 'NewExercise', params: {workoutId: workoutId}})
}

function submitExercises(exerciseIds: number[]) {

  // Link exercises to workout

  dialog.value = true
}

function linkSelectedExercisesToWorkout() {

  let exerciseIds: number[] = exercises.value
      .filter(exercise => exercise.isSelected)
      .map(exercise => exercise.id);

  submitExercises(exerciseIds)
}

function editExerciseDetails() {

  let linkedExercises = exercises.value.filter(exercise => exercise.isSelected);

  let firstExercise = linkedExercises[0];
  linkedExercises.splice(0, 1)

  exerciseStore.setExercise(firstExercise)
  exerciseStore.setLinkedExercises(linkedExercises)

  dialog.value = false;

  router.push({
    name: 'EditExercise',
    params: {
      workoutId: workoutId,
      exerciseId: firstExercise.id
    },
  })
}

function backToWorkoutDetails() {
  exerciseStore.setLinkedExercises([])
  router.push({name: 'WorkoutDetails', params: {workoutId: workoutId}})
}

</script>


<template>

  <v-container fluid class="max-container">

    <v-sheet class="">

      <v-row align="center">
        <v-col cols="8" offset="2">
          <Title title="Exercise List"></Title>
        </v-col>
        <v-col cols="2">
          <AddButton class="float-end" @click="newExercice"></AddButton>
        </v-col>
      </v-row>

      <v-sheet v-for="exercise of exercises" :key="exercise.id"
               :class="{ 'bg-primary' : exercise.isSelected }"
               class="d-flex justify-space-between align-center mb-5  pointer" rounded elevation="2"
               @click="select(exercise)">

        <v-row align="center">

          <v-col cols="2" align-self="center">
            <v-checkbox v-model="exercise.isSelected" hide-details :value="true"></v-checkbox>
          </v-col>

          <v-col cols="8" class="text-center">
            <p class="font-weight-bold"> {{ exercise.name }}</p>
          </v-col>

          <v-col cols="2">
            <font-awesome-icon
                style="cursor: default; z-index: 999"
                :class="{'text-white' : exercise.isSelected, 'text-secondary' : !exercise.isSelected }"
                icon="circle-info"/>
          </v-col>

        </v-row>
      </v-sheet>
    </v-sheet>

  </v-container>

  <div class="d-flex justify-space-between pl-5 pr-5">
    <BackButton></BackButton>
    <SubmitButton @click="linkSelectedExercisesToWorkout"></SubmitButton>
  </div>

  <v-dialog
      v-model="dialog"
      width="50%">
    <v-card rounded>
      <v-card-title class="text-center text-h5 bg-primary text-white">
        Exercise Details
      </v-card-title>
      <v-card-text class="text-center pa-5">
        Do you want to add the selected exercises information right now?
      </v-card-text>
      <v-divider class="ml-2 mr-2"></v-divider>
      <v-card-actions class="justify-space-around">
        <v-btn color="primary" width="40%" class="font-weight-bold" @click="backToWorkoutDetails">No</v-btn>
        <v-divider :vertical="true"></v-divider>
        <v-btn color="rgb(79 123 223)" width="40%" class="font-weight-bold" @click="editExerciseDetails">Yes</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>