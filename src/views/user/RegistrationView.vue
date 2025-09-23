<template>
  <div>
    <div class="row justify-content-center">
      <h1>Uue kasutaja loomine</h1>
    </div>


    <div class="row col-4 mx-auto">

      <AlertSad :message="errorMessage"/>
      <AlertGood :message="successMessage"/>

      <div class="col">
        <div class="form-floating mb-3">
          <input v-model="user.firstName" type="text" class="form-control" placeholder="Eesnimi">
          <label for="floatingInput">Eesnimi</label>
        </div>

      </div>

      <div class="col">
        <div class="form-floating">
          <div class="form-floating mb-3">
            <input v-model="user.lastName" type="text" class="form-control" placeholder="Perenimi">
            <label for="floatingInput">Perenimi</label>
          </div>
        </div>
      </div>
    </div>


    <div class="row col-4 mx-auto">
      <div>
        <div class="form-floating mb-3">
          <input v-model="user.email" type="email" class="form-control" placeholder="E-mail">
          <label for="floatingInput">E-mail</label>
        </div>
      </div>

      <div>
        <div class="form-floating mb-3">
          <input v-model="user.telephone" type="text" class="form-control" placeholder="Telefon">
          <label for="floatingInput">Telefon</label>
        </div>
      </div>


      <div class="col">
        <div class="form-floating mb-3">
          <input v-model="user.password" type="password" class="form-control" placeholder="Parool">
          <label for="floatingInput">Parool</label>
        </div>

      </div>

      <div class="col">
        <div class="form-floating">
          <div class="form-floating mb-3">
            <input v-model="passwordRetype" type="password" class="form-control" placeholder="Parool uuesti">
            <label for="floatingInput">Parool uuesti</label>
          </div>
        </div>
      </div>

      <button @click="registerUser" class="btn btn-primary mb-3" type="submit">Registreeri uus kasutaja</button>

    </div>
  </div>


</template>

<script>
import AlertSad from "@/components/alert/AlertSad.vue";
import UserService from "@/service/UserService";
import AlertGood from "@/components/alert/AlertGood.vue";
import NavigationService from "@/service/NavigationService";

export default {
  name: 'RegistrationView',
  components: {AlertGood, AlertSad},
  data() {
    return {
      passwordRetype: '',
      errorMessage: '',
      successMessage: '',

      user: {
        firstName: '',
        lastName: '',
        email: '',
        telephone: '',
        password: ''
      }
    }
  },
  methods: {

    registerUser() {


      this.findIfInputFieldsAreFilled()
      this.findIfPasswordMatch()
      if (this.errorMessage === '') {
        UserService.sendPostUserRegistrationRequest(this.user)
            .then(() => this.handleAddUserResponse())
            .catch(error => this.handleAddUserError(error))
      } else NavigationService.navigateToErrorView()
      alert("Kasutaja lisamine õnnestus")
      NavigationService.navigateToLoginView()
    },


    findIfInputFieldsAreFilled() {
      if (this.user.firstName === '') {
        this.errorMessage = "Sisesta eesnimi"
      } else if (this.user.lastName === '') {
        this.errorMessage = "Sisesta perenimi"
      } else if (this.user.email === '') {
        this.errorMessage = "Sisesta e-maili aadress"
      } else if (this.user.telephone === '') {
        this.errorMessage = "Sisesta telefoninumber"
      } else if (this.user.password === '') {
        this.errorMessage = "Sisesta parool"
      }
      setTimeout(this.resetErrorMessage, 4000)
    },

    findIfPasswordMatch() {
      if (this.user.password === this.passwordRetype) {
        this.passwordRetype = this.user.password;
      } else {
        this.errorMessage = "Paroolid ei kattu";
        setTimeout(this.resetErrorMessage, 4000)
      }
    },

    handleAddUserResponse() {
      this.successMessage = 'Kasutaja lisatud'
      setTimeout(this.resetSuccessMessage, 4000)
    },


    resetErrorMessage() {
      this.errorMessage = ''
    },

    resetSuccessMessage() {
      this.successMessage = ''
    },

    handleAddUserError(error) {
      this.errorResponse = error.response.data
      if (error.response.status === 403 && this.errorResponse.errorCode === 333) {
        this.errorMessage = this.errorResponse.message
        setTimeout(this.resetErrorMessage, 4000)
      }
    }
  },


}
</script>