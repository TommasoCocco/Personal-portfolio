import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas, faEnvelope, faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import router from '../routes';

library.add(faEnvelope, faBars, fas);


const app = createApp(App);


app.component('font-awesome-icon', FontAwesomeIcon);

app.use(router)
app.mount('#app');
