import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from "@/views/user/LoginView.vue";
import ErrorView from "@/views/ErrorView.vue";
import RegistrationView from "@/views/user/RegistrationView.vue";
import PriceEditView from "@/views/equipment/price/PriceEditView.vue";
import PricesView from "@/views/equipment/price/PricesView.vue";
import EquipmentView from "@/views/equipment/item/EquipmentView.vue";
import ItemView from "@/views/equipment/item/ItemView.vue";
import OrdersAdminView from "@/views/order/OrderAdminView.vue";
import OrderListView from "@/views/order/OrderListView.vue";
import OrderAddView from "@/views/order/OrderAddView.vue";
import OrderConfirmationView from "@/views/order/OrderConfirmationView.vue";
import FAQView from "@/views/other views/FAQView.vue";
import ContactView from "@/views/other views/ContactView.vue";
import ItemAddView from "@/views/equipment/item/ItemAddView.vue";
import OrderAdminView from "@/views/order/OrderAdminView.vue";
import OrderEditView from "@/views/order/OrderEditView.vue";


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

    {
        path: '/prices',
        name: 'pricesRoute',
        component: PricesView
    },

    {
        path: '/equipment',
        name: 'equipmentRoute',
        component: EquipmentView
    },

    {
        path: '/add-item',
        name: 'addItemRoute',
        component: ItemAddView
    },


    {
        path: '/item',
        name: 'itemRoute',
        component: ItemView
    },

    {
        path: '/all-orders',
        name: 'ordersAdminRoute',
        component: OrdersAdminView
    },

    {
        path: '/order-edit',
        name: 'orderEditRoute',
        component: OrderEditView
    },

    {
        path: '/order-history',
        name: 'orderListRoute',
        component: OrderListView
    },

    {
        path: '/order',
        name: 'orderAddRoute',
        component: OrderAddView
    },

    {
        path: '/confirm-order',
        name: 'orderConfirmationRoute',
        component: OrderConfirmationView
    },

    {
        path: '/FAQ',
        name: 'faqRoute',
        component: FAQView
    },

    {
        path: '/contact',
        name: 'contactRoute',
        component: ContactView
    },

]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
