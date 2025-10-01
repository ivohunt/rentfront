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

    // ✅ Get open order ID
    getOrderId() {
        if (this.isLoggedIn()) {
            return Number(sessionStorage.getItem("orderId"))
        }
        return 0
    },

    // ✅ Check if user has an open order
    userHasOpenOrder() {
        if (this.isLoggedIn()) {
            return Boolean(sessionStorage.getItem("userHasOpenOrder"))
        }
        return false;
    },


    // sessionStorage.setItem("userHasOpenOrder", this.loginResponse.userHasOpenOrder);
    // sessionStorage.setItem("orderId", this.loginResponse.orderId);

    // ✅ Clear open order (when finalized or canceled)
    clearOpenOrder() {
        sessionStorage.removeItem("openOrderId");
    }

}