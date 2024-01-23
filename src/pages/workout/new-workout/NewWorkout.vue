<script setup lang="ts">
import {reactive} from "vue";
import useVuelidate from "@vuelidate/core";
import {required} from "@vuelidate/validators";
import Title from "../../../components/Title.vue";
import BackButton from "../../../components/BackButton.vue";
import SubmitButton from "../../../components/SubmitButton.vue";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {WeekDaysEnum} from "../../../models/WeekDaysEnum";

interface WorkoutInitialState {
  name: string,
  type: string,
  active: boolean,
  days: string[]
}

const initialState: WorkoutInitialState = {
  name: '',
  type: '',
  active: true,
  days: []
};

const formData = reactive({...initialState})

const rules = {
  active: {required},
  days: {required},
  name: {required},
  type: {required},
}

const v$ = useVuelidate(rules, formData);


async function submitForm() {

  // const isFormValid = await v$.value.$validate()
  //
  // if (isFormValid) {
  //   await workoutsStore.createWorkout({
  //
  //     active: formData.active,
  //     days: formData.days.join(' - '),
  //     name: formData.name,
  //     type: formData.type
  //   })
  //       .then(response => {
  //         router.push("/")
  //       })
  //       .catch(error => {
  //         console.log(error)
  //       })
  // }
}

const weekDays = Object.values(WeekDaysEnum);

function onChangeCheckBox() {

  formData.days.sort((a: any, b: any) => weekDays.indexOf(a) - weekDays.indexOf(b))
      .map((weekDay: any) => weekDay.value)
}

</script>

<template>

  <v-container fluid class="max-container">

  <v-sheet elevation="1" class="rounded pa-4">

  <Title title="New Workout"></Title>

    <v-form @submit.prevent @submit="submitForm" class="flex-1-1-100">

      <p class=" pa-1 mt-2 text-h7">Name: </p>
      <v-text-field v-model="formData.name"
                    @input="v$.name.$touch"
                    @blur="v$.name.$touch"
                    :error-messages="v$.name.$errors.map(e => e.$message).join(' - ')">

      </v-text-field>

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
      <p class="error-message ml-4"
         v-if="v$.days.$dirty"> {{ v$.days.$errors.map(e => e.$message).join(' - ') }}
      </p>

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