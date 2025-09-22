<template>
  <div>
    <div class="row justify-content-center">
      <h1>Uue kasutaja loomine</h1>
    </div>



    <div class="row col-4 mx-auto">

      <AlertSad :message="errorMessage"/>

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
          <input v-model="user.phone" type="text" class="form-control" placeholder="Telefon">
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

export default {
  name: 'RegistrationView',
  components: {AlertSad},
  data() {
    return {
      passwordRetype:'',
      errorMessage:'',

      user: {
        firstName:'',
        lastName:'',
        email:'',
        phone:'',
        password:''
      }
    }
  },
  methods: {

    registerUser() {
      this.findIfPasswordMatch()
      UserService.sendPostUserRegistrationRequest(this.user)

    },

    findIfPasswordMatch() {
      if (this.user.password === this.passwordRetype) {
        this.passwordRetype = this.user.password;
      } else {
        this.errorMessage = "Paroolid ei kattu";
        setTimeout(this.resetErrorMessage, 2000)
      }
    },

    resetErrorMessage() {
      this.errorMessage = ''
    },

  },
  mounted() {
  }
}
</script>