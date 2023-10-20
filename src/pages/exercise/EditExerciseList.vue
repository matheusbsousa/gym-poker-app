<script setup lang="ts">

import {Exercise} from "../../models/Exercise";
import {ref} from "vue";
import BackButton from "../../components/BackButton.vue";
import SubmitButton from "../../components/SubmitButton.vue";
import {useRouter} from "vue-router";
import {useRoute} from 'vue-router'
import {router} from "../../configuration/Router"
import AddButton from "../../components/AddButton.vue";
import Title from "../../components/Title.vue";

const router = useRouter();
const workoutId = useRoute().params.id;
const exercises = ref<Exercise[]>([
  {
    id: 1,
    name: 'Bíceps barra',
    isSelected: true,
    default: true
  },
  {
    id: 2,
    name: 'Bíceps barra',
    isSelected: false,
    default: true
  },
  {
    id: 3,
    name: 'Bíceps barra',
    isSelected: true,
    default: true
  },
]);


function select(exercise: Exercise) {
  exercise.isSelected = !exercise.isSelected
}

function submitList() {
  router.push("/workouts/" + workoutId)
}

function newExercice() {
  router.push({name: 'NewExercise', params: {id: workoutId}})
}

</script>


<template>

  <Title title="Exercise List">
    <template #button>
      <AddButton @click="newExercice"></AddButton>
    </template>

  </Title>

  <v-sheet class="pa-4">

    <v-sheet v-for="exercise of exercises" :key="exercise.id" :class="{ 'bg-primary' : exercise.isSelected }"
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
    <SubmitButton @click="submitList"></SubmitButton>
  </div>


</template>