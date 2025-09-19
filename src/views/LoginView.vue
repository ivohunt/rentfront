<template>

  <div class="container justify-content-center text-center">
    <div class="row justify-content-center">
      <h1>Logi sisse</h1>
    </div>

    <div class="row justify-content-center">
      <div class="col col-4">
        <AlertSad :message="errorMessage"/>
        <div class="form-floating mb-3 ">
          <input v-model="email" type="email" class="form-control" placeholder="name@example.com">
          <label for="floatingInput">Email aadress</label>
        </div>

        <div class="form-floating mb-3">
          <input v-model="password" type="password" class="form-control" placeholder="Password">
          <label for="floatingPassword">Parool</label>
        </div>

        <button @click="login" type="button" class="btn btn-primary mb-3">Logi sisse</button>

        <div>
          Ei ole kasutaja? <a href="">Loo uus kasutaja</a>
        </div>

      </div>
    </div>

  </div>

</template>

<script>
import axios from "axios";
import AlertSad from "@/components/alert/AlertSad.vue";

export default {
  name: 'LoginView',
  components: {AlertSad},
  data() {
    return {
      email: '',
      password: '',
      errorMessage: ''
    }
  },
  methods: {

    login() {

      if (this.email.length && this.password.length > 0) {
        axios.get().then().catch();
      } else {
        this.handleFieldsIncorrectInputAlert()
      }


    },

    handleFieldsIncorrectInputAlert() {
      this.errorMessage = "Täida kõik väljad"
      setTimeout(this.resetErrorMessage, 2000)
    },

    resetErrorMessage() {
      this.errorMessage = ''
    },

  },
  mounted() {
  }
}
</script>