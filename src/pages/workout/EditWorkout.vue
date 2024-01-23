<script setup lang="ts">
import {useRoute} from "vue-router";
import useVuelidate from "@vuelidate/core";
import {required} from "@vuelidate/validators";
import {ref} from "vue";
import BackButton from "../../components/BackButton.vue";
import SubmitButton from "../../components/SubmitButton.vue";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import Title from "../../components/Title.vue";
import {WeekDaysEnum} from "../../models/WeekDaysEnum";
import DeleteButton from "../../components/DeleteButton.vue";

const route = useRoute();
const workoutId = Number(route.params.workoutId)

let formData = ref({
  name: '',
  type: '',
  days: [''],
  active: false
})

const rules = {
  name: {required},
  type: {required},
  days: {required},
  active: {required}
}

function callback(response: any) {
  if (response.status === 200) {
    formData.value = {...response.data.workout, days: response.data.workout.days.split(' - ')}
  }
}

let v$ = useVuelidate(rules, formData);

async function submitForm() {
  //
  // const isFormValid = await v$.value.$validate()
  //
  // if (isFormValid) {
  //
  //   await workoutStore.updateWorkout(workoutId, {
  //     active: formData.value.active,
  //     days: formData.value.days.join(' - '),
  //     name: formData.value.name,
  //     type: formData.value.type,
  //     id: workoutId
  //   })
  //       .then(response => {
  //         console.log(response)
  //         router.push({name: 'WorkoutDetails', params: {workoutId: workoutId}})
  //       })
  //       .catch(error => {
  //         console.log(error)
  //       })
  // }
}

const weekDays = Object.values(WeekDaysEnum);

function onChangeCheckBox() {

  formData.value.days.sort((a: any, b: any) => weekDays.indexOf(a) - weekDays.indexOf(b))
      .map((weekDay: any) => weekDay.value)
}

function deleteWorkout() {

}


</script>

<template>

  <v-container fluid class="max-container">

    <v-sheet elevation="1" class="rounded pa-4">

    <v-row align="center">
      <v-col cols="8" offset="2">
        <Title title="Edit Workout"></Title>
      </v-col>
      <v-col cols="2">
        <DeleteButton class="float-end" @click="deleteWorkout"></DeleteButton>
      </v-col>
    </v-row>


      <v-form @submit.prevent class="flex-1-1-100">

        <p class=" pa-1 mt-2 text-h7">Name: </p>
        <v-text-field v-model="formData.name"
                      @input="v$.name.$touch"
                      @blur="v$.name.$touch"
                      :error-messages="v$.name.$errors.map(e => e.$message).join(' - ')"
                      label="Workout Name"></v-text-field>


        <p class=" pa-1 mt-2 text-h7">Training Days:</p>
        <div class="d-flex flex-column flex-md-row">
          <v-checkbox
              v-for="weekDay of weekDays" :key="weekDay"
              v-model="formData.days"
              :label="weekDay"
              :value="weekDay"
              @change="onChangeCheckBox"
          ></v-checkbox>
        </div>

        <p class=" pa-1 mt-2 text-h7">Workout Status:</p>
        <v-radio-group inline :error-messages="v$.active.$errors.map(e => e.$message).join(' - ')"
                       v-model="formData.active">
          <v-radio label="Active" :value="true"></v-radio>
          <v-radio label="Inactive" :value="false"></v-radio>
        </v-radio-group>

        <p class=" pa-1 mt-2 text-h7">Type:</p>
        <v-radio-group inline class="pa-2" :error-messages="v$.type.$errors.map(e => e.$message).join(' - ')"
                       v-model="formData.type">
          <div class="d-flex align-center mr-3">
            <v-radio value="a"></v-radio>
            <font-awesome-icon class="text-red text-h4" icon="a"/>
          </div>

          <div class="d-flex align-center mr-3">
            <v-radio value="b"></v-radio>
            <font-awesome-icon class="text-red text-h4" icon="b"/>
          </div>

          <div class="d-flex align-center mr-3">
            <v-radio value="c"></v-radio>
            <font-awesome-icon class="text-red text-h4" icon="c"/>
          </div>

        </v-radio-group>

        <div class="d-flex justify-space-between pl-5 pr-5">
          <BackButton></BackButton>
          <SubmitButton @click="submitForm"></SubmitButton>
        </div>

      </v-form>
    </v-sheet>
  </v-container>
</template>

<style scoped>

.error-message {
  color: rgb(176, 0, 32);
  line-height: 12px;
  word-break: break-word;
  overflow-wrap: break-word;
  word-wrap: break-word;
  hyphens: auto;
  transition-duration: 150ms;
  font-size: 12px;
}

</style>