<template>

  <div class="container justify-content-center text-center">
    <div class="row justify-content-center">
      <h1>Logi sisse</h1>
    </div>

    <div class="row justify-content-center">

      <div class="col-5">
        <AlertSad :message="errorMessage"/>
        <div class="form-floating mb-3 ">
          <input v-model="email" type="email" class="form-control" placeholder="admin@admin.ee">
          <label for="floatingInput">Email aadress</label>
        </div>

        <div class="form-floating mb-3">
          <input v-model="password" @keydown.enter="login" type="password" class="form-control" placeholder="Password">
          <label for="floatingPassword">Parool</label>
        </div>

        <button @click="login" type="button" class="btn btn-primary mb-3">Logi sisse</button>

        <div>
          Ei ole kasutaja? <a href="/registration">Loo uus kasutaja</a>
        </div>

      </div>
    </div>

  </div>

</template>

<script>
import AlertSad from "@/components/alert/AlertSad.vue";
import LoginService from "@/service/LoginService.js";
import NavigationService from "@/service/NavigationService";

export default {
  name: 'LoginView',
  components: {AlertSad},
  data() {
    return {
      email: '',
      password: '',
      errorMessage: '',

      loginResponse: {
        userId: 0,
        roleName: '',
        userHasOpenOrder: false,
        orderId: 0,
      },

      errorResponse: {
        message: '',
        errorCode: 0
      }
    }
  },

  methods: {

    login() {

      if (this.email.length > 0 && this.password.length > 0) {
        LoginService.sendLoginRequest(this.email, this.password)
            .then(response => this.handleLoginRequestResponse(response))
            .catch(error => this.handleLoginRequestError(error));
      } else {
        this.handleFieldsIncorrectInputAlert()
      }
    },

    handleLoginRequestResponse(response) {
      this.loginResponse = response.data;

      // Save user info in session
      sessionStorage.setItem("userId", this.loginResponse.userId);
      sessionStorage.setItem("roleName", this.loginResponse.roleName);
      sessionStorage.setItem("userHasOpenOrder", this.loginResponse.userHasOpenOrder);
      sessionStorage.setItem("orderId", this.loginResponse.orderId);

      // Emit and redirect
      this.$emit("event-user-logged-in");

      if (this.loginResponse.userHasOpenOrder) {
        NavigationService.navigateToOrderConfirmationView(this.loginResponse.orderId)
      } else {
        NavigationService.navigateToAvailableEquipmentView()
      }

    },

    handleFieldsIncorrectInputAlert() {
      this.errorMessage = "Täida kõik väljad"
      setTimeout(this.resetErrorMessage, 2000)
    },

    resetErrorMessage() {
      this.errorMessage = ''
    },

    handleLoginRequestError(error) {
      this.errorResponse = error.response.data
      if (error.response.status === 403 && error.response.data.errorCode === 111 ) {
        this.message =this.errorResponse.message
        setTimeout(this.resetErrorMessage, 2000)
      } else {
        NavigationService.navigateToErrorView()
      }

    }
  }
}

</script>