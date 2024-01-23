<script setup lang="ts">

import {ExerciseDetail} from "../../models/ExerciseDetail";
import Title from "../../components/Title.vue";
import EditButton from "../../components/EditButton.vue";
import {router} from "../../configuration/Router";
import InfoButton from "../../components/InfoButton.vue";
import {useExerciseStore} from "../../stores/ExerciseStore";

const store = useExerciseStore();

interface Props {
  workoutId: number
  exercises?: ExerciseDetail[]
}

const props = defineProps<Props>();

function goToEditExercise(exercise: ExerciseDetail) {
  store.setExercise(exercise);
  router.push({name: 'EditExercise', params: {workoutId: props.workoutId, exerciseId: exercise.id}})
}


</script>

<template>


  <Title title="Exercises" :underline="true"></Title>

  <v-card rounded="4" v-for="exercise of exercises" :key="exercise.id" class="mb-4">

    <v-container>

      <v-row align="center" no-gutters>
        <v-col cols="2">
          <InfoButton class="float-start"></InfoButton>
        </v-col>
        <v-col cols="8">
          <Title :title="exercise.name"></Title>
        </v-col>
        <v-col cols="2">
          <EditButton class="float-end" @click="goToEditExercise(exercise)"></EditButton>
        </v-col>
      </v-row>

      <v-row align="center" no-gutters>
        <v-col class="text-center pa-0">
          <v-card-text class="card-description">
            Series: {{ exercise.sets }}
          </v-card-text>
          <v-card-text class="card-description">
            Repetitions: {{ exercise.minimumReps }} - {{ exercise.maximumReps }}
          </v-card-text>
        </v-col>

        <v-col class="text-center">
          <v-card-text class="card-description">
            Weight: {{ exercise.weight }}kg
          </v-card-text>
          <v-card-text class="card-description">
            Rest time: {{ exercise.restTimeInMinutes }}m
          </v-card-text>
        </v-col>
      </v-row>

    </v-container>
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

.card-description {
  padding: 4px !important;
  font-weight: bold !important;
}

</style>