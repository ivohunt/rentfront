<template>
  <LogoutModal :modal-is-open="modalIsOpen"
               @event-close-modal="closeLogoutModal"
               @event-execute-logout="executeLogout"
  />
  <nav>
    <router-link to="/">Avaleht</router-link> |

    <template v-if="isAdmin">
      <router-link to="/all-orders">Tellimused</router-link> |
      <router-link to="/price-edit">Hinnad & kategooriad</router-link> |
      <router-link to="/add-item">Varustuse lisamine</router-link> |
    </template>

    <template v-if="isCustomer">
      <router-link to="/available-equipment">Saadaval varustus</router-link> |
      <router-link to="/order-history">Varasemad tellimused</router-link> |
      <template v-if="userHasOpenOrder">
        <font-awesome-icon @click="navigateToOrderConfirmationView" class="cursor-pointer me-3" icon="fa-solid fa-cart-shopping" />
      </template>
      <template>

      </template>
    </template>

    <template v-if="!isLoggedIn">
      <router-link to="/prices">Hinnad</router-link> |
      <router-link to="/FAQ">KKK</router-link> |
      <router-link to="/contact">Kontakt</router-link> |
    </template>

    <template v-if="isLoggedIn">
      <div>
        Sisse logitud userId: {{ userId }}
      </div>
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
import OrderService from "@/service/OrderService";

export default {
  name: 'App',
  components: {LogoutModal},
  data() {
    return {
      isLoggedIn: false,
      isAdmin: false,
      isCustomer: false,
      userHasOpenOrder: false,
      orderId: 0,
      modalIsOpen: false,
      userId: '',
    }
  },
  methods: {

    updateNavMenu() {
      this.isLoggedIn = SessionStorageService.isLoggedIn()
      this.isAdmin = SessionStorageService.isAdmin()
      this.isCustomer = SessionStorageService.isCustomer()
      this.userHasOpenOrder = SessionStorageService.userHasOpenOrder()
      this.orderId = SessionStorageService.getOrderId()
      this.userId = SessionStorageService.getNavbarUserId()
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

    navigateToOrderConfirmationView() {
      NavigationService.navigateToOrderConfirmationView(this.orderId)
    },

  },

  mounted() {
    this.updateNavMenu()
  }
}
</script>
