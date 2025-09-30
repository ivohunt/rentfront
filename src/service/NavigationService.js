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

    navigateToOrderEditView(orderId) {
        router.push({
            name: 'orderEditRoute',
            query: {
                orderId: orderId
            }
        })
    },

}