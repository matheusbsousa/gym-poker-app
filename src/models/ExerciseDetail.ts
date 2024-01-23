import {Exercise} from "./Exercise";

export interface ExerciseDetail {
    id?: number
    name: string
    sets?: number
    restTimeInMinutes?: number
    weight?: number
    minimumReps?: number
    maximumReps?: number
    defaultExerciseId?: number
    customExerciseId?: number
    observations?: string
}