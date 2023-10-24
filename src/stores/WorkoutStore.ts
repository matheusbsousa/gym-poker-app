import {defineStore} from 'pinia'
import {Workout} from "../models/Workout";
import {BASE_URL} from "../constants/Constants";
import {ref} from "vue";
import apiClient from "../configuration/Axios";
import {WorkoutDetails} from "../models/WorkoutDetails";
import {WorkoutExercises} from "../models/WorkoutExercises";


interface WorkoutState {
    workouts: Workout[]
    selectedWorkout?: Workout
    isActive?: boolean
}

const path: string = '/workouts'

function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

function getPath(): string {
    return BASE_URL + path;
}

export const useWorkoutStore = defineStore('workouts', {
    state: (): WorkoutState => ({
        workouts: [],
    }),
    actions: {
        setSelectedWorkout(workout: Workout) {
            this.selectedWorkout = workout;
            console.log(this.selectedWorkout)
        },
        setStateIsActive(isActive: boolean) {
            this.isActive = isActive;
        },

        async fetchWorkouts() {
            const result = await apiClient.get('/workouts');
            this.workouts = result.data;
        },

        async getWorkoutById(id: number, callback: Function, fail?: Function) {
            return await apiClient.get<WorkoutDetails>(`http://localhost:8080/workouts/${id}`)
                .then(response => {

                    callback(response)

                })
                .catch(error => {
                    if (fail) {
                        fail(error)
                    }
                })
        },

        async getExercisesByWorkoutId(workoutId: number, callback: Function, fail?: Function) {
            return await apiClient.get<WorkoutExercises>(`http://localhost:8080/workouts/${workoutId}/exercises`)
                .then(response => {

                    callback(response);

                })
                .catch(error => {
                    if (fail) {
                        fail(error)
                    }
                })
        },

        async linkExercisesToWorkout(workoutId: number, exerciseIds: number[], callback: Function, fail?: Function) {
            return await apiClient.put<WorkoutExercises>(`http://localhost:8080/workouts/${workoutId}/exercises`,
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

        async updateWorkout(id: number, workout: Workout): Promise<any> {
            return await apiClient.put<Workout>(`/workouts/${id}`, workout)
        },

        async deleteWorkout(id: number): Promise<any> {
            return await apiClient.delete(`/workouts/${id}`)
        },

        async createWorkout(workout: Workout) {

            const body = JSON.stringify(workout)

            return await window.fetch(getPath(), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body
            });
        },

        filterWrokouts(active: boolean): Workout[] {

            return this.workouts
                .filter(workout => workout.active === active)
        },


    },
    getters: {
        getActiveWorkouts: (state): Workout[] => {

            return state.workouts
                .filter(workout => {
                    if (state.isActive === true) {
                        return workout.active === true;
                    }

                    if (state.isActive === false) {
                        return workout.active === false;
                    }
                    return workout;
                })
        }
    }
})