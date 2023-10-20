import {Exercise} from "./Exercise";
import {ExerciseDetail} from "./ExerciseDetail";
import {Workout} from "./Workout";

export interface WorkoutDetails {
    workout: Workout
    exercises?: ExerciseDetail[]
}