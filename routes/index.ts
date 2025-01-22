import {createRouter, createWebHistory} from 'vue-router';
import HomePage from "@/components/HomePage.vue";  // Usa il percorso relativo
import AboutPage from '@/components/AboutPage.vue';
import WorkPage from '@/components/WorkPage.vue';
import Footer from '@/components/Footer.vue';

const routes = [
  {path: '/', name: 'Home', component: HomePage},
  {path: '/about', name: 'About', component: AboutPage},
  {path: '/work', name: 'Work', component: WorkPage},
  {path: '/contacts', name: 'Contacts', component: Footer},

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router;