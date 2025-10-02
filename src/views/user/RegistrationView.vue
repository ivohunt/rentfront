<template>
  <div>
    <div class="row justify-content-center">
      <h1>Uue kasutaja loomine</h1>
    </div>

    <div class="col-5 mx-auto">

      <AlertSad :message="errorMessage"/>
      <AlertGood :message="successMessage"/>

      <!-- First + Last name in same row -->
      <div class="row">
        <div class="col-6">
          <div class="form-floating mb-3">
            <input v-model="user.firstName" type="text" class="form-control" placeholder="Eesnimi">
            <label>Eesnimi</label>
          </div>
        </div>

        <div class="col-6">
          <div class="form-floating mb-3">
            <input v-model="user.lastName" type="text" class="form-control" placeholder="Perenimi">
            <label>Perenimi</label>
          </div>
        </div>
      </div>

      <!-- Email -->
      <div class="form-floating mb-3">
        <input v-model="user.email" type="email" class="form-control" placeholder="E-mail">
        <label>E-mail</label>
      </div>

      <!-- Telephone -->
      <div class="form-floating mb-3">
        <input v-model="user.telephone" type="text" class="form-control" placeholder="Telefon">
        <label>Telefon</label>
      </div>

      <div class="row">
        <div class="col-6">
          <div class="form-floating mb-3">
            <input v-model="user.password" type="password" class="form-control" placeholder="Parool">
            <label>Parool</label>
          </div>
        </div>

        <div class="col-6">
          <div class="form-floating mb-3">
            <input v-model="passwordRetype" type="password" class="form-control" placeholder="Parool uuesti">
            <label>Parool uuesti</label>
          </div>
        </div>
      </div>

      <div class="text-center">
        <button @click="registerUser" class="btn btn-primary mb-3" type="submit">
          Registreeri uus kasutaja
        </button>
      </div>

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

      if (this.errorMessage !== '') {
        return
      }

      UserService.sendPostUserRegistrationRequest(this.user)
          .then(() => {
            this.handleAddUserResponse()
            NavigationService.navigateToLoginView()
          })
          .catch(error => {
            this.handleAddUserError(error)
            NavigationService.navigateToErrorView()
          })
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