import {Exercise} from "./Exercise";

export interface ExerciseDetail {
    id?: number
    name: string
    seriesNumber?: number
    restTimeInMinutes?: number
    weight?: number
    repetitionsMinimum?: number
    repetitionsMaximum?: number
    observations?: string
}