// Vue
import {createApp} from 'vue';
import {router} from './configuration/Router'

// import the fontawesome core
import {library} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import {
    faA,
    faArrowLeft,
    faB,
    faC,
    faCheck,
    faCircleInfo,
    faPenToSquare,
    faPlus,
    faTrash
} from "@fortawesome/free-solid-svg-icons";

// Pinia
import {createPinia} from 'pinia';

// Vuetify
import 'vuetify/styles'
import {createVuetify} from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import App from './App.vue'

// CSS
import './style.css';

// Font Awesome
library.add(faPlus, faCircleInfo, faPenToSquare, faArrowLeft, faCheck, faA, faB, faC, faTrash)


const app = createApp(App);

const pinia = createPinia();

const vuetify = createVuetify({
    theme: {
        themes: {
            light: {
                dark: false,
                colors: {
                    primary: '#A42828',
                    secondary: '#D9D9D9'
                }
            }
        }
    },
    display: {
        thresholds: {
            xs: 0,
            sm: 600,
            md: 850,
            lg: 1264,
        }
    },
    components,
    directives,
})


app
    .use(pinia)
    .use(vuetify)
    .use(router)
    .component('font-awesome-icon', FontAwesomeIcon)
    .mount('#app')
