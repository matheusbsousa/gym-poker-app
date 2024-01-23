import {Workout} from "../models/Workout";
import {Exercise} from "../models/Exercise";
import {ExerciseDetail} from "../models/ExerciseDetail";

export const workouts: Workout[] = [
    {
        id: 1,
        name: 'Test Workout',
        type: 'a',
        days: 'Monday - Tuesday',
        active: true,
        exercises: [
            {
                id: 1,
                name: 'Test Exercise',
                sets: 3,
                minimumReps: 8,
                maximumReps: 10,
                weight: 100,
                restTimeInMinutes: 1,
                defaultExerciseId: 1,
                customExerciseId: undefined,
                observations: undefined,
            },
            {
                id: 2,
                name: 'Test Exercise',
                sets: 3,
                minimumReps: 8,
                maximumReps: 10,
                weight: 100,
                restTimeInMinutes: 1,
                defaultExerciseId: 1,
                customExerciseId: undefined,
                observations: undefined,
            },
            {
                id: 3,
                name: 'Test Exercise',
                sets: 3,
                minimumReps: 8,
                maximumReps: 10,
                weight: 100,
                restTimeInMinutes: 1,
                defaultExerciseId: 1,
                customExerciseId: undefined,
                observations: undefined,
            }
        ]
    }
]

export const inactiveWorkouts: Workout[] = [
    {
        id: 2,
        name: 'Test Workout',
        type: 'a',
        days: 'Monday - Tuesday',
        active: false,
        exercises: []
    }
]

export const exercises: Exercise[] = [
    {
        id: 1,
        name: 'Test Exercise 1',
        isSelected: true,
        default: true
    },
    {
        id: 2,
        name: 'Test Exercise 2',
        isSelected: true,
        default: true
    },
    {
        id: 3,
        name: 'Test Exercise 3',
        isSelected: false,
        default: true
    },
    {
        id: 4,
        name: 'Test Exercise 4',
        isSelected: false,
        default: false
    },
    {
        id: 5,
        name: 'Test Exercise 5',
        isSelected: true,
        default: false
    },
    {
        id: 6,
        name: 'Test Exercise 6',
        isSelected: false,
        default: true
    },
    {
        id: 7,
        name: 'Test Exercise 7',
        isSelected: false,
        default: true
    }
]

export const exerciseDetail: ExerciseDetail = {
    id: 1,
    name: 'Test Exercise',
    sets: 3,
    minimumReps: 8,
    maximumReps: 10,
    weight: 100,
    restTimeInMinutes: 1,
    defaultExerciseId: 1,
    customExerciseId: undefined,
    observations: undefined,
}