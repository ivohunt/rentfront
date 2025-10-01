import router from "@/router";

export default {
    navigateToLoginView() {
        router.push({name: 'loginRoute'})
    },

    navigateToHomeView() {
        router.push({name: 'homeRoute'})
    },

    navigateToErrorView() {
        router.push({name: 'errorRoute'})
    },

    navigateToAvailableEquipmentView() {
        router.push({name: 'availableEquipmentRoute'})
    },

    navigateToOpenOrder() {
        router.push({name: 'openOrderView'})
    },

    navigateToOrderConfirmationView(orderId) {
        router.push({
            name: 'orderConfirmationRoute',
            query: {
                orderId: orderId
            }
        })
    },
}