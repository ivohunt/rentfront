import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from "@/views/user/LoginView.vue";
import ErrorView from "@/views/ErrorView.vue";
import RegistrationView from "@/views/user/RegistrationView.vue";
import PriceEditView from "@/views/equipment/price/PriceEditView.vue";


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

    {
        path: '/price-edit',
        name: 'priceEditRoute',
        component: PriceEditView
    },


]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
