import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from "@/views/user/LoginView.vue";
import ErrorView from "@/views/ErrorView.vue";
import RegistrationView from "@/views/user/RegistrationView.vue";



const routes = [
    {
        path: '/',
        name: 'homeRoute',
        component: HomeView
    },
    {
        path: '/login',
        name: 'loginRoute',
        component: LoginView
    },

    {
        path: '/error',
        name: 'errorRoute',
        component: ErrorView
    },

    {
        path: '/registration',
        name: 'registrationRoute',
        component: RegistrationView
    },


]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
