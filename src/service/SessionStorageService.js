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


}