<template>

  <LogoutModal :modal-is-open="modalIsOpen"
               @event-close-modal="closeLogoutModal"
               @event-execute-logout="executeLogout"
  />
  <nav>


    <router-link to="/">Home</router-link>
|
    <template v-if="isAdmin">
<!--// admin vaated: -->
    </template>


    <template v-if="isLoggedIn">
      <font-awesome-icon @click="startLogout" class="cursor-pointed" icon="fa-solid fa-right-from-bracket" />
    </template>


    <template v-if="!isLoggedIn">
      <router-link to="/login">Log in</router-link>
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
      modalIsOpen: false
    }
  },
  methods: {

    updateNavMenu() {
      this.isLoggedIn = SessionStorageService.isLoggedIn()
      this.isAdmin = SessionStorageService.isAdmin()
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