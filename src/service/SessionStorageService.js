export default {
    isAdmin() {
        let roleName = sessionStorage.getItem('roleName');
        return roleName === 'admin';
    },

    isCustomer() {
        let roleName = sessionStorage.getItem('roleName');
        return roleName === 'customer';
    },

    isLoggedIn() {
        let roleName = sessionStorage.getItem('roleName');
        return roleName !== null;
    },

    setOpenOrderId(orderId) {
        sessionStorage.setItem("openOrderId", orderId);
    },

    getOrderId() {
        if (this.isLoggedIn()) {
            return Number(sessionStorage.getItem('orderId'))
        }
        return 0
    },

    getNavbarUserId() {
        if (this.isLoggedIn()){
            return Number(sessionStorage.getItem('userId'))
        }
    },

    userHasOpenOrder() {
        if (this.isLoggedIn()) {
            return 'true' === sessionStorage.getItem('userHasOpenOrder')
        }
        return false;
    },
}