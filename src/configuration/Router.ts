import {createRouter, createWebHistory} from "vue-router";
import Home from "../pages/home/Home.vue";
import NewWorkout from "../pages/workout/new-workout/NewWorkout.vue";
import WorkoutDetails from "../pages/workout/WorkoutDetails.vue";
import EditWorkout from "../pages/workout/EditWorkout.vue";
import EditExerciseList from "../pages/exercise/EditExerciseList.vue";
import NewExercise from "../pages/exercise/NewExercise.vue";
import EditExercise from "../pages/exercise/EditExercise.vue";

export const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: Home,
            name: 'Home'
        },
        {
            path: '/workouts/new',
            component: NewWorkout,
            name: 'NewWorkout'
        },
        {
            path: '/workouts/:workoutId',
            component: WorkoutDetails,
            name: 'WorkoutDetails'
        },
        {
            path: '/workouts/:workoutId/edit',
            component: EditWorkout,
            name: 'EditWorkout'
        },
        {
            path: '/workouts/:workoutId/exercises/edit-exercise-list',
            component: EditExerciseList,
            name: 'EditExerciseList'
        },
        {
            path: '/workouts/:workoutId/exercises/new',
            component: NewExercise,
            name: 'NewExercise'
        },
        {
            path: '/workouts/:workoutId/exercises/:exerciseId/edit',
            component: EditExercise,
            name: 'EditExercise',
            props: true
        }

    ]

})