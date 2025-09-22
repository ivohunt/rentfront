import router from "@/router";

export default {
    navigateToLoginView() {
        router.push({name: 'loginRoute'})
    },

    navigateToHomeView() {
        alert("Navigeeeri kodu vaatele, todo")
        router.push({name: '????'})
    },
}