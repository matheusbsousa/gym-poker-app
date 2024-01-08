import {defineStore} from 'pinia'
import apiClient from "../configuration/Axios";
import {WorkoutExercises} from "../models/WorkoutExercises";
import {ExerciseDetail} from "../models/ExerciseDetail";
import {WorkoutDetails} from "../models/WorkoutDetails";


interface ExerciseState {
    exerciseDetail: ExerciseDetail
    workoutExercises?: WorkoutExercises
}

export const useExerciseStore = defineStore('exercises', {
    state: (): ExerciseState => (
        {
            exerciseDetail:{
                name: ''
            }
        }
    ),
    actions: {

        async getExercisesByWorkoutId(workoutId: number) {
            return await apiClient.get<WorkoutExercises>(`http://localhost:8080/workouts/${workoutId}/exercises`)
                .then(response => {
                    this.workoutExercises = response.data;
                })
        },

        async getExercisesById(workoutId: number, exerciseId: number) {
            return await apiClient.get<ExerciseDetail>(`http://localhost:8080/workouts/${workoutId}/exercises/${exerciseId}`)
                .then(response => {
                    this.exerciseDetail = response.data;
                })
        },

        async linkExercisesToWorkout(workoutId: number, exerciseIds: number[], callback: Function, fail?: Function) {
            return await apiClient.put<WorkoutDetails>(`http://localhost:8080/workouts/${workoutId}/exercises`,
                exerciseIds)
                .then(response => {

                    callback(response);

                })
                .catch(error => {
                    if (fail) {
                        fail(error)
                    }
                })
        },

        async createExercise(workoutId: number, exercise: ExerciseDetail) {
            return await apiClient.post<ExerciseDetail>(`http://localhost:8080/workouts/${workoutId}/exercises`,
                exercise)
                .then(response => {
                    this.exerciseDetail = response.data;
                });
        },

        async updateExercise(workoutId: number, exerciseId: number, exercise: ExerciseDetail) {
            return await apiClient.put<ExerciseDetail>(`http://localhost:8080/workouts/${workoutId}/exercises/${exerciseId}`,
                exercise)
                .then(response => {
                    this.exerciseDetail = response.data;
                });
        },

    },
    getters: {
        getExerciseId(): number {
            return this.exerciseDetail?.id!!;
        }
    }
})