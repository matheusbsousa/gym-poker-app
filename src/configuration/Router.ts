import {createRouter, createWebHistory} from "vue-router";
import Home from "../pages/home/Home.vue";
import NewWorkout from "../pages/workout/NewWorkout.vue";
import WorkoutDetails from "../pages/workout/WorkoutDetails.vue";
import EditWorkout from "../pages/workout/EditWorkout.vue";
import EditExerciseList from "../pages/exercise/EditExerciseList.vue";
import NewExercise from "../pages/exercise/NewExercise.vue";

export const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: Home,
            name: 'Home'
        },
        {
            path: '/workouts/new-workout',
            component: NewWorkout,
            name: 'NewWorkout'
        },
        {
            path: '/workouts/:id',
            component: WorkoutDetails,
            name: 'WorkoutDetails'
        },
        {
            path: '/workouts/:id/edit',
            component: EditWorkout,
            name: 'EditWorkout'
        },
        {
            path: '/workouts/:id/edit-exercises',
            component: EditExerciseList,
            name: 'EditExerciseList'
        },
        {
            path: '/workouts/:id/new-exercise',
            component: NewExercise,
            name: 'NewExercise'
        }

    ]

})