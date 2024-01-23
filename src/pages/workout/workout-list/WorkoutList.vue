<script setup lang="ts">

import {useRouter} from "vue-router";
import Title from "../../../components/Title.vue";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {inactiveWorkouts as inactive, workouts} from "../../../constants/DATA";
import AddButton from "../../../components/AddButton.vue";

const route = useRouter();

const activeWorkouts = workouts
const inactiveWorkouts = inactive

function addWorkout() {
  route.push('/workouts/new')
}

</script>

<template>
  <v-container fluid style="max-width: 1000px">
    <v-row align="center">
      <v-col cols="8" offset="2">
        <Title title="Workout List"></Title>
      </v-col>
      <v-col cols="2">
        <AddButton class="float-end" @click="addWorkout"></AddButton>
      </v-col>
    </v-row>


    <div class="flex-column">
      <a v-for="workout of activeWorkouts">
        <router-link style="text-decoration: none" :to="`/workouts/${workout.id}`">
          <v-sheet :elevation="1" :height="80" class="mt-2 mb-2 d-flex align-center rounded">
            <div class="pa-4 size">
              <font-awesome-icon class="text-red text-h5" :icon="workout.type"/>
            </div>
            <div class="flex-1-0">
              <p class="size text-h6">
                {{ workout.name }}
              </p>
              <p class="text-subtitle-2">
                {{ workout.days }}
              </p>
            </div>
          </v-sheet>
        </router-link>
      </a>
    </div>

    <div v-if="inactiveWorkouts.length > 0">
      <div class="d-flex justify-center border-b-sm ma-4">
        <h5 class="text-h6 text-grey-darken-1">Inactive</h5>
      </div>
      <div class="d-flex flex-column mt-2">
        <a v-for="workout of inactiveWorkouts">
          <router-link style="text-decoration: none" :to="`/workouts/${workout.id}`">

            <v-sheet :elevation="1" :height="80" class="mt-2 mb-2 d-flex align-center rounded">
              <div class="pa-4 size">
                <font-awesome-icon class="text-red text-h5" :icon="workout.type"/>
              </div>
              <div class="flex-1-0">
                <p class="size text-h6">
                  {{ workout.name }}
                </p>
                <p class="text-subtitle-2">
                  {{ workout.days }}
                </p>
              </div>
            </v-sheet>
          </router-link>
        </a>
      </div>
    </div>
  </v-container>
</template>