<template>

  <LogoutModal :modal-is-open="modalIsOpen"
               @event-close-modal="closeLogoutModal"
               @event-execute-logout="executeLogout"
  />
  <nav>


    <router-link to="/">Avaleht</router-link>
    |
    <template v-if="isAdmin">
      <router-link to="/price-edit" class="me-2"> Hinnad & kategooriad |</router-link>
    </template>

    <template v-if="isAdmin">
      <router-link to="/equipment" class="me-2"> Varustus |</router-link>
    </template>

    <template v-if="isAdmin">
      <router-link to="/all-orders"> Tellimused | </router-link>
    </template>

    <template v-if="isCustomer">
      <router-link to="/order-history"> Minu tellimused</router-link>
      |
    </template>


    <template v-if="isLoggedIn">
      <font-awesome-icon @click="startLogout" type="button" icon="fa-solid fa-right-from-bracket"/>
    </template>


    <template v-if="!isLoggedIn">
      <router-link to="/login">Logi sisse</router-link>
    </template>

  </nav>
  <router-view @event-user-logged-in="updateNavMenu"/>
</template>

<script>
import SessionStorageService from "@/service/SessionStorageService";
import NavigationService from "@/service/NavigationService";
import LogoutModal from "@/components/modal/LogoutModal.vue";


export default {
  name: 'App',
  components: {LogoutModal},
  data() {
    return {
      isLoggedIn: false,
      isAdmin: false,
      isCustomer: false,
      modalIsOpen: false
    }
  },
  methods: {

    updateNavMenu() {
      this.isLoggedIn = SessionStorageService.isLoggedIn()
      this.isAdmin = SessionStorageService.isAdmin()
      this.isCustomer = SessionStorageService.isCustomer()
    },

    startLogout() {
      this.modalIsOpen = true;
    },

    executeLogout() {
      sessionStorage.clear()
      this.updateNavMenu()
      this.closeLogoutModal()
      NavigationService.navigateToHomeView()
    },

    closeLogoutModal() {
      this.modalIsOpen = false;
    },


  },
  mounted() {
  }
}
</script>