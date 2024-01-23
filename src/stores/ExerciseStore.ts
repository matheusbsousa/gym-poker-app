import {createPinia, defineStore} from "pinia";
import {Exercise} from "../models/Exercise";
import {ExerciseDetail} from "../models/ExerciseDetail";
import {exerciseDetail, exercises} from "../constants/DATA";

const pinia = createPinia();

interface ExerciseStoreState {
    exerciseDetail?: ExerciseDetail
    linkedExercises: Exercise[]
}

export const useExerciseStore = defineStore({

    id: 'exerciseStore',

    state: (): ExerciseStoreState => ({
        exerciseDetail: undefined,
        linkedExercises: []
    }),

    getters: {

    },

    actions: {
        setExercise(exercise: ExerciseDetail) {
            this.exerciseDetail = exercise;
        },

        getExerciseByIdAndWorkoutId(exerciseId: number, workoutId: number): ExerciseDetail{
            return exerciseDetail;
        },

        getExercises(workoutId: number): Exercise[] {
            console.log(exercises);
            return exercises;
        },

        setLinkedExercises(exercises: Exercise[]) {
            this.linkedExercises = exercises;
        }
    }
})