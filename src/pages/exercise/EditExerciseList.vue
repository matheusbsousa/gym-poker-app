<script setup lang="ts">

import {Exercise} from "../../models/Exercise";
import {ref} from "vue";
import BackButton from "../../components/BackButton.vue";
import SubmitButton from "../../components/SubmitButton.vue";
import {useRoute, useRouter} from "vue-router";
import AddButton from "../../components/AddButton.vue";
import Title from "../../components/Title.vue";
import {AxiosResponse} from "axios";
import {WorkoutExercises} from "../../models/WorkoutExercises";
import {useExerciseStore} from "../../stores/ExerciseStore";
import {id} from "vuetify/locale";
import {WorkoutDetails} from "../../models/WorkoutDetails";

const router = useRouter();
const workoutId = useRoute().params.workoutId;
const exerciseStore = useExerciseStore();

const dialog = ref(false);
const workoutExercises = ref<WorkoutExercises>();
const linkedExercisesIds = ref<number[]>([]);
const newIds = ref<number[]>([]);

exerciseStore.getExercisesByWorkoutId(Number(workoutId))
    .then(() => {
      workoutExercises.value = exerciseStore.workoutExercises;
      workoutExercises.value?.exercises.sort((a, b) => a.name.localeCompare(b.name));

      if (workoutExercises.value) {
        linkedExercisesIds.value = workoutExercises.value.exercises.filter(exercise => exercise.isSelected).map(exercise => exercise.id);
      }
    });

function select(exercise: Exercise) {
  exercise.isSelected = !exercise.isSelected
}

function newExercice() {
  router.push({name: 'NewExercise', params: {id: workoutId}})
}

function afterLinkExercises(response: AxiosResponse<WorkoutDetails>) {

  if (response.status === 200) {
    newIds.value = response.data.exercises!!
        .filter(exercise => !linkedExercisesIds.value.includes(exercise.customExerciseId!! || exercise.defaultExerciseId!!))
        .map(exercise => exercise.id!!)

  }
  dialog.value = true
  // router.push({name: 'WorkoutDetails', params: {id: workoutId}})
}

function linkSelectedExercisesToWorkout() {

  let workout = workoutExercises.value;

  if (workout === undefined) {
    console.log("Workout object is null!")
    return;
  }

  let workoutId = workout.workout.id

  let exerciseIds: number[] = getExerciseIds(workout.exercises);
  console.log(workoutId + '-' + exerciseIds)
  exerciseStore.linkExercisesToWorkout(workoutId!!, exerciseIds, afterLinkExercises)
}

function getExerciseIds(exercises: Exercise[]) {
  return exercises
      .filter(exercise => exercise.isSelected)
      .map(exercise => exercise.id);
}

function editExerciseDetails() {

  dialog.value = false;

  router.push({
    name: 'EditExercise',
    params: {
      workoutId: workoutId,
      exerciseId: newIds.value[0]
    },
    query: {ids: newIds.value}
  })
}

function backToWorkoutDetails() {
  router.push({name: 'WorkoutDetails', params: {workoutId: workoutId}})
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

  <v-dialog
      v-model="dialog"
      width="50%">
    <v-card rounded>
      <v-card-title class="text-center text-h5">
        Exercise Details
      </v-card-title>
      <v-card-text class="text-center">
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