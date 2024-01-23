<script setup lang="ts">

import Title from "../../components/Title.vue";
import BackButton from "../../components/BackButton.vue";
import SubmitButton from "../../components/SubmitButton.vue";
import {onMounted, ref} from "vue";
import {maxLength, maxValue, minLength, minValue, numeric, required} from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import {useRoute} from "vue-router";
import {ExerciseDetail} from "../../models/ExerciseDetail";
import {useExerciseStore} from "../../stores/ExerciseStore";
import {router} from "../../configuration/Router";

const route = useRoute();
const workoutId = Number(route.params.workoutId)
const exerciseId = ref<number>()
const exerciseStore = useExerciseStore();
const exerciseDetail: ExerciseDetail = exerciseStore.exerciseDetail!;
const exercisesToSetup = ref(exerciseStore.linkedExercises)

const formData = ref<any>({
  name: exerciseDetail.name,
  sets: exerciseDetail.sets,
  restTimeInMinutes: exerciseDetail.restTimeInMinutes,
  weight: exerciseDetail.weight,
  minimumReps: exerciseDetail.minimumReps,
  maximumReps: exerciseDetail.maximumReps,
  observations: exerciseDetail.observations
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
  minimumReps: {
    numeric: numeric,
    minValue: minValue(1),
    maxValue: maxValue(99)
  },
  maximumReps: {
    numeric: numeric,
    minValue: minValue(1),
    maxValue: maxValue(99)
  },
  sets: {
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
  //
  //   await exerciseStore.updateExercise(workoutId, exerciseStore.getExerciseId, {
  //     id: formData.value.id,
  //     name: formData.value.name,
  //     weight: formData.value.weight,
  //     repetitionsMinimum: formData.value.repetitionsMinimum,
  //     repetitionsMaximum: formData.value.repetitionsMaximum,
  //     seriesNumber: formData.value.seriesNumber,
  //     restTimeInMinutes: formData.value.restTimeInMinutes,
  //     observations: formData.value.observations,
  //   })
  //       .then(response => {
  //
  //         if (linkedExerciseIds.value.length > 0) {
  //           let index = linkedExerciseIds.value.indexOf(exerciseId.value!!)
  //           linkedExerciseIds.value.splice(index, 1)
  //           if (linkedExerciseIds.value.length > 0) {
  //             console.log(linkedExerciseIds.value)
  //             exerciseId.value = linkedExerciseIds.value[0];
  //             setFormDataExerciseValue();
  //           }else{
  //             router.push({name: 'WorkoutDetails', params: {workoutId: workoutId}})
  //           }
  //         } else {
  //           router.push({name: 'WorkoutDetails', params: {workoutId: workoutId}})
  //         }
  //       })
  //       .catch(error => {
  //         console.log(error)
  //       })
  }

  if(exercisesToSetup.value.length > 0){
    let exercise = exercisesToSetup.value.splice(0, 1)

    let exerciseDetail = exerciseStore.getExerciseByIdAndWorkoutId(exercise[0].id, workoutId)

    formData.value = {
      name: exerciseDetail.name,
      sets: exerciseDetail.sets,
      restTimeInMinutes: exerciseDetail.restTimeInMinutes,
      weight: exerciseDetail.weight,
      minimumReps: exerciseDetail.minimumReps,
      maximumReps: exerciseDetail.maximumReps,
      observations: exerciseDetail.observations
    }
  }else {
    router.push({name: 'WorkoutDetails', params: {workoutId: workoutId}})
  }
}


</script>

<template>


  <v-container class="max-container">

    <v-sheet elevation="1" class="rounded pa-4">

      <Title :title="exerciseDetail.name"></Title>

      <v-form @submit.prevent @submit="submitForm">

        <p class=" pa-1 mt-2 text-h7">Name: </p>
        <v-text-field v-model="formData.name"
                      @input="v$.name.$touch"
                      @blur="v$.name.$touch"
                      :error-messages="v$.name.$errors.map(e => e.$message).join(' - ')"
        ></v-text-field>

        <p class=" pa-1 mt-2 text-h7">Weight (Kg): </p>
        <v-text-field v-model="formData.weight"
                      @input="v$.weight.$touch"
                      @blur="v$.weight.$touch"
                      :error-messages="v$.weight.$errors.map(e => e.$message).join(' - ')"
                      type="number"
        ></v-text-field>

        <p class=" pa-1 mt-2 text-h7">Sets: </p>
        <v-text-field v-model="formData.sets"
                      @input="v$.sets.$touch"
                      @blur="v$.sets.$touch"
                      :error-messages="v$.sets.$errors.map(e => e.$message).join(' - ')"
                      type="number"
        ></v-text-field>

        <p class=" pa-1 mt-2 text-h7">Reps (Minimum):</p>

        <div class="d-flex ga-3">

          <v-text-field v-model="formData.minimumReps"
                        @input="v$.minimumReps.$touch"
                        @blur="v$.minimumReps.$touch"
                        :error-messages="v$.minimumReps.$errors.map(e => e.$message).join(' - ')"
                        label="Minimum"
                        type="number"
          ></v-text-field>

          <v-text-field v-model="formData.maximumReps"
                        @input="v$.maximumReps.$touch"
                        @blur="v$.maximumReps.$touch"
                        :error-messages="v$.maximumReps.$errors.map(e => e.$message).join(' - ')"
                        label="Maximum"
                        type="number"
          ></v-text-field>

        </div>

        <p class=" pa-1 mt-2 text-h7">Rest time (minutes):</p>
        <v-text-field v-model="formData.restTimeInMinutes"
                      @input="v$.restTimeInMinutes.$touch"
                      @blur="v$.restTimeInMinutes.$touch"
                      :error-messages="v$.restTimeInMinutes.$errors.map(e => e.$message).join(' - ')"
                      type="number"
        ></v-text-field>

        <p class=" pa-1 mt-2 text-h7">Observation:</p>
        <v-textarea v-model="formData.observations"
                    @input="v$.observations.$touch"
                    @blur="v$.observations.$touch"
                    :error-messages="v$.observations.$errors.map(e => e.$message).join(' - ')"
        ></v-textarea>

        <div class="d-flex justify-space-between pl-5 pr-5">
          <BackButton></BackButton>
          <SubmitButton @click="submitForm"></SubmitButton>
        </div>

      </v-form>
    </v-sheet>
  </v-container>
</template>

<style scoped>

</style>