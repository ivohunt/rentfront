<template>
  <nav>
    <router-link to="/">Home</router-link>
    |
    <router-link to="/login">Log in</router-link>
  </nav>
  <router-view/>
</template>

<script>
import sessionStorageService from "@/service/SessionStorageService";

export default {
  name: 'App',
  data() {
    return {
      isLoggedIn:'',
      isAdmin:''
    }
  },
  methods: {

    updateNavMenu() {
      this.isLoggedIn = sessionStorageService.isLoggedIn()
      this.isAdmin = sessionStorageService.isAdmin()
    },



  },
  mounted() {
  }
}
</script>