<template>
  <div>

    <div class="row"><h1>Koosta uus tellimus</h1>
    </div>

    <div class="row mx-auto d-inline-flex justify-content-xxl-center">

      <div class="col-4">
        <label for="startDate">Algus</label>
        <input v-model="orderStart" id="startDate" class="form-control" type="date"/>
      </div>
      <div class="col-4">
        <label for="endDate">Lõpp</label>
        <input v-model="orderEnd" id="endDate" class="form-control" type="date"/>
      </div>

      <div class="col-4">
        <button @click="sendOrderDates" type="submit" class="btn btn-primary">Lisa kuupäevad</button>
      </div>

    </div>

  </div>
</template>

<script>
import OrderService from "@/service/OrderService";

export default {
  name: 'OrderView',
  data() {
    return {
      userId: '',

      orderDatesResponse: {
        orderStart: '',
        orderEnd: ''
      }

    }
  },
  methods: {

    sendOrderDates() {

      OrderService.sendOrderDatesRequest(this.userId)
          .then(response => handleSendOrderDatesResponse(response))
          .catch(error => handleSendOrderDatesError(error))

      alert("Läks teele")
    },


    handleSendOrderDatesResponse(response) {
      this.orderDatesResponse = response.data



    },
    mounted() {
    }
  }
}
</script>