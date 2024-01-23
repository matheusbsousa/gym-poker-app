import {describe, expect, it} from "vitest";

import WorkoutList from "./WorkoutList.vue";
import {mount} from '@vue/test-utils'
import {createVuetify} from "vuetify";
import AddButton from "../../../components/AddButton.vue";
import {createMemoryHistory, createRouter, RouterLink} from "vue-router";
import {h} from "vue";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {library} from "@fortawesome/fontawesome-svg-core";
import {faA, faPlus, faS} from "@fortawesome/free-solid-svg-icons";
import Title from "../../../components/Title.vue";

library.add(faPlus, faA, faS)

describe('<WorkoutList />', () => {
    const TestComponent = h('span')
    const HomeComponent = h('span')
    const vuetify = createVuetify();
    const router = createRouter({
        history: createMemoryHistory(),
        routes: [
            {path: '/', name: 'home', component: HomeComponent},
            {path: '/workouts/:workoutId', name: 'test', component: TestComponent}
        ]
    })
    describe('Header', () => {

        const wrapper = mount(WorkoutList, {
            global: {
                plugins: [vuetify, router],
                components: {
                    FontAwesomeIcon
                }
            }
        });

        it('Should render a title', () => {
            expect(wrapper.findComponent(Title).exists()).toBeTruthy();
        })

        it('should render a add button', () => {
            expect(wrapper.findComponent(AddButton).exists()).toBeTruthy();
        })

        it('should render active and inactive workouts', () => {

            const routerLinks = wrapper.findAllComponents({name: 'RouterLink',})

            const expectedPaths = ['/workouts/1', '/workouts/2']

            routerLinks.forEach((routerLink, index) => {

                expect(routerLink.props('to')).toBe(expectedPaths[index])
            })
        })
    })

});
