<template>
  <div class="container text-center">
    <div class="row">
      <h1>Logi sisse</h1>
    </div>

    <row class="row justify-content-center">
      <div class="form-floating col-4 mb-3 ">
        <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com">
        <label for="floatingInput">Email aadress</label>
      </div>
    </row>

    <row class="row justify-content-center">
      <div class="form-floating col-4 mb-3">
        <input type="password" class="form-control" id="floatingPassword" placeholder="Password">
        <label for="floatingPassword">Parool</label>
      </div>
    </row>
    <row >
      <div class="d-grid gap-2 col-2 mx-auto mb-3">
      <button @click="" type="button" class="btn btn-primary">Logi sisse</button>
      </div>
      Ei ole kasutaja? <a href="">Loo uus kasutaja</a>
    </row>


  </div>

</template>

<script>
export default {
  name: 'LoginView',
  data() {
    return {}
  },
  methods: {},
  mounted() {
  }
}
</script>