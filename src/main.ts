// Vue
import {createApp} from 'vue';
import {router} from './configuration/Router'

// import the fontawesome core
import {library} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import {
    faCircleInfo,
    faPenToSquare,
    faPlus,
    faArrowLeft,
    faCheck,
    faA,
    faC,
    faB, faTrash
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
    components,
    directives,
})


app
    .use(pinia)
    .use(vuetify)
    .use(router)
    .component('font-awesome-icon', FontAwesomeIcon)
    .mount('#app')
