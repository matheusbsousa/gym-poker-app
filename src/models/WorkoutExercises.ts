import {Exercise} from "./Exercise";
import {ExerciseDetail} from "./ExerciseDetail";
import {Workout} from "./Workout";

export interface WorkoutExercises {
    workout: Workout
    exercises: Exercise[]
}