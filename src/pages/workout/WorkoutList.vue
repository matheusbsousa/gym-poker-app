<script setup lang="ts">

import {useRouter} from "vue-router";
import AddButton from "../../components/AddButton.vue";
import {useWorkoutStore} from "../../stores/WorkoutStore";
import Title from "../../components/Title.vue";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

const route = useRouter();
const workoutStore = useWorkoutStore();
await workoutStore.fetchWorkouts();

const addButton = AddButton;

const activeWorkouts = workoutStore.filterWrokouts(true)
const inactiveWorkouts = workoutStore.filterWrokouts(false)

function addWorkout(){
  route.push('/workouts/new')
}

</script>

<template>

  <Title title="WorkoutList">
    <template #button >
      <AddButton @click="addWorkout"></AddButton>
    </template>
  </Title>


  <div class="flex-column">
    <a v-for="workout of activeWorkouts" @click="workoutStore.setSelectedWorkout(workout)">
      <router-link style="text-decoration: none" :to="`/workouts/${workout.id}`">

        <v-sheet :elevation="1" :height="80" class="mt-2 mb-2 d-flex align-center rounded">
          <div class="pa-4 size">
            <font-awesome-icon class="text-red text-h5" :icon="workout.type" />
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
      <a v-for="workout of inactiveWorkouts" @click="workoutStore.setSelectedWorkout(workout)">
        <router-link style="text-decoration: none" :to="`/workouts/${workout.id}`">

          <v-sheet :elevation="1" :height="80" class="mt-2 mb-2 d-flex align-center rounded">
            <div class="pa-4 size">
              <font-awesome-icon class="text-red text-h5" :icon="workout.type" />
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


</template>