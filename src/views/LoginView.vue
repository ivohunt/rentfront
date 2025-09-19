<template>

  <div class="container justify-content-center text-center">
    <div class="row justify-content-center">
      <h1>Logi sisse</h1>
    </div>

    <div class="row justify-content-center">
      <div class="col col-4">

        <div class="form-floating mb-3 ">
          <input v-model="email" type="email" class="form-control" placeholder="name@example.com">
          <label for="floatingInput">Email aadress</label>
        </div>

        <div class="form-floating mb-3">
          <input type="password" class="form-control" placeholder="Password">
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

export default {
  name: 'LoginView',
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {

    login() {
      // todo: kontrolli, kas on mõtet saata backile sõnum sisse logimiseks
      // todo: Kui jah siis saata axios get sõnum
      // todo:
      // todo:
      axios.get().then().catch()
    }


  },
  mounted() {
  }
}
</script>