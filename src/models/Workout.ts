import {Exercise} from "./Exercise";
import {ExerciseDetail} from "./ExerciseDetail";

export interface Workout {
    id?: number
    name: string
    type: string
    days: string
    active: boolean
    exercises?: ExerciseDetail[]
}