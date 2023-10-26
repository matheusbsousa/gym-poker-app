<script setup lang="ts">

import Title from "../../components/Title.vue";
import BackButton from "../../components/BackButton.vue";
import SubmitButton from "../../components/SubmitButton.vue";
import {ref} from "vue";
import {maxLength, maxValue, minLength, minValue, numeric, required} from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import {router} from "../../configuration/Router";
import {useRoute} from "vue-router";
import {useExerciseStore} from "../../stores/ExerciseStore";
import {ExerciseDetail} from "../../models/ExerciseDetail";

const route = useRoute();
const workoutId = Number(route.params.workoutId)
const exerciseId = Number(route.params.exerciseId)
const exerciseStore = useExerciseStore();
exerciseStore.getExercisesById(workoutId, exerciseId)
    .then(() => {
      formData.value = exerciseStore.exerciseDetail;
    })


const formData = ref<any>({
  name: '',
  seriesNumber: undefined,
  restTimeInMinutes: undefined,
  weight: undefined,
  repetitionsMinimum: undefined,
  repetitionsMaximum: undefined,
  observations: ''
});

const rules = {
  name: {
    required: required,
    minLength: minLength(1),
    maxLength: maxLength(70)
  },
  weight: {
    numeric: numeric,
    minValue: minValue(1),
    maxValue: maxValue(999)
  },
  repetitionsMinimum: {
    numeric: numeric,
    minValue: minValue(1),
    maxValue: maxValue(99)
  },
  repetitionsMaximum: {
    numeric: numeric,
    minValue: minValue(1),
    maxValue: maxValue(99)
  },
  seriesNumber: {
    numeric: numeric,
    minValue: minValue(1),
    maxValue: maxValue(99)
  },
  restTimeInMinutes: {
    numeric: numeric,
    minValue: minValue(1),
    maxValue: maxValue(99)
  },
  observations: {
    minLength: minLength(1),
    maxLength: maxLength(255)
  },
}

const v$ = useVuelidate(rules, formData);

async function submitForm() {

  const isFormValid = await v$.value.$validate();

  if (isFormValid) {

    await exerciseStore.updateExercise(workoutId, exerciseStore.getExerciseId, {

      id: formData.value.id,
      name: formData.value.name,
      weight: formData.value.weight,
      repetitionsMinimum: formData.value.repetitionsMinimum,
      repetitionsMaximum: formData.value.repetitionsMaximum,
      seriesNumber: formData.value.seriesNumber,
      restTimeInMinutes: formData.value.restTimeInMinutes,
      observations: formData.value.observations,
    })
        .then(response => {
          router.push({name: 'WorkoutDetails', params: {workoutId: workoutId}})
        })
        .catch(error => {
          console.log(error)
        })
  }
}

</script>

<template>

  <Title title="New Exercise"></Title>

  <v-sheet elevation="2" class="rounded pa-4">

    <v-form @submit.prevent @submit="submitForm">

      <v-container>
        <v-row>
          <v-col>
            <v-text-field v-model="formData.name"
                          @input="v$.name.$touch"
                          @blur="v$.name.$touch"
                          :error-messages="v$.name.$errors.map(e => e.$message).join(' - ')"
                          label="Exercise name"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row align="center">
          <v-col cols="2">
            <v-text-field v-model="formData.weight"
                          @input="v$.weight.$touch"
                          @blur="v$.weight.$touch"
                          :error-messages="v$.weight.$errors.map(e => e.$message).join(' - ')"
                          label="Weight"
                          type="number"
            ></v-text-field>
          </v-col>
          <v-col class="pl-0">
            <v-label>Kg</v-label>
          </v-col>
        </v-row>

        <v-row align="center">
          <v-col cols="2">
            <v-text-field v-model="formData.seriesNumber"
                          @input="v$.seriesNumber.$touch"
                          @blur="v$.seriesNumber.$touch"
                          :error-messages="v$.seriesNumber.$errors.map(e => e.$message).join(' - ')"
                          label="Series"
                          type="number"
            ></v-text-field>
          </v-col>
        </v-row>


        <v-label text="Repetitions"/>

        <v-row align="center">
          <v-col cols="2">
            <v-text-field v-model="formData.repetitionsMinimum"
                          @input="v$.repetitionsMinimum.$touch"
                          @blur="v$.repetitionsMinimum.$touch"
                          :error-messages="v$.repetitionsMinimum.$errors.map(e => e.$message).join(' - ')"
                          label="Minimum"
                          type="number"
            ></v-text-field>
          </v-col>
          <v-col cols="1" align-self="center" class="text-center pl-0 pr-0">
            <v-label>And</v-label>
          </v-col>
          <v-col cols="2">
            <v-text-field v-model="formData.repetitionsMaximum"
                          @input="v$.repetitionsMaximum.$touch"
                          @blur="v$.repetitionsMaximum.$touch"
                          :error-messages="v$.repetitionsMaximum.$errors.map(e => e.$message).join(' - ')"
                          label="Maximum"
                          type="number"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row align="center">
          <v-col cols="2">
            <v-text-field v-model="formData.restTimeInMinutes"
                          @input="v$.restTimeInMinutes.$touch"
                          @blur="v$.restTimeInMinutes.$touch"
                          :error-messages="v$.restTimeInMinutes.$errors.map(e => e.$message).join(' - ')"
                          label="Rest time"
                          type="number"
            ></v-text-field>
          </v-col>
          <v-col class="pl-0">
            <v-label>Minutes</v-label>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-textarea v-model="formData.observations"
                        @input="v$.observations.$touch"
                        @blur="v$.observations.$touch"
                        :error-messages="v$.observations.$errors.map(e => e.$message).join(' - ')"
                        label="Observations"
            ></v-textarea>
          </v-col>

        </v-row>


      </v-container>
      <div class="d-flex justify-space-between pl-5 pr-5">
        <BackButton></BackButton>
        <SubmitButton @click="submitForm"></SubmitButton>
      </div>

    </v-form>


  </v-sheet>

</template>

<style scoped>

</style>